import { defineElement as el } from 'domvm';

import { localizedText as lt } from '../helpers/localizedText';
import store from '../store';

export default () => (vm, book) => el('tr', [
  el('td.pa3', book.title),
  el('td.pa3', book.author),
  el('td.pa3', book.owner.fullname),
  el('td.pa3', [
    null,
    store.getState().user.id === book.owner._id // eslint-disable-line no-underscore-dangle
      ? null
      : el('a', { href: '/#!/' }, [lt('action-request-trade')]),
  ]),
]);

