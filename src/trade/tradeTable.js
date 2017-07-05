import { defineElement as el, defineView as vw } from 'domvm';

import { localizedText as lt } from '../helpers/localizedText';
import tradeRow from './tradeRow';
import Trade from './trade';

export default (vm) => {
  let trades = [];
  let loading = true;

  function updateTrades() {
    loading = true;
    Trade.getTrades().then((allTrades) => {
      trades = allTrades;
      loading = false;
      vm.redraw();
    });
  }

  vm.on({
    accept: (id) => {
      Trade.acceptTrade(id)
      .then(updateTrades);
    },
    reject: (id) => {
      Trade.rejectTrade(id)
      .then(updateTrades);
    },
  });

  vm.hook({
    didMount: updateTrades,
  });

  return () => (loading ? el('span', [lt('loading')]) : (el('table', [
    el('thead', [
      el('tr', [
        el('th.pa3', [lt('trade')]),
        el('th.pa3', [lt('actions')]),
      ]),
    ]),
    el('tbody', trades.map(trade => vw(tradeRow, trade))),
  ])));
};
