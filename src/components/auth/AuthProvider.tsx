import React, { useEffect } from 'react';
import { useAuthStore } from '@/lib/store/auth-store';
import { supabase } from '@/integrations/supabase/client';
import type { AuthSession } from '@/lib/types/auth/types';

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { initialize, handleSessionUpdate } = useAuthStore();

  useEffect(() => {
    initialize();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      handleSessionUpdate(session as AuthSession);
    });

    return () => subscription.unsubscribe();
  }, [initialize, handleSessionUpdate]);

  return <>{children}</>;
};
