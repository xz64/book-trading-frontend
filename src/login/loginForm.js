import { defineElement as el } from 'domvm';

import { localizedText as lt } from '../helpers/localizedText';
import User from '../user';
import router from '../router';

export default (vm) => {
  const formErrors = {};
  const formData = {};
  let errorKey;
  let submitting;

  function onInput(event) {
    formData[event.target.id] = event.target.value;
  }

  function onSubmit(event) {
    event.preventDefault();
    errorKey = null;
    submitting = true;
    User.login(formData.username, formData.password)
    .then(() => router.path('/'))
    .catch(({ error }) => {
      errorKey = `server_${error}`;
      vm.redraw();
      submitting = false;
    });
    vm.redraw();
  }

  return () => el('form', { onsubmit: onSubmit }, [
    el('label.db.pv1', { for: 'username' }, [
      lt('username'),
      formErrors.username && el('br'),
      formErrors.username && el('span.red', [lt(formErrors.username)]),
    ]),
    el('input#username.db.pv1.w-100.input-reset', {
      type: 'text',
      oninput: onInput,
      maxlength: 30,
    }),
    el('label.db.pv1', { for: 'password' }, [
      lt('password'),
      formErrors.password && el('br'),
      formErrors.password && el('span.red', [lt(formErrors.password)]),
    ]),
    el('input#password.db.pv1.w-100.input-reset', { type: 'password', oninput: onInput }),
    errorKey && el('pv1.red', [lt(errorKey)]),
    el('.pv1', [
      el('button.input-reset.db.w-100.button-reset.black.bg-white.b--black.ba.br2.pa1.pointer.hover-bg-black.hover-white', [
        lt('login'),
        submitting && '...',
      ]),
    ]),
  ]);
};
