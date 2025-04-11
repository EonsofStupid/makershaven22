
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from '@/auth/hooks/useAuthState';

interface AuthGuardProps {
  children: React.ReactNode;
  requiredRole?: string;
  fallbackPath?: string;
}

export const AuthGuard = ({ 
  children, 
  requiredRole,
  fallbackPath = '/login'
}: AuthGuardProps) => {
  const { isAuthenticated, user, isLoading } = useAuthState();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        navigate(fallbackPath);
        return;
      }

      if (requiredRole && user?.role !== requiredRole) {
        navigate('/');
      }
    }
  }, [isAuthenticated, user, isLoading, navigate, requiredRole, fallbackPath]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? <>{children}</> : null;
};

export default AuthGuard;
