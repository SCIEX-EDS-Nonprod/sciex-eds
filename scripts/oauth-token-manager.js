/**
 * Salesforce OAuth Token Manager
 * Handles retrieval and caching of Salesforce OAuth tokens
 */

const TOKEN_CACHE_KEY = 'salesforce_oauth_token';
const TOKEN_EXPIRY_KEY = 'salesforce_oauth_token_expiry';

/**
 * Get OAuth credentials from environment variables
 */
function getOAuthConfig() {
  return {
    tokenUrl: import.meta.env.VITE_SALESFORCE_TOKEN_URL,
    clientId: import.meta.env.VITE_SALESFORCE_CLIENT_ID,
    clientSecret: import.meta.env.VITE_SALESFORCE_CLIENT_SECRET,
    username: import.meta.env.VITE_SALESFORCE_USERNAME,
    password: import.meta.env.VITE_SALESFORCE_PASSWORD,
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

    console.log('OAuth Config:', {
      tokenUrl: config.tokenUrl,
      clientId: config.clientId ? 'Present' : 'Missing',
      clientSecret: config.clientSecret ? 'Present' : 'Missing',
      username: config.username || 'Missing',
    });

    if (!config.tokenUrl || !config.clientId || !config.clientSecret) {
      throw new Error('Missing OAuth configuration in environment variables');
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

export default { getSalesforceAuthToken };
