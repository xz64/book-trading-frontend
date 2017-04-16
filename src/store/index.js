import { combineReducers, createStore } from 'redux';

import routerReducer from '../router/reducer';

const createStoreArgs = [
  combineReducers({
    router: routerReducer,
  }),
  {},
];

if (process.env.NODE_ENV !== 'production') {
  /* eslint-disable no-underscore-dangle */
  createStoreArgs.push(window.__REDUX_DEVTOOLS_EXTENSION__
    && window.__REDUX_DEVTOOLS_EXTENSION__());
  /* eslint-enable */
}

const store = createStore(...createStoreArgs);

export default store;
