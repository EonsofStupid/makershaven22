
import { useState, useRef, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Session } from '@supabase/supabase-js';
import { useAuthStore } from '@/lib/store/auth-store';
import { toast } from 'sonner';

export const useAuthSetup = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { setSession, setUser, setLoading, setError } = useAuthStore();
  const initialSetupDone = useRef(false);

  const handleAuthChange = useCallback(async (session: Session | null) => {
    try {
      console.log('handleAuthChange called with session:', session?.user?.id || 'No session');

      if (session) {
        const { user } = session;
        console.log('Setting authenticated user:', user.id);
        
        setSession({
          user: {
            id: user.id,
            email: user.email,
            role: user.user_metadata?.role,
            username: user.user_metadata?.username,
            displayName: user.user_metadata?.display_name || user.user_metadata?.username,
            user_metadata: user.user_metadata
          },
          expires_at: session.expires_at
        });
        
        setUser({
          id: user.id,
          email: user.email,
          role: user.user_metadata?.role,
          username: user.user_metadata?.username,
          displayName: user.user_metadata?.display_name || user.user_metadata?.username,
          user_metadata: user.user_metadata
        });
      } else {
        console.log('No active session, clearing auth state');
        setSession(null);
        setUser(null);
      }
    } catch (error) {
      console.error('Error in handleAuthChange:', error);
      setError(error as Error);
      toast.error('Authentication error');
    } finally {
      setLoading(false);
      setIsLoading(false);
    }
  }, [setSession, setUser, setLoading, setError]);

  return {
    isLoading,
    handleAuthChange,
    initialSetupDone
  };
};
