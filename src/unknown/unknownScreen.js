import { defineElement as el, defineView as vw } from 'domvm';
import localizedText from '../helpers/localizedText';

export default () => () => el('div', [
  vw(localizedText, { msgKey: 'page-not-found' }),
  el('br'),
  el('a', { href: '/#!/' }, [
    vw(localizedText, { msgKey: 'return' }),
  ]),
]);
