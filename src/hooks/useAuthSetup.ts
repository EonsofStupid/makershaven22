
import { useState, useRef, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Session } from '@supabase/supabase-js';
import { useAuthStore } from '@/lib/store/auth-store';
import { toast } from 'sonner';

export const useAuthSetup = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { setSession, setUser, setIsSignedIn } = useAuthStore();
  const initialSetupDone = useRef(false);

  const handleAuthChange = useCallback(async (session: Session | null) => {
    setIsLoading(true);
    try {
      console.log('handleAuthChange called with session:', session?.user?.id || 'No session');

      if (session) {
        const { user } = session;
        console.log('Setting authenticated user:', user.id);
        
        setSession(session);
        setUser({
          id: user.id,
          email: user.email,
          username: user.user_metadata?.username,
          displayName: user.user_metadata?.display_name || user.user_metadata?.username,
          user_metadata: user.user_metadata
        });
        setIsSignedIn(true);
      } else {
        console.log('No active session, clearing auth state');
        setSession(null);
        setUser(null);
        setIsSignedIn(false);
      }
    } catch (error) {
      console.error('Error in handleAuthChange:', error);
      toast.error('Authentication error');
    } finally {
      setIsLoading(false);
    }
  }, [setSession, setUser, setIsSignedIn]);

  return {
    isLoading,
    handleAuthChange,
    initialSetupDone
  };
};
