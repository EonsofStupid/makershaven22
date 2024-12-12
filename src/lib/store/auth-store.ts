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
import { authLogger } from '@/lib/auth/AuthLogger';

export const useAuthStore = () => {
  const [session] = useAtom(sessionAtom);
  const [user] = useAtom(userAtom);
  const [isLoading] = useAtom(authLoadingAtom);
  const [error] = useAtom(authErrorAtom);
  const [isOffline] = useAtom(isOfflineAtom);
  
  const [, setSession] = useAtom(setSessionAtom);
  const [, setUser] = useAtom(setUserAtom);
  const [, setLoading] = useAtom(setAuthLoadingAtom);
  const [, setError] = useAtom(setAuthErrorAtom);
  const [, setOffline] = useAtom(setOfflineAtom);

  const signOut = async () => {
    try {
      authLogger.info('Signing out user', { userId: user?.id });
      setLoading(true);
      setError(null);
      
      await sessionManager.handleSignOut();
      securityManager.clearSecurityData();
      
      setSession(null);
      setUser(null);
    } catch (error) {
      const authError = error instanceof Error ? error : new Error('Sign out failed');
      authLogger.error('Sign out error', authError);
      setError(authError);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    authLogger.info('Resetting auth store');
    setSession(null);
    setUser(null);
    setLoading(false);
    setError(null);
  };

  return {
    session,
    user,
    isLoading,
    error,
    isOffline,
    setSession,
    setUser,
    setLoading,
    setError,
    setOffline,
    signOut,
    reset,
  };
};