import { defineElement as el, defineView as vw } from 'domvm';

import addBookForm from './addBookForm';

export default () => () => el('.w-100.w-60-m.w-30-l.center', [
  vw(addBookForm),
]);
