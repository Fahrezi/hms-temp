import { lazy } from 'react';
export default {
  Login: lazy(() => import('./Login')),
  Register: lazy(() => import('./Register')),
  Detail: lazy(() => import('./Detail')),
  Dashboard: lazy(() => import('./Dashboard')),
  Profile: lazy(() => import('./Profile')),
  Settings: lazy(() => import('./Setting')),
  ListReservation: lazy(() => import('./Reservation/ListReservation')),
  Deposit: lazy(() => import('./Cashier/Deposit')),
  RegisterReservationForm: lazy(() => import('./Reservation/RegisterForm')),
  NewReservationForm: lazy(() => import('./Reservation/ListReservation/NewReservationForm')),
  ReportInvoice: lazy(() => import('./Report/Invoice')),
  Unauthorized: lazy(() => import('./Unauthorized')),
  NotFound: lazy(() => import('./NotFound')),
};
