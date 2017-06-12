import { defineElement as el, defineView as vw } from 'domvm';

import profileForm from './profileForm';

export default () => () => el('.w-100.w-60-m.w-30-l.center', [
  vw(profileForm),
]);
