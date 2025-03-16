
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/lib/store/auth-store';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Shield, User, Loader } from 'lucide-react';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';

interface AuthBoundaryProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requiredRole?: string | string[];
  fallbackPath?: string;
  waitForAuth?: boolean;
}

export const AuthBoundary = ({
  children,
  requireAuth = true,
  requiredRole,
  fallbackPath = '/auth/login',
  waitForAuth = true,
}: AuthBoundaryProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoading, getIsAuthenticated, getUserRole, refreshUserRole } = useAuthStore();
  const [isCheckingAuth, setIsCheckingAuth] = useState(waitForAuth);
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    const checkAccess = async () => {
      // Always refresh the user role to ensure it's up-to-date
      if (getIsAuthenticated()) {
        await refreshUserRole();
      }
      
      const isAuthenticated = getIsAuthenticated();
      const userRole = getUserRole();
      
      console.log('AuthBoundary: Checking access', {
        requireAuth,
        requiredRole,
        isAuthenticated,
        userRole,
        path: location.pathname
      });

      // Case 1: Authentication is required but user is not authenticated
      if (requireAuth && !isAuthenticated) {
        console.log('AuthBoundary: No authentication, redirecting to', fallbackPath);
        setHasAccess(false);
        
        if (location.pathname !== fallbackPath) {
          // Store the current location so we can redirect back after login
          const returnPath = location.pathname + location.search;
          sessionStorage.setItem('authReturnPath', returnPath);
          
          toast.error('Please sign in to continue');
          navigate(fallbackPath);
        }
        return;
      }

      // Case 2: Specific role is required
      if (requiredRole && isAuthenticated) {
        const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
        const hasRole = userRole && roles.includes(userRole);
        
        if (!hasRole) {
          console.log('AuthBoundary: Insufficient permissions');
          setHasAccess(false);
          
          toast.error('You do not have permission to access this page');
          navigate('/');
          return;
        }
      }

      // If we get here, user has access
      setHasAccess(true);
      setIsCheckingAuth(false);
    };

    if (!isLoading) {
      checkAccess();
    }
  }, [isLoading, requireAuth, requiredRole, getIsAuthenticated, getUserRole, navigate, location, fallbackPath, refreshUserRole]);

  // If we're still loading auth and the component should wait
  if ((isLoading && waitForAuth) || isCheckingAuth) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex flex-col items-center justify-center min-h-[200px] gap-4"
      >
        <LoadingSpinner size="md" color="neon-cyan" />
        <p className="text-white/70">Checking access...</p>
      </motion.div>
    );
  }

  // If auth check failed and we're not redirecting
  if (requireAuth && !hasAccess && location.pathname !== fallbackPath) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex flex-col items-center justify-center min-h-[300px] gap-6 p-6 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10"
      >
        <Shield className="w-16 h-16 text-[#ff0abe]" />
        <h2 className="text-2xl font-bold text-white">Access Restricted</h2>
        <p className="text-white/70 text-center max-w-md">
          You need to be logged in to access this content.
        </p>
        <div className="flex gap-4">
          <Button
            onClick={() => navigate(fallbackPath)}
            className="bg-[#ff0abe] hover:bg-[#ff0abe]/80 text-white"
          >
            <User className="mr-2 h-4 w-4" />
            Log In
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate('/')}
            className="border-white/10 text-white hover:bg-white/5"
          >
            Back to Home
          </Button>
        </div>
      </motion.div>
    );
  }

  // Allow access to any content that should be visible without auth
  if (!requireAuth || hasAccess) {
    return <>{children}</>;
  }

  // Fallback
  return null;
};
