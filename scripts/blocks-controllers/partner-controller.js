export default async function getPartnersData() {
  try {
    const endpoint = `/bin/sciex/partners`;
    console.log('Fetching partners data from:', endpoint);
    const response = await fetch(endpoint);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    return null;
  }
};

export async function getAuthToken(clientId, clientSecret, username, password) {
  try {
    const endpoint = '/bin/sciex/salesforce-token';
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        username: username,
        password: password
      })
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
  try {
    const endpoint = '/bin/sciex/salesforce-data';
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        token: token,
        userEmail: userEmail,
        articleId: articleId
      })
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
