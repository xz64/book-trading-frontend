import { defineText as tx } from 'domvm';

export default function localizedText(vm, model) {
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
