const API_URL_USER = '/api/user';

export function LOGIN(body) {
  return {
    url: API_URL_USER + '/login',
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    },
  };
}

export function LOGIN_VALIDATE_TOKEN(token) {
  return {
    url: API_URL_USER + '/token/validate',
    options: {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    },
  };
}

export function USER_GET(token) {
  return {
    url: API_URL_USER,
    options: {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    },
  };
}

export function USER_POST(body) {
  return {
    url: API_URL_USER + '/register',
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    },
  };
}
