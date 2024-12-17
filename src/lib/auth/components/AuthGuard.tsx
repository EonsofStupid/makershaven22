import React from "react";
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/lib/store/auth-store';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import type { AuthGuardProps } from '../types';

export const AuthGuard: React.FC<AuthGuardProps> = ({ 
  children, 
  requireAuth = true, 
  requiredRole, 
  fallbackPath = '/login'
}) => {
  const { user, isLoading } = useAuthStore();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (requireAuth && !user) {
    return <Navigate to={fallbackPath} state={{ from: location }} replace />;
  }

  if (requiredRole && user && !user.role) {
    return <Navigate to="/unauthorized" replace />;
  }

  if (requiredRole && user?.role) {
    const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
    if (!roles.includes(user.role)) {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  return <>{children}</>;
};