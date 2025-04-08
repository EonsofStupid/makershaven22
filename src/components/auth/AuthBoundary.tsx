
import { FC, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@/lib/store/auth-store';
import { UserRole } from '@/lib/types/core/enums';
import { LoadingScreen } from './components/loading/LoadingScreen';
import { SessionTransition } from './components/loading/SessionTransition';

interface AuthGuardProps {
  children: ReactNode;
  requireAuth?: boolean;
  requiredRole?: UserRole | UserRole[];
  fallbackPath?: string;
  loadingFallback?: ReactNode;
}

export const AuthGuard: FC<AuthGuardProps> = ({
  children,
  requireAuth = false,
  requiredRole,
  fallbackPath = '/',
  loadingFallback = <LoadingScreen />
}) => {
  const auth = useAuthStore();
  
  // Show loading state if auth is still loading
  if (auth.isLoading) {
    return <>{loadingFallback}</>;
  }
  
  // Show transition state if session is changing
  if (auth.isTransitioning) {
    return <SessionTransition />;
  }

  const isAuthenticated = !!auth.user;
  const userRole = auth.user?.role;
  
  // Handle authentication requirements
  if (requireAuth && !isAuthenticated) {
    return <Navigate to={fallbackPath} replace />;
  }
  
  // Handle role requirements if the user is authenticated
  if (isAuthenticated && requiredRole) {
    const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
    
    if (!userRole || !roles.includes(userRole as UserRole)) {
      return <Navigate to={fallbackPath} replace />;
    }
  }
  
  // If all checks pass, render the children
  return <>{children}</>;
};

// For backward compatibility, also export as AuthBoundary
export const AuthBoundary = AuthGuard;
