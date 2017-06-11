import httpClient from '../helpers/httpClient';
import store from '../store';
import actions from './actions';

function getUserInfo() {
  return httpClient.get('/api/user')
  .then((userInfo) => {
    store.dispatch(actions.updateUser(userInfo.username, userInfo.city, userInfo.state));
  });
}

function login(username, password) {
  return httpClient.post('/api/login', {
    username,
    password,
  })
  .then(getUserInfo);
}

export default {
  login,
  getUserInfo,
};
