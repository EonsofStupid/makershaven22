
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Loader2, ShieldAlert } from 'lucide-react';
import { toast } from 'sonner';
import { useAuthStore } from '@/lib/store/auth-store';
import { ErrorBoundary } from '@/components/shared/error-handling/ErrorBoundary';
import { UserRole } from '@/lib/types/core/enums';

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requiredRole?: UserRole | UserRole[];
  fallbackPath?: string;
}

const AuthGuardContent = ({ 
  children, 
  requireAuth = true,
  requiredRole,
  fallbackPath = '/login'
}: AuthGuardProps) => {
  const navigate = useNavigate();
  const { session, user, isLoading } = useAuthStore();

  useEffect(() => {
    console.log('AuthGuard: Checking access', {
      requireAuth,
      requiredRole,
      hasSession: !!session,
      userRole: user?.role
    });

    if (!isLoading) {
      // Check if authentication is required but user is not authenticated
      if (requireAuth && !session) {
        console.log('AuthGuard: No session, redirecting to', fallbackPath);
        toast.error('Please sign in to continue', {
          description: 'You need to be authenticated to access this page'
        });
        // Store the current path for deep linking after auth
        sessionStorage.setItem('redirectAfterAuth', window.location.pathname);
        navigate(fallbackPath);
        return;
      }

      // Check if specific role is required
      if (requiredRole && user?.role) {
        const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
        
        if (!roles.includes(user.role as UserRole)) {
          console.log('AuthGuard: Insufficient permissions, user has role:', user.role);
          toast.error('Access Denied', {
            description: 'You do not have permission to access this page'
          });
          navigate(fallbackPath);
          return;
        }
      }
    }
  }, [session, user, isLoading, requireAuth, requiredRole, navigate, fallbackPath]);

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex items-center justify-center min-h-screen bg-black/50 backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ 
            type: "spring",
            stiffness: 260,
            damping: 20
          }}
          className="flex flex-col items-center gap-4 p-8 rounded-lg bg-black/40 border border-white/10"
        >
          <Loader2 className="h-8 w-8 animate-spin text-[#41f0db]" />
          <p className="text-white/80 text-sm">Verifying access...</p>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};

// Auth-specific error boundary component
const AuthErrorFallback = ({ error }: { error: Error }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
    >
      <div className="max-w-md w-full p-6 bg-black/40 border border-white/10 rounded-lg shadow-xl">
        <div className="flex flex-col items-center gap-4 text-center">
          <ShieldAlert className="h-12 w-12 text-red-500" />
          <h2 className="text-xl font-semibold text-white">Authentication Error</h2>
          <p className="text-white/80">{error.message}</p>
          <button
            onClick={() => navigate('/login')}
            className="px-4 py-2 bg-[#41f0db]/10 hover:bg-[#41f0db]/20 text-[#41f0db] rounded-lg transition-colors"
          >
            Return to Login
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export const AuthGuard = (props: AuthGuardProps) => {
  return (
    <ErrorBoundary fallback={AuthErrorFallback}>
      <AuthGuardContent {...props} />
    </ErrorBoundary>
  );
};
