import { defineElement as el } from 'domvm';

import { localizedText as lt } from '../helpers/localizedText';
import User from '../user';
import store from '../store';

export default (vm) => {
  let formErrors = {};
  let formData = {};
  let submitting;
  let serverError;
  let showSuccess = false;

  function fillInitialData() {
    formData = store.getState().user;
    vm.redraw();
  }

  const unsubscribe = store.subscribe(fillInitialData);

  vm.hook({
    didMount: fillInitialData,
    didUnmount: unsubscribe,
  });


  function validateForm() {
    formErrors = {};

    if (!formData.fullname) {
      formErrors.fullname = 'full-name-required';
    }

    if (!formData.city || formData.city.length > 30) {
      formErrors.city = 'city-required';
    }

    if (!formData.state || formData.state.length !== 2) {
      formErrors.state = 'state-required';
    }

    return Object.keys(formErrors).length === 0;
  }

  function onInput(event) {
    formData[event.target.id] = event.target.value;
  }

  function onSubmit(event) {
    showSuccess = false;
    event.preventDefault();
    serverError = null;
    const success = validateForm();

    if (success) {
      submitting = true;
      User.updateProfile(formData.fullname, formData.city, formData.state)
      .then(() => {
        submitting = false;
        showSuccess = true;
      })
      .catch((error) => {
        serverError = error.errorKey;
        submitting = false;
        vm.redraw();
      });
    }

    vm.redraw();
  }

  return () => el('form', { onsubmit: onSubmit }, [
    el('label.db.pv1', { for: 'fullname' }, [
      lt('full-name'),
      formErrors.fullname && el('br'),
      formErrors.fullname && el('span.red', [lt(formErrors.fullname)]),
    ]),
    el('input#fullname.db.pv1.w-100.input-reset', { type: 'text', oninput: onInput, maxlength: 30, value: formData.fullname }),
    el('label.db.pv1', { for: 'city' }, [
      lt('city'),
      formErrors.city && el('br'),
      formErrors.city && el('span.red', [lt(formErrors.city)]),
    ]),
    el('input#city.db.pv1.w-100.input-reset', { type: 'text', oninput: onInput, maxlength: 30, value: formData.city }),
    el('label.db.pv1', { for: 'state' }, [
      lt('state'),
      formErrors.state && el('br'),
      formErrors.state && el('span.red', [lt(formErrors.state)]),
    ]),
    el('input#state.db.pv1.w-100.input-reset', { type: 'text', oninput: onInput, maxlength: 2, value: formData.state }),
    serverError && el('.pv1.red', [
      lt(`server_${serverError}`),
    ]),
    el('.pv1'), [
      el('button.input-reset.db.w-100.button-reset.black.bg-white.b--black.ba.br2.pa1.pointer.hover-bg-black.hover-white', { disabled: submitting }, [
        lt('update'),
        submitting && '...',
      ]),
    ],
    showSuccess && el('.pv1', [lt('profile-successfully-updated')]),
  ]);
};
