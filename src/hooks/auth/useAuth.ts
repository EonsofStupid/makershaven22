import { useAtom } from 'jotai';
import { useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { 
  authUserAtom,
  authSessionAtom,
  authLoadingAtom,
  authErrorAtom,
  setAuthStateAtom,
  isAuthenticatedAtom
} from '@/lib/store/auth';
import { toast } from 'sonner';

export const useAuth = () => {
  const [user] = useAtom(authUserAtom);
  const [session] = useAtom(authSessionAtom);
  const [isLoading] = useAtom(authLoadingAtom);
  const [error] = useAtom(authErrorAtom);
  const [isAuthenticated] = useAtom(isAuthenticatedAtom);
  const [, setAuthState] = useAtom(setAuthStateAtom);

  const signOut = useCallback(async () => {
    try {
      setAuthState({ isLoading: true, error: null });
      await supabase.auth.signOut();
      setAuthState({ 
        user: null,
        session: null,
        isLoading: false
      });
      toast.success('Successfully signed out');
    } catch (error) {
      console.error('Sign out error:', error);
      setAuthState({ 
        error: error as Error,
        isLoading: false
      });
      toast.error('Failed to sign out');
    }
  }, [setAuthState]);

  return {
    user,
    session,
    isLoading,
    error,
    isAuthenticated,
    signOut,
    setAuthState
  };
};