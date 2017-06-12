import httpClient from '../helpers/httpClient';
import store from '../store';
import actions from './actions';
import router from '../router';

function getUserInfo() {
  return httpClient.get('/api/user')
  .then((userInfo) => {
    store.dispatch(actions.updateUser(userInfo.username, userInfo.fullname, userInfo.city,
      userInfo.state));
  });
}

function login(username, password) {
  return httpClient.post('/api/login', {
    username,
    password,
  })
  .then(getUserInfo);
}

function logout() {
  return httpClient.post('/api/logout')
  .then(() => {
    store.dispatch(actions.logout());
    router.path('/login');
  });
}

export default {
  login,
  logout,
  getUserInfo,
};
