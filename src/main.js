import 'es6-promise/auto';
import 'l20n';
import alite from 'alite';
import { createView } from 'domvm';

import './l10n';
import './styles/main.scss';
import router from './router';
import mainScreen from './mainScreen';

alite.ajaxStart = (xhr) => {
  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
};

if (!/^#!/.test(window.location.hash)) {
  router.path('/');
}

const vm = createView(mainScreen);

document.l10n.requestLanguages(['en-US']).then(() => {
  vm.mount(document.getElementById('root'));
});
