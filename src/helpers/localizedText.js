import { defineView as vw, defineText as tx } from 'domvm';

function localizedTextComponent(vm, model) {
  let translatedText = '';

  vm.hook({
    didInit: () => {
      document.l10n.formatValue(model.msgKey, model.args).then((text) => {
        translatedText = text;
        vm.redraw();
      });
    },
  });

  return function localizedTextView() {
    return tx(translatedText);
  };
}

function localizedText(msgKey) {
  return vw(localizedTextComponent, { msgKey });
}

/* eslint-disable import/prefer-default-export */
export { localizedText };
/* eslint-enable */
