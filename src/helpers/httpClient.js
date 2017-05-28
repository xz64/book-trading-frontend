import alite from 'alite';
import router from '../router';

alite.ajaxStart = (xhr) => {
  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
};

alite.ajaxStop = (xhr) => {
  if (xhr.status === 401) {
    router.path('/login');
  }
};

function get(url) {
  return alite({
    url,
    method: 'GET',
  });
}

function post(url, data) {
  return alite({
    url,
    method: 'POST',
    data,
  });
}

export default {
  get,
  post,
};
