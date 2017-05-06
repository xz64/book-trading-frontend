import { defineElement as el } from 'domvm';

import captcha from '../helpers/captcha';

export default (vm, model) => {
  vm.hook({
    didMount: () => {
      captcha.load().then((grecaptcha) => {
        const hostNode = vm.refs.span.el;
        const innerSpan = document.createElement('span');
        hostNode.appendChild(innerSpan);
        grecaptcha.render(innerSpan, {
          sitekey: process.env.RECAPTCHA_SITE_KEY,
          callback: model.onSuccess,
        });
      });
    },
    willUnmount: () => {
      const hostNode = vm.refs.span.el;
      while (hostNode.hasChildNodes()) {
        hostNode.removeChild(hostNode.lastChild);
      }
      captcha.load().then((grecaptcha) => {
        grecaptcha.reset();
      });
    },
  });

  return () => el('span', { _ref: 'span' });
};
