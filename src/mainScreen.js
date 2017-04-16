import { defineElement as el, defineView as vw } from 'domvm';
import store from './store';
import routes from './router/routes';
import homeScreen from './home/homeScreen';
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
    switch (currentRoute) {
      case routes.HOME:
        return el('div', [
          vw(homeScreen),
        ]);
      default:
        return el('div', [
          vw(unknownScreen),
        ]);
    }
  };
}
