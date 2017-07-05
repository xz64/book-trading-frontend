import { defineElement as el } from 'domvm';
import { localizedText as lt } from '../helpers/localizedText';

export default () => () => el('div', [
  lt('page-not-found'),
  el('br'),
  el('a', { href: '/#!/' }, [
    lt('return'),
  ]),
]);
