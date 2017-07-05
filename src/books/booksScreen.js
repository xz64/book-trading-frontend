import { defineElement as el, defineView as vw } from 'domvm';

import bookTable from './bookTable';

export default () => () => el('.mw5.mw7-ns.center', [
  vw(bookTable),
]);
