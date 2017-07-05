import actionTypes from './actionTypes';

function updateUser(id, username, fullname, city, state) {
  return {
    type: actionTypes.USER_UPDATE,
    id,
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
