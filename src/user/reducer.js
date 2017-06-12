import actionTypes from './actionTypes';

function userReducer(state = {}, { type, username, fullname, city, state: u_state }) {
  switch (type) {
    case actionTypes.USER_UPDATE:
      return {
        username,
        fullname,
        city,
        state: u_state,
      };
    case actionTypes.LOGOUT:
      return {};
    default:
      return state;
  }
}

export default userReducer;
