import actionTypes from './actionTypes';

function userReducer(state = {}, { type, id, username, fullname, city, state: u_state }) {
  switch (type) {
    case actionTypes.USER_UPDATE:
      return {
        username,
        fullname,
        city,
        state: u_state,
        id,
      };
    case actionTypes.LOGOUT:
      return {};
    default:
      return state;
  }
}

export default userReducer;
