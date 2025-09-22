import { Navigate, useLocation } from 'react-router-dom';

import Loading from '@/components/ui/Loading';

import { useAuth } from '@/hooks/useAuth';

import { RouteGuardProps } from '@/types/routes';

const RouteGuard = ({ children, protectedRoute = false, requiredRoles }: RouteGuardProps) => {
  const { isAuthenticated, user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <Loading />;
  }

  if (protectedRoute && !isAuthenticated) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  if (!protectedRoute && isAuthenticated) {
    return <Navigate to='/dashboard' replace />;
  }

  if (protectedRoute && requiredRoles && user) {
    const hasRequiredRole = requiredRoles.some((role) => user.roles.includes(role));
    if (!hasRequiredRole) {
      return <Navigate to='/unauthorized' replace />;
    }
  }

  return <>{children}</>;
};

export default RouteGuard;
