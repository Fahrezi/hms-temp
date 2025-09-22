import type { UserRole } from './auth';

export type RouteGuardProps = {
  children: React.ReactNode;
  protectedRoute?: boolean;
  requiredRoles?: UserRole[];
};
