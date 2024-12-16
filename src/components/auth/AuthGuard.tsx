import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@/lib/store/auth-store';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requiredRole?: string | string[];
  fallbackPath?: string;
}

export const AuthGuard = ({ 
  children, 
  requireAuth = true, 
  requiredRole, 
  fallbackPath = '/login'
}: AuthGuardProps) => {
  const { user, isLoading } = useAuthStore();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (requireAuth && !user) {
    return <Navigate to={fallbackPath} replace />;
  }

  if (requiredRole && user && !user.role) {
    return <Navigate to={fallbackPath || '/unauthorized'} replace />;
  }

  if (requiredRole && user?.role) {
    const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
    if (!roles.includes(user.role)) {
      return <Navigate to={fallbackPath || '/unauthorized'} replace />;
    }
  }

  return <>{children}</>;
};

export default AuthGuard;