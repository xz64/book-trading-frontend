import actionTypes from './actionTypes';

function updateUser(username, city, state) {
  return {
    type: actionTypes.USER_UPDATE,
    username,
    city,
    state,
  };
}

export default {
  updateUser,
};
