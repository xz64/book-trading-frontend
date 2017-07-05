import { defineElement as el, defineView as vw } from 'domvm';

import tradeTable from './tradeTable';

export default () => () => el('.mw5.mw7-ns.center', [
  vw(tradeTable),
]);
