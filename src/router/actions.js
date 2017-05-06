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

function login() {
  return {
    type: actionTypes.ROUTE_CHANGE,
    route: routes.LOGIN,
  };
}

function register() {
  return {
    type: actionTypes.ROUTE_CHANGE,
    route: routes.REGISTER,
  };
}

export default {
  home,
  unknown,
  login,
  register,
};
