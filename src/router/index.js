import Grapnel from 'grapnel';

import store from '../store';
import actions from './actions';
import httpClient from '../helpers/httpClient';
import User from '../user';

const router = new Grapnel({
  hashBang: true,
});

function authenticatedOnly(req, event, next) {
  httpClient.get('/api/session')
  .then(({ valid }) => (valid ? User.getUserInfo() : Promise.reject('unauthorized')))
  .then(() => next())
  .catch(() => router.path('/login'));
}

function unauthenticatedOnly(req, event, next) {
  httpClient.get('/api/session')
  .then(({ valid }) => {
    if (!valid) {
      next();
    } else {
      router.path('/');
    }
  });
}

router.get('/', authenticatedOnly, () => store.dispatch(actions.home()));

router.get('/login', unauthenticatedOnly, () => store.dispatch(actions.login()));

router.get('/profile', authenticatedOnly, () => store.dispatch(actions.profile()));

router.get('/addBook', authenticatedOnly, () => store.dispatch(actions.addBook()));

router.get('/register', unauthenticatedOnly, () => store.dispatch(actions.register()));

router.get('/*', (req, e) => {
  if (!e.parent()) {
    store.dispatch(actions.unknown());
  }
});

export default router;
