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
        path: 'guest/guest-list',
        element: (
          <RouteGuard protectedRoute>
            <Pages.GuestList />
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
      {
        path: 'reception',
        element: (
          <RouteGuard protectedRoute>
            <Pages.Reception />
          </RouteGuard>
        ),
      },
      {
        path: 'reservation/list-reservation',
        element: (
          <RouteGuard protectedRoute>
            <Pages.ListReservation />
          </RouteGuard>
        ),
      },
      {
        path: 'reservation/guest-in-house',
        element: (
          <RouteGuard protectedRoute>
            <Pages.GuestInHouse />
          </RouteGuard>
        ),
      },
      {
        path: 'reservation/register',
        element: (
          <RouteGuard protectedRoute>
            <Pages.RegisterReservationForm />
          </RouteGuard>
        ),
      },
      {
        path: 'reservation/list-reservation/new-reservation',
        element: (
          <RouteGuard protectedRoute>
            <Pages.NewReservationForm />
          </RouteGuard>
        ),
      },
      {
        path: 'cashier/deposit',
        element: (
          <RouteGuard protectedRoute>
            <Pages.Deposit />
          </RouteGuard>
        ),
      },
      {
        path: 'cashier/guest-account',
        element: (
          <RouteGuard protectedRoute>
            <Pages.GuestAccount />
          </RouteGuard>
        ),
      },
      {
        path: 'cashier/batch-posting',
        element: (
          <RouteGuard protectedRoute>
            <Pages.BatchPosting />
          </RouteGuard>
        ),
      },
      {
        path: 'report/invoice-report',
        element: (
          <RouteGuard protectedRoute>
            <Pages.ReportInvoice />
          </RouteGuard>
        ),
      }
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
