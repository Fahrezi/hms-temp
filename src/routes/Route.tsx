import { Navigate, RouteObject } from 'react-router-dom';

import AdminLayout from '@/components/layouts/AdminLayout';
import Pages from '@/components/pages';

import RouteGuard from './RouteGuard';

const routes: RouteObject[] = [
  {
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <Navigate to='/dashboard' replace />,
      },
      {
        path: 'dashboard',
        element: (
          <RouteGuard protectedRoute requiredRoles={['admin']}>
            <Pages.Dashboard />
          </RouteGuard>
        ),
      },
      {
        path: 'profile',
        element: (
          <RouteGuard protectedRoute requiredRoles={['admin']}>
            <Pages.Profile />
          </RouteGuard>
        ),
      },
      {
        path: 'detail/:user_id',
        element: (
          <RouteGuard protectedRoute requiredRoles={['admin']}>
            <Pages.Detail />
          </RouteGuard>
        ),
      },
      {
        path: 'settings',
        element: (
          <RouteGuard protectedRoute requiredRoles={['superadmin']}>
            <Pages.Settings />
          </RouteGuard>
        ),
      },
    ],
  },
  {
    path: '/login',
    element: (
      <RouteGuard>
        <Pages.Login />
      </RouteGuard>
    ),
  },
  {
    path: '/register',
    element: (
      <RouteGuard>
        <Pages.Register />
      </RouteGuard>
    ),
  },
  {
    path: '/unauthorized',
    element: <Pages.Unauthorized />,
  },
  {
    path: '*',
    element: <Pages.NotFound />,
  },
];

export default routes;
