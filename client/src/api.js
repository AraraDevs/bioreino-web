const API_URL_USER = '/api/user';
const API_URL_COURSE = '/api/course';
const API_URL_LESSON = '/api/lesson';
const API_URL_CATEGORY = '/api/category';

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

export function COURSES_GET({ plan, category }) {
  return {
    url: API_URL_COURSE + `?_plan=${plan}&_category=${category}`,
    options: {
      method: 'GET',
      cache: 'no-store',
    },
  };
}

export function LESSONS_OF_COURSE_GET(courseTitle) {
  return {
    url: API_URL_LESSON + '/' + courseTitle,
    options: {
      method: 'GET',
    },
  };
}

export function ALL_CATEGORIES_GET() {
  return {
    url: API_URL_CATEGORY + '/all',
    options: {
      method: 'GET',
    },
  };
}
