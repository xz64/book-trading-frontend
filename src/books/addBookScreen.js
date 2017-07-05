import { defineElement as el, defineView as vw } from 'domvm';

import { localizedText as lt } from '../helpers/localizedText';
import addBookForm from './addBookForm';

export default () => () => el('.w-100.w-60-m.w-30-l.center', [
  vw(addBookForm),
  el('div.pv1', [
    el('a', { href: '/#!/' }, [
      lt('return'),
    ]),
  ]),
]);
