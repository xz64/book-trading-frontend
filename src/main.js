import 'es6-promise/auto';
import 'l20n/dist/compat/web/l20n';
import { createView } from 'domvm';

import './l10n';
import './styles/main.scss';
import router from './router';
import mainScreen from './mainScreen';

if (!/^#!/.test(window.location.hash)) {
  router.path('/');
}

const vm = createView(mainScreen);

document.l10n.requestLanguages(['en-US']).then(() => {
  vm.mount(document.getElementById('root'));
});
