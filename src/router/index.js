import Grapnel from 'grapnel';

import store from '../store';
import actions from './actions';

const router = new Grapnel({
  hashBang: true,
});

router.get('/', () => store.dispatch(actions.home()));

router.get('/login', () => store.dispatch(actions.login()));

router.get('/register', () => store.dispatch(actions.register()));

router.get('/*', (req, e) => {
  if (!e.parent()) {
    store.dispatch(actions.unknown());
  }
});

export default router;
