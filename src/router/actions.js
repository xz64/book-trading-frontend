import actionTypes from './actionTypes';
import routes from './routes';

function home() {
  return {
    type: actionTypes.ROUTE_CHANGE,
    route: routes.HOME,
  };
}

function unknown() {
  return {
    type: actionTypes.ROUTE_CHANGE,
    route: routes.UNKNOWN,
  };
}

export default {
  home,
  unknown,
};
