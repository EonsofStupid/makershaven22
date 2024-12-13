import React from 'react';
import type { AuthGuardProps } from '@/lib/auth/types/auth';
import { useAuthStore } from '@/lib/store/auth-store';
import { Navigate } from 'react-router-dom';

const AuthGuard: React.FC<AuthGuardProps> = ({ children, requireAuth = true, requiredRole, fallbackPath }) => {
  const { user, isLoading } = useAuthStore();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (requireAuth && !user) {
    return <Navigate to={fallbackPath || '/login'} replace />;
  }

  if (requiredRole && user && !user.role) {
    return <Navigate to={fallbackPath || '/unauthorized'} replace />;
  }

  return <>{children}</>;
};

export default AuthGuard;
