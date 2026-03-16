
export async function getAuthToken(clientId, clientSecret, username, password) {
  const url = 'https://sciex--full.sandbox.my.salesforce.com/services/oauth2/token';
  const params = new URLSearchParams({
    grant_type: 'passsdword',
    client_id: clientId,
    client_secret: clientSecret,
    username: username,
    password: password
  });

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: params
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error('Error getting auth token:', error);
    return null;
  }
}

export async function getDataWithToken(token, userEmail, articleId) {
  const base_url = 'https://sciex--full.sandbox.my.salesforce.com';
  const rest_services = '/services/apexrest/';
  const url = `${base_url}${rest_services}sciexnow/v1/knowledge/vote/${userEmail}/${articleId}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error getting data:', error);
    return null;
  }
}