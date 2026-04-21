/**
 * Salesforce OAuth Token Manager
 * Handles retrieval and caching of Salesforce OAuth tokens
 */

const TOKEN_CACHE_KEY = 'salesforce_oauth_token';
const TOKEN_EXPIRY_KEY = 'salesforce_oauth_token_expiry';

/**
 * Get OAuth credentials from environment variables or fallback sources
 */
function getOAuthConfig() {
  // Try to get from import.meta.env (Vite)
  const env = typeof import.meta !== 'undefined' ? import.meta.env : {};
  
  // Fallback to window object or stored config
  const storedConfig = window.__SALESFORCE_CONFIG__ || {};

  return {
    tokenUrl: env.VITE_SALESFORCE_TOKEN_URL || storedConfig.tokenUrl || 'https://sciex--full.sandbox.my.salesforce.com/services/oauth2/token',
    clientId: env.VITE_SALESFORCE_CLIENT_ID || storedConfig.clientId,
    clientSecret: env.VITE_SALESFORCE_CLIENT_SECRET || storedConfig.clientSecret,
    username: env.VITE_SALESFORCE_USERNAME || storedConfig.username || 'sciexwebintegration@sciex.com.full',
    password: env.VITE_SALESFORCE_PASSWORD || storedConfig.password,
  };
}

/**
 * Check if cached token is still valid
 */
function isTokenValid() {
  try {
    const token = sessionStorage.getItem(TOKEN_CACHE_KEY);
    const expiry = sessionStorage.getItem(TOKEN_EXPIRY_KEY);

    if (!token || !expiry) return false;

    const expiryTime = parseInt(expiry, 10);
    const currentTime = Date.now();

    return currentTime < expiryTime;
  } catch (error) {
    console.error('Error checking token validity:', error);
    return false;
  }
}

/**
 * Fetch OAuth token from Salesforce
 */
async function fetchOAuthToken() {
  try {
    const config = getOAuthConfig();

    console.log('OAuth Config Check:', {
      tokenUrl: config.tokenUrl ? 'Present' : 'Missing',
      clientId: config.clientId ? 'Present' : 'Missing',
      clientSecret: config.clientSecret ? 'Present' : 'Missing',
      username: config.username ? 'Present' : 'Missing',
      password: config.password ? 'Present' : 'Missing',
    });

    // Validate required credentials
    const missingFields = [];
    if (!config.clientId) missingFields.push('clientId');
    if (!config.clientSecret) missingFields.push('clientSecret');
    if (!config.password) missingFields.push('password');

    if (missingFields.length > 0) {
      throw new Error(
        `Missing OAuth configuration: ${missingFields.join(', ')}. `
        + 'Ensure .env file is loaded or call initializeSalesforceConfig() with credentials.'
      );
    }

    if (!config.tokenUrl) {
      throw new Error('Missing VITE_SALESFORCE_TOKEN_URL configuration');
    }

    const params = new URLSearchParams({
      grant_type: 'password',
      client_id: config.clientId,
      client_secret: config.clientSecret,
      username: config.username,
      password: config.password,
    });

    console.log('Fetching OAuth token from:', config.tokenUrl);

    const response = await fetch(config.tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    console.log('OAuth Token Response Status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OAuth Token Error Response:', errorText);
      throw new Error(`OAuth token fetch failed: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    console.log('OAuth Token Response:', {
      access_token: data.access_token ? 'Present' : 'Missing',
      token_type: data.token_type,
      expires_in: data.expires_in,
    });

    if (!data.access_token) {
      throw new Error('No access token in OAuth response');
    }

    // Cache the token (expires_in is in seconds)
    const expiryTime = Date.now() + (data.expires_in * 1000) - 60000; // Expire 1 min early
    sessionStorage.setItem(TOKEN_CACHE_KEY, data.access_token);
    sessionStorage.setItem(TOKEN_EXPIRY_KEY, expiryTime.toString());

    return data.access_token;
  } catch (error) {
    console.error('Error fetching OAuth token:', error);
    throw error;
  }
}

/**
 * Get valid OAuth token (cached or fresh)
 */
export async function getSalesforceAuthToken() {
  try {
    if (isTokenValid()) {
      const token = sessionStorage.getItem(TOKEN_CACHE_KEY);
      console.log('Using cached OAuth token');
      return token;
    }

    console.log('Fetching fresh OAuth token');
    return await fetchOAuthToken();
  } catch (error) {
    console.error('Failed to get Salesforce auth token:', error);
    throw error;
  }
}

/**
 * Initialize Salesforce OAuth config at runtime
 * Call this if environment variables are not available
 * @param {Object} config - Configuration object
 * @param {string} config.clientId - Salesforce OAuth Client ID
 * @param {string} config.clientSecret - Salesforce OAuth Client Secret
 * @param {string} config.username - Salesforce username
 * @param {string} config.password - Salesforce password
 * @param {string} [config.tokenUrl] - OAuth token endpoint URL
 */
export function initializeSalesforceConfig(config) {
  if (!config.clientId || !config.clientSecret || !config.password) {
    throw new Error('Config must include clientId, clientSecret, and password');
  }
  
  window.__SALESFORCE_CONFIG__ = {
    tokenUrl: config.tokenUrl || 'https://sciex--full.sandbox.my.salesforce.com/services/oauth2/token',
    clientId: config.clientId,
    clientSecret: config.clientSecret,
    username: config.username || 'sciexwebintegration@sciex.com.full',
    password: config.password,
  };
  
  console.log('Salesforce OAuth config initialized');
}

/**
 * Clear cached token (useful for logout)
 */
export function clearSalesforceToken() {
  try {
    sessionStorage.removeItem(TOKEN_CACHE_KEY);
    sessionStorage.removeItem(TOKEN_EXPIRY_KEY);
    console.log('Salesforce token cache cleared');
  } catch (error) {
    console.error('Error clearing token cache:', error);
  }
}

export default { 
  getSalesforceAuthToken,
  initializeSalesforceConfig,
  clearSalesforceToken,
};
