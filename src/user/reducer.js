import actionTypes from './actionTypes';

function userReducer(state = {}, { type, username, city, state: u_state }) {
  switch (type) {
    case actionTypes.USER_UPDATE:
      return {
        username,
        city,
        state: u_state,
      };
    default:
      return state;
  }
}

export default userReducer;
