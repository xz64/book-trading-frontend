import { defineElement as el, defineView as vw } from 'domvm';
import store from './store';
import routes from './router/routes';
import navbar from './navbar';
import homeScreen from './home/homeScreen';
import registerScreen from './register/registerScreen';
import loginScreen from './login/loginScreen';
import unknownScreen from './unknown/unknownScreen';

export default function (vm) {
  let previousRoute;
  let currentRoute;

  function getRoute(state) {
    return state.router.route;
  }

  function updateRoute() {
    previousRoute = currentRoute;
    currentRoute = getRoute(store.getState());

    if (previousRoute !== currentRoute) {
      vm.redraw();
    }
  }

  previousRoute = getRoute(store.getState());
  currentRoute = previousRoute;
  const unsubscribe = store.subscribe(updateRoute);

  vm.hook({
    didUnmount: unsubscribe,
  });

  return () => {
    let routeScreen;
    switch (currentRoute) {
      case routes.HOME:
        routeScreen = homeScreen;
        break;
      case routes.LOGIN:
        routeScreen = loginScreen;
        break;
      case routes.REGISTER:
        routeScreen = registerScreen;
        break;
      default:
        routeScreen = unknownScreen;
    }

    return el('div', [
      vw(navbar),
      el('div.pa2', [
        vw(routeScreen),
      ]),
    ]);
  };
}
