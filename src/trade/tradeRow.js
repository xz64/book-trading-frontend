/* eslint-disable */
import { defineElement as el } from 'domvm';

import { localizedText as lt } from '../helpers/localizedText';

export default (vm, trade) => {

  function onAccept(id) {
    vm.emit('accept', id);
  }

  function onReject(id) {
    vm.emit('reject', id);
  }
  
  return (vm, trade) => el('tr', [
    el('td.pa3',[
      el('div', [
        lt('your'),
        ` ${trade.requestedBook.title} (${trade.requestedBook.author}) `,
        lt('for'),
        ` ${trade.requesterBook.owner.fullname}'s ${trade.requestedBook.title} (${trade.requestedBook.author})`,
      ]),
    ]),
    el('td.pa3', [
      el('button.ma1', { onclick: [onAccept, trade._id] },  [lt('accept')]),
      el('button.ma1', { onclick: [onReject, trade._id] }, [lt('reject')])
    ]),
  ]);
}
