
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/lib/store/auth-store';
import { motion } from 'framer-motion';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { toast } from 'sonner';

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requiredRole?: string | string[];
  fallbackPath?: string;
  waitForAuth?: boolean;
}

export const AuthGuard = ({ 
  children, 
  requireAuth = false,
  requiredRole,
  fallbackPath = '/login',
  waitForAuth = false,
}: AuthGuardProps) => {
  const navigate = useNavigate();
  const { session, user, isLoading } = useAuthStore();
  const [isCheckingAuth, setIsCheckingAuth] = useState(waitForAuth);

  useEffect(() => {
    console.log('AuthGuard: Checking access', {
      requireAuth,
      requiredRole,
      hasSession: !!session,
      userRole: user?.role
    });

    if (!isLoading) {
      // If we need to check auth and there's no session
      if (requireAuth && !session) {
        console.log('AuthGuard: No session, redirecting to', fallbackPath);
        if (location.pathname !== fallbackPath) {
          toast.error('Please sign in to continue');
          navigate(fallbackPath);
        }
        return;
      }

      // If we have a session and specific roles are required
      if (requiredRole && user) {
        const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
        if (!roles.includes(user.role as string)) {
          console.log('AuthGuard: Insufficient permissions');
          toast.error('You do not have permission to access this page');
          navigate('/');
          return;
        }
      }

      // Auth checks complete
      setIsCheckingAuth(false);
    }
  }, [session, user, isLoading, requireAuth, requiredRole, navigate, fallbackPath]);

  // If we're still loading auth and the component should wait
  if ((isLoading && waitForAuth) || isCheckingAuth) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex items-center justify-center min-h-[200px]"
      >
        <LoadingSpinner size="md" color="neon-cyan" />
      </motion.div>
    );
  }

  // Auth checks passed or not required, render children
  return <>{children}</>;
};
