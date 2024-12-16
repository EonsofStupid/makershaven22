import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSyncedAuth } from '@/lib/store/hooks/useSyncedStore';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import type { AuthGuardProps } from '@/lib/types/auth/base';
import type { UserRole } from '@/lib/types/base';

export const AuthGuard: React.FC<AuthGuardProps> = ({
  children,
  requireAuth = false,
  requiredRole,
  fallbackPath = '/auth/login',
  loadingComponent = <LoadingSpinner />,
  unauthorizedComponent = <Navigate to={fallbackPath} replace />,
  onError
}) => {
  const { user, isAuthLoading, error } = useSyncedAuth();
  const location = useLocation();

  React.useEffect(() => {
    if (error && onError) {
      onError(error);
    }
  }, [error, onError]);

  if (isAuthLoading) {
    return <>{loadingComponent}</>;
  }

  if (requireAuth && !user) {
    return <Navigate to={fallbackPath} state={{ from: location }} replace />;
  }

  if (requiredRole && user) {
    const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
    if (!roles.includes(user.role as UserRole)) {
      return <>{unauthorizedComponent}</>;
    }
  }

  return <>{children}</>;
};

export default AuthGuard;