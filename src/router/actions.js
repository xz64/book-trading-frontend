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

function profile() {
  return {
    type: actionTypes.ROUTE_CHANGE,
    route: routes.PROFILE,
  };
}

function addBook() {
  return {
    type: actionTypes.ROUTE_CHANGE,
    route: routes.ADD_BOOK,
  };
}

function books() {
  return {
    type: actionTypes.ROUTE_CHANGE,
    route: routes.BOOKS,
  };
}

function newTrade(bookId) {
  return {
    type: actionTypes.ROUTE_CHANGE,
    route: routes.NEW_TRADE,
    params: {
      bookId,
    },
  };
}

export default {
  home,
  unknown,
  login,
  register,
  profile,
  addBook,
  books,
  newTrade,
};
