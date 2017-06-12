import actionTypes from './actionTypes';

function updateUser(username, fullname, city, state) {
  return {
    type: actionTypes.USER_UPDATE,
    username,
    fullname,
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
