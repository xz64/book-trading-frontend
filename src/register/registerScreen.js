import { defineElement as el, defineView as vw } from 'domvm';

import router from '../router';
import registerForm from './registerForm';

export default (vm) => {
  vm.on({
    success: () => {
      router.path('/');
    },
  });

  return () => el('.w-100.w-60-m.w-30-l.center', [
    vw(registerForm),
  ]);
};
