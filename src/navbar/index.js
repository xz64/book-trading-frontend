import { defineElement as el } from 'domvm';
import { localizedText as lt } from '../helpers/localizedText';

export default () => () => el('nav.cf.bg-black.white.ph2.f6.f5-m.f5-l', [
  el('span.dib.pa2.pa3-m.pa3-l', 'Book Trading'),
  el('span.dib.fr', [
    el('a.dib.pa2.pa3-m.pa3-l.link.white.hover-moon-gray', { href: '/#!/login' }, [
      lt('login'),
    ]),
  ]),
]);
