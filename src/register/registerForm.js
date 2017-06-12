import { defineElement as el, defineView as vw } from 'domvm';

import captcha from './captcha';
import { localizedText as lt } from '../helpers/localizedText';
import httpClient from '../helpers/httpClient';

export default (vm) => {
  const formData = {
    username: '',
    password: '',
    city: '',
    state: '',
    repeatpassword: '',
    captchaResponse: '',
  };

  let submitting = false;

  let serverError;

  let formErrors = {};

  function validateForm() {
    formErrors = {};

    if (!formData.username) {
      formErrors.username = 'username-required';
    }

    if (!formData.fullname) {
      formErrors.fullname = 'full-name-required';
    }

    if (!formData.city || formData.city.length > 30) {
      formErrors.city = 'city-required';
    }

    if (!formData.state || formData.state.length !== 2) {
      formErrors.state = 'state-required';
    }

    if (!formData.password || formData.password.length < 15) {
      formErrors.password = 'password-length';
    } else if (formData.password !== formData.repeatpassword) {
      formErrors.repeatpassword = 'password-not-match-repeat';
    }

    if (!formData.captchaResponse) {
      formErrors.captchaResponse = 'captcha-not-filled';
    }

    return Object.keys(formErrors).length === 0;
  }

  function onSuccess() {
    vm.emit('success');
  }

  function onSubmit(event) {
    event.preventDefault();
    serverError = null;
    const success = validateForm();

    if (success) {
      const postData = Object.assign({}, formData);
      delete postData.repeatpassword;
      submitting = true;
      httpClient.post('/api/register', postData)
      .then(() => {
        submitting = false;
        onSuccess();
      })
      .catch((error) => {
        serverError = error.errorKey;
        submitting = false;
        vm.redraw();
      });
    }

    vm.redraw();
    return false;
  }

  function onInput(event) {
    formData[event.target.id] = event.target.value;
  }

  function onCaptchaInput(captchaResponse) {
    formData.captchaResponse = captchaResponse;
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
    el('label.db.pv1', { for: 'fullname' }, [
      lt('full-name'),
      formErrors.fullname && el('br'),
      formErrors.fullname && el('span.red', [lt(formErrors.fullname)]),
    ]),
    el('input#fullname.db.pv1.w-100.input-reset', { type: 'text', oninput: onInput, maxlength: 30 }),
    el('label.db.pv1', { for: 'city' }, [
      lt('city'),
      formErrors.city && el('br'),
      formErrors.city && el('span.red', [lt(formErrors.city)]),
    ]),
    el('input#city.db.pv1.w-100.input-reset', { type: 'text', oninput: onInput, maxlength: 30 }),
    el('label.db.pv1', { for: 'state' }, [
      lt('state'),
      formErrors.state && el('br'),
      formErrors.state && el('span.red', [lt(formErrors.state)]),
    ]),
    el('input#state.db.pv1.w-100.input-reset', { type: 'text', oninput: onInput, maxlength: 2 }),
    el('label.db.pv1', { for: 'password' }, [
      lt('password'),
      formErrors.password && el('br'),
      formErrors.password && el('span.red', [lt(formErrors.password)]),
    ]),
    el('input#password.db.pv1.w-100.input-reset', { type: 'password', oninput: onInput }),
    el('label.db.pv1', { for: 'repeatpassword' }, [
      lt('repeat-password'),
      formErrors.repeatpassword && el('br'),
      formErrors.repeatpassword && el('span.red', [lt(formErrors.repeatpassword)]),
    ]),
    el('input#repeatpassword.db.pv1.w-100.input-reset', { type: 'password', oninput: onInput }),
    el('label.db.pv1', [
      lt('prove-not-robot'),
    ]),
    el('.pv1', [
      formErrors.captchaResponse && el('span.red', [lt(formErrors.captchaResponse)]),
      formErrors.captchaResponse && el('br'),
      vw(captcha, { onSuccess: onCaptchaInput }, false),
    ]),
    serverError && el('.pv1.red', [
      lt(`server_${serverError}`),
    ]),
    el('button.input-reset.db.w-100.button-reset.black.bg-white.b--black.ba.br2.pa1.pointer.hover-bg-black.hover-white', { disabled: submitting }, [
      lt('register'),
      submitting && '...',
    ]),
  ]);
};
