
import { useAuthStore } from '../store';

/**
 * Hook to access auth state
 */
export function useAuthState() {
  const { 
    user, 
    session, 
    isLoading, 
    isTransitioning, 
    hasAccess, 
    error,
    logout 
  } = useAuthStore();
  
  const isAuthenticated = !!session && !!user;
  const isAdmin = user?.role === 'admin' || user?.role === 'super_admin';
  
  return {
    user,
    session,
    isLoading,
    isTransitioning,
    hasAccess,
    error,
    isAuthenticated,
    isAdmin,
    logout,
  };
}
