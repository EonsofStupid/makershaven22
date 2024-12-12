import { useEffect } from 'react';
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
  setOfflineAtom,
  isTransitioningAtom,
  setIsTransitioningAtom
} from './atoms/auth';
import { supabase } from "@/integrations/supabase/client";
import { sessionManager } from '@/lib/auth/SessionManager';
import { securityManager } from '@/lib/auth/SecurityManager';
import { AuthSession, AuthUser } from '@/lib/auth/types';
import { toast } from 'sonner';
import { authLogger } from '@/lib/auth/AuthLogger';

export const useAuthStore = () => {
  // Read-only atoms
  const [session] = useAtom(sessionAtom);
  const [user] = useAtom(userAtom);
  const [isLoading] = useAtom(authLoadingAtom);
  const [error] = useAtom(authErrorAtom);
  const [isOffline] = useAtom(isOfflineAtom);
  const [isTransitioning] = useAtom(isTransitioningAtom);
  
  // Writable atoms
  const [, setSession] = useAtom(setSessionAtom);
  const [, setUser] = useAtom(setUserAtom);
  const [, setLoading] = useAtom(setAuthLoadingAtom);
  const [, setError] = useAtom(setAuthErrorAtom);
  const [, setOffline] = useAtom(setOfflineAtom);
  const [, setIsTransitioning] = useAtom(setIsTransitioningAtom);

  const handleAuthError = (error: Error) => {
    authLogger.error('Auth error:', error);
    setError(error);
    toast.error('Authentication error', {
      description: error.message
    });
  };

  const signOut = async () => {
    try {
      authLogger.info('Signing out user:', user?.id);
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
      
      authLogger.info('Sign out successful');
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
      authLogger.info('Refreshing session');
      const { data: { session }, error } = await supabase.auth.refreshSession();
      if (error) throw error;
      
      if (session) {
        setSession(session as AuthSession);
        setUser(session.user as AuthUser);
        authLogger.info('Session refreshed successfully');
      }
    } catch (error) {
      handleAuthError(error instanceof Error ? error : new Error('Session refresh failed'));
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
    setOffline(false);
  };

  return {
    // State
    session,
    user,
    isLoading,
    error,
    isOffline,
    isTransitioning,
    
    // Setters
    setSession,
    setUser,
    setLoading,
    setError,
    setOffline,
    setIsTransitioning,
    
    // Actions
    signOut,
    refreshSession,
    reset,
  };
};