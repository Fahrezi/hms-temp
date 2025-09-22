import { lazy } from 'react';

export default {
  Login: lazy(() => import('./Login')),
  Register: lazy(() => import('./Register')),
  Detail: lazy(() => import('./Detail')),
  Dashboard: lazy(() => import('./Dashboard')),
  Profile: lazy(() => import('./Profile')),
  Settings: lazy(() => import('./Setting')),
  Unauthorized: lazy(() => import('./Unauthorized')),
  NotFound: lazy(() => import('./NotFound')),
};
