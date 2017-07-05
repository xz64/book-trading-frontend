import { defineElement as el, defineView as vw } from 'domvm';

import { localizedText as lt } from '../helpers/localizedText';

import Trade from './trade';
import bookPicker from './bookPicker';
import store from '../store';

export default (vm) => {
  let submitting;
  let selectedBook;
  let showError;
  let showSuccess;

  vm.on({
    bookSelected: (id) => {
      selectedBook = id;
    },
  });

  function onSubmit(e) {
    e.preventDefault();
    submitting = true;
    showError = false;
    showSuccess = false;
    const requestedBook = store.getState().router.params.bookId;
    Trade.createTrade(selectedBook, requestedBook)
    .then(() => {
      submitting = false;
      showSuccess = true;
      vm.redraw();
    })
    .catch(() => {
      showError = true;
      submitting = false;
      vm.redraw();
    });
    vm.redraw();
  }

  return () => el('form', { onsubmit: onSubmit }, [
    el('label.db.pv1', [
      lt('select-a-book'),
    ]),
    el('div', [
      vw(bookPicker),
    ]),
    el('.pv1', [
      el('button.input-reset.db.w-100.button-reset.black.bg-white.b--black.ba.br2.pa1.pointer.hover-bg-black.hover-white', [
        lt('submit'),
        submitting && '...',
      ]),
    ]),
    showError && el('.pv1', [
      el('span.red', [lt('server_TRADE_CREATE_ERROR')]),
    ]),
    showSuccess && el('.pv1', [
      el('span', [
        lt('trade-created'),
        el('br'),
        el('a', { href: '/#!/books' }, [
          lt('return'),
        ]),
      ]),
    ]),
  ]);
};
