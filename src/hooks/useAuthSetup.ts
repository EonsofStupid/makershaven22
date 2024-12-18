import { useEffect } from 'react';
import { useAuthStore } from '@/lib/store/auth-store';
import { supabase } from '@/integrations/supabase/client';

export const useAuthSetup = () => {
  const { initialize, session, setSession } = useAuthStore();

  useEffect(() => {
    initialize();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => subscription.unsubscribe();
  }, [initialize, setSession]);

  return {
    session,
    handleAuthChange: (session: Session | null) => setSession(session)
  };
};