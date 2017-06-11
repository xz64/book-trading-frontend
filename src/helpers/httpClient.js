import alite from 'alite';
import router from '../router';

let csrfToken = '';

alite.ajaxStart = (xhr) => {
  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  xhr.setRequestHeader('X-CSRF-Token', csrfToken);
};

alite.ajaxStop = (xhr) => {
  if (xhr.status === 401) {
    router.path('/login');
  }
};

function setCsrfToken(token) {
  csrfToken = token;
}

function updateCsrfToken() {
  if (csrfToken) {
    return Promise.resolve();
  }
  return alite({
    url: '/api/csrfToken',
    method: 'GET',
  })
  .then(({ csrfToken: token }) => setCsrfToken(token));
}

function get(url) {
  return updateCsrfToken()
  .then(() => alite({
    url,
    method: 'GET',
  }));
}

function post(url, data) {
  return updateCsrfToken()
  .then(() => alite({
    url,
    method: 'POST',
    data,
  }));
}

export default {
  get,
  post,
  setCsrfToken,
  updateCsrfToken,
};
