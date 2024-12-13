import React from 'react';
import type { AuthGuardProps } from '@/lib/auth/types/auth';
import { Navigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { userAtom, loadingStateAtom } from '@/lib/store/atoms/auth';

export const AuthGuard: React.FC<AuthGuardProps> = ({ 
  children, 
  requireAuth = true, 
  requiredRole, 
  fallbackPath 
}) => {
  const [user] = useAtom(userAtom);
  const [loadingState] = useAtom(loadingStateAtom);

  if (loadingState.isLoading) {
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