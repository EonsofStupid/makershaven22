import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useSyncedAuth } from '@/lib/store/hooks/useSyncedStore';
import type { AuthGuardProps } from '@/lib/types/auth';

export const AuthGuard = ({ 
  children, 
  requireAuth = false,
  requiredRole,
  fallbackPath = '/login'
}: AuthGuardProps) => {
  const navigate = useNavigate();
  const { user, isAuthLoading } = useSyncedAuth();

  useEffect(() => {
    if (!isAuthLoading) {
      if (requireAuth && !user) {
        console.log('AuthGuard: No user found, redirecting to', fallbackPath);
        toast.error('Please sign in to continue');
        navigate(fallbackPath);
        return;
      }

      if (requiredRole && user) {
        const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
        if (!user.role || !roles.includes(user.role)) {
          console.log('AuthGuard: Insufficient permissions');
          toast.error('You do not have permission to access this page');
          navigate('/');
          return;
        }
      }
    }
  }, [user, isAuthLoading, requireAuth, requiredRole, navigate, fallbackPath]);

  if (isAuthLoading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex items-center justify-center min-h-screen"
      >
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </motion.div>
    );
  }

  return <>{children}</>;
};