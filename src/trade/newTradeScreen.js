import { defineElement as el, defineView as vw } from 'domvm';

import newTradeForm from './newTradeForm';

export default () => () => el('.mw5.mw7-ns.center', [
  vw(newTradeForm),
]);
