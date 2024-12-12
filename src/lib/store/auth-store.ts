import { useAtom } from 'jotai';
import { 
  sessionAtom, 
  userAtom, 
  authLoadingAtom, 
  authErrorAtom, 
  isOfflineAtom,
  setSessionAtom,
  setUserAtom,
  setAuthLoadingAtom,
  setAuthErrorAtom,
  setOfflineAtom
} from './atoms/auth';
import { supabase } from "@/integrations/supabase/client";
import { sessionManager } from '@/lib/auth/SessionManager';
import { securityManager } from '@/lib/auth/SecurityManager';
import { AuthSession, AuthUser } from '../auth/types';
import { toast } from 'sonner';

export const useAuthStore = () => {
  // Read-only atoms
  const [session] = useAtom(sessionAtom);
  const [user] = useAtom(userAtom);
  const [isLoading] = useAtom(authLoadingAtom);
  const [error] = useAtom(authErrorAtom);
  const [isOffline] = useAtom(isOfflineAtom);
  
  // Writable atoms
  const [, setSession] = useAtom(setSessionAtom);
  const [, setUser] = useAtom(setUserAtom);
  const [, setLoading] = useAtom(setAuthLoadingAtom);
  const [, setError] = useAtom(setAuthErrorAtom);
  const [, setOffline] = useAtom(setOfflineAtom);

  // Initialize offline detection
  useEffect(() => {
    const handleOnline = () => setOffline(false);
    const handleOffline = () => setOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [setOffline]);

  const handleAuthError = (error: Error) => {
    console.error('Auth error:', error);
    setError(error);
    toast.error('Authentication error', {
      description: error.message
    });
  };

  const signOut = async () => {
    try {
      console.log('Signing out user:', user?.id);
      setLoading(true);
      setError(null);
      
      // Clean up session and security
      await sessionManager.handleSignOut();
      securityManager.clearSecurityData();
      
      // Sign out from Supabase
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      // Clear local state
      setSession(null);
      setUser(null);
      
      toast.success('Signed out successfully');
    } catch (error) {
      const authError = error instanceof Error ? error : new Error('Sign out failed');
      handleAuthError(authError);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const refreshSession = async () => {
    try {
      setLoading(true);
      const { data: { session }, error } = await supabase.auth.refreshSession();
      if (error) throw error;
      
      if (session) {
        setSession(session as AuthSession);
        setUser(session.user as AuthUser);
      }
    } catch (error) {
      handleAuthError(error instanceof Error ? error : new Error('Session refresh failed'));
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    console.log('Resetting auth store');
    setSession(null);
    setUser(null);
    setLoading(false);
    setError(null);
    setOffline(false);
  };

  return {
    // State
    session,
    user,
    isLoading,
    error,
    isOffline,
    
    // Setters
    setSession,
    setUser,
    setLoading,
    setError,
    setOffline,
    
    // Actions
    signOut,
    refreshSession,
    reset,
  };
};