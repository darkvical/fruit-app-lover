import { Router } from '@vaadin/router';
import { FRUIT_LOVERS, NEW_EMPLOYEE } from './urls';

export function init(outlet) {
  const router = new Router(outlet);
  router.setRoutes([
    {
      path: '/',
      redirect: FRUIT_LOVERS
    },
    {
      path: FRUIT_LOVERS,
      component: 'fruit-lovers',
      action: () => {
        import(/* webpackChunkName: "list" */ '../views/fruit-lovers');
      }
    },
    {
      path: NEW_EMPLOYEE,
      component: 'employee-new',
      action: () => {
        import(/* webpackChunkName: "new" */ '../views/employee-new');
      }
    },
    {
      path: '(.*)+',
      component: 'app-404',
      action: () => {
        import(/* webpackChunkName: "404" */ '../views/404');
      }
    }
  ]);
}
