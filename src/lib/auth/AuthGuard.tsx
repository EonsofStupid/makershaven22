
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/lib/store/auth-store';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { UserRole } from '@/lib/types/core/enums';

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requiredRole?: UserRole | UserRole[];
  fallbackPath?: string;
}

export const AuthGuard = ({ 
  children, 
  requireAuth = false,
  requiredRole,
  fallbackPath = '/login'
}: AuthGuardProps) => {
  const navigate = useNavigate();
  const { session, user, isLoading } = useAuthStore();
  const [hasAccess, setHasAccess] = useState(false);
  const [checkingAccess, setCheckingAccess] = useState(true);

  useEffect(() => {
    const checkAccess = () => {
      console.log('AuthGuard: Checking access', {
        requireAuth,
        requiredRole,
        hasSession: !!session,
        userRole: user?.role,
        userId: user?.id
      });

      // Not loading anymore, make access checks
      if (!isLoading) {
        // Check if auth is required but user is not authenticated
        if (requireAuth && !session) {
          console.log('AuthGuard: No session, redirecting to', fallbackPath);
          toast.error('Please sign in to continue');
          navigate(fallbackPath);
          return false;
        }

        // Check if specific role is required and user has that role
        if (requiredRole && user) {
          const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
          
          if (!user.role || !roles.includes(user.role as UserRole)) {
            console.log('AuthGuard: Insufficient permissions', {
              userRole: user.role,
              requiredRoles: roles
            });
            toast.error('You do not have permission to access this page');
            navigate(fallbackPath);
            return false;
          }
        }
        
        return true;
      }
      
      return false;
    };

    setCheckingAccess(true);
    const access = checkAccess();
    setHasAccess(access);
    setCheckingAccess(false);
  }, [session, user, isLoading, requireAuth, requiredRole, navigate, fallbackPath]);

  if (isLoading || checkingAccess) {
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
