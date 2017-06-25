/* eslint-disable no-param-reassign */
import { defineElement as el } from 'domvm';

import { localizedText as lt } from '../helpers/localizedText';
import Book from './book';

export default (vm) => {
  let formErrors = {};
  let formData = {};
  let submitting;
  let showSuccess = false;
  let serverError;


  function validateForm() {
    formErrors = {};

    if (!formData.title || formData.title.length > 30) {
      formErrors.title = 'title-required';
    }

    if (!formData.author || formData.author.length > 30) {
      formErrors.author = 'author-required';
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
      Book.addBook(formData.title, formData.author)
      .then(() => {
        submitting = false;
        showSuccess = true;
        formData = {};
        vm.refs.titleInput.el.value = '';
        vm.refs.authorInput.el.value = '';
        vm.refs.titleInput.el.focus();
        vm.redraw();
      })
      .catch(() => {
        serverError = 'add-book-generic-error';
        submitting = false;
        vm.redraw();
      });
    }

    vm.redraw();
  }

  return () => el('form', { onsubmit: onSubmit }, [
    el('label.db.pv1', { for: 'title' }, [
      lt('title'),
      formErrors.title && el('br'),
      formErrors.title && el('span.red', [lt(formErrors.title)]),
    ]),
    el('input#title.db.pv1.w-100.input-reset', { _ref: 'titleInput', type: 'text', oninput: onInput, maxlength: 30, value: formData.title }),
    el('label.db.pv1', { for: 'author' }, [
      lt('author'),
      formErrors.author && el('br'),
      formErrors.author && el('span.red', [lt(formErrors.author)]),
    ]),
    el('input#author.db.pv1.w-100.input-reset', { _ref: 'authorInput', type: 'text', oninput: onInput, maxlength: 30, value: formData.author }),
    serverError && el('.pv1.red', [
      lt(`server_${serverError}`),
    ]),
    el('.pv1'), [
      el('button.input-reset.db.w-100.button-reset.black.bg-white.b--black.ba.br2.pa1.pointer.hover-bg-black.hover-white', { disabled: submitting }, [
        lt('add'),
        submitting && '...',
      ]),
    ],
    showSuccess && el('.pv1', [
      lt('book-successfully-added'),
      ' ',
      el('a', { href: '/#!/' }, [
        lt('return'),
      ]),
    ]),
  ]);
};
