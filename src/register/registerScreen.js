import { defineElement as el, defineView as vw } from 'domvm';

import { localizedText as lt } from '../helpers/localizedText';
import registerForm from './registerForm';

export default (vm) => {
  let successfulRegister = false;

  vm.on({
    success: () => {
      successfulRegister = true;
      vm.redraw();
    },
  });

  return () => el('.w-100.w-60-m.w-30-l.center', [
    successfulRegister ? lt('registration-successful') : vw(registerForm),
  ]);
};
