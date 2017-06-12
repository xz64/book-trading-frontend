import { defineElement as el, defineText as tx } from 'domvm';
import { localizedText as lt } from '../helpers/localizedText';
import store from '../store';
import User from '../user';

export default (vm) => {
  let previousRoute;
  let currentRoute;
  let previousUser;
  let currentUser;

  function updateNavBar() {
    previousUser = currentUser;
    currentUser = store.getState().user && store.getState().user.username;

    previousRoute = currentRoute;
    currentRoute = store.getState().router.route;

    if (previousUser !== currentUser) {
      vm.redraw();
    }

    if (previousRoute !== currentRoute) {
      vm.redraw();
    }
  }

  function logout() {
    User.logout();
  }

  updateNavBar();

  const unsubscribe = store.subscribe(updateNavBar);

  vm.hook({
    didUnmount: unsubscribe,
  });

  return () => el('nav.cf.bg-black.white.ph2.f6.f5-m.f5-l', [
    el('span.dib.pa2.pa3-m.pa3-l', 'Book Trading'),
    el('span.dib.fr', [
      !currentUser && (currentRoute !== 'LOGIN') && el('a.dib.pa2.pa3-m.pa3-l.link.white.hover-moon-gray', { href: '/#!/login' },
        [
          lt('login'),
        ],
      ),
      currentUser && el('a.dib.pa2.pa3-m.pa3-l.link.white.hover-moon-gray', { href: '/#!/profile' }, [tx(currentUser)]),
      currentUser && el('span.dib.pa2.pointer.pa3-m.pa3-l.link.white.hover-moon-gray', { onclick: logout },
        [
          lt('logout'),
        ],
      ),
    ]),
  ]);
};

