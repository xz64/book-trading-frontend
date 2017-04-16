import actionTypes from './actionTypes';

function routerReducer(state = {}, { type, route, params }) {
  switch (type) {
    case actionTypes.ROUTE_CHANGE:
      return {
        route,
        params,
      };
    default:
      return state;
  }
}

export default routerReducer;
