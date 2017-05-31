import httpClient from '../helpers/httpClient';
import store from '../store';
import actions from './actions';

function getUserInfo() {
  return httpClient.get('/api/user')
  .then((userInfo) => {
    store.dispatch(actions.updateUser(userInfo.username, userInfo.city, userInfo.state));
  });
}

export default {
  getUserInfo,
};
