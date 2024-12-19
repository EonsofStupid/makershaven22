import { useEffect, useRef } from 'react';
import { useAuthStore } from '@/lib/store/auth-store';
import { supabase } from '@/integrations/supabase/client';
import type { Session } from '@supabase/supabase-js';

export const useAuthSetup = () => {
  const { initialize, session, setSession } = useAuthStore();
  const setupComplete = useRef(false);

  useEffect(() => {
    if (!setupComplete.current) {
      console.log('Starting auth initialization');
      initialize();
      setupComplete.current = true;
    }

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        console.log('Auth state changed:', _event, session?.user?.id);
        setSession(session);
      }
    );

    return () => {
      console.log('Cleaning up auth subscription');
      subscription.unsubscribe();
    };
  }, [initialize, setSession]);

  return {
    session,
    handleAuthChange: (session: Session | null) => setSession(session),
    initialSetupDone: setupComplete
  };
};