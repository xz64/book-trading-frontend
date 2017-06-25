import { defineElement as el } from 'domvm';

import { localizedText as lt } from '../helpers/localizedText';

export default () => {
  function generateLink(msgKey, url) {
    return el('div.pv1', [
      el('a', { href: `/#!/${url}` }, [lt(msgKey)]),
    ]);
  }

  return () => el('div', [
    el('div', [lt('what-you-want-to-do')]),
    generateLink('action-add-book', 'addBook'),
    generateLink('action-view-books', 'books'),
    generateLink('action-view-trades', 'trades'),
  ]);
};

