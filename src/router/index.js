import Grapnel from 'grapnel';

import store from '../store';
import actions from './actions';

const router = new Grapnel({
  hashBang: true,
});

router.get('/', () => store.dispatch(actions.home()));

router.get('/*', (req, e) => {
  if (!e.parent()) {
    store.dispatch(actions.unknown());
  }
});

export default router;
