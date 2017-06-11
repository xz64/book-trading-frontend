import actionTypes from './actionTypes';

function updateUser(username, city, state) {
  return {
    type: actionTypes.USER_UPDATE,
    username,
    city,
    state,
  };
}

function logout() {
  return {
    type: actionTypes.LOGOUT,
  };
}

export default {
  updateUser,
  logout,
};
