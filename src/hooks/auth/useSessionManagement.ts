import { useCallback } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useAuthStore } from '@/lib/store/auth-store';
import { storeSessionLocally } from '@/utils/auth/offlineAuth';
import { registerUserSession, cleanupUserSessions } from '@/utils/auth/sessionManager';
import { handleSecurityEvent } from '@/utils/auth/securityHandlers';
import { attachCSRFToken, clearCSRFToken } from '@/utils/auth/csrfProtection';
import { toast } from 'sonner';

export const useSessionManagement = () => {
  const { handleSessionUpdate } = useAuthStore();

  const handleSession = useCallback(async (session: any) => {
    if (session?.user) {
      try {
        await attachCSRFToken();
        storeSessionLocally(session);
        await registerUserSession(session.user.id);
        await handleSessionUpdate(session);
        await handleSecurityEvent(session.user.id, 'successful_auth', 'low');
      } catch (error) {
        console.error('Session handling error:', error);
        throw error;
      }
    } else {
      storeSessionLocally(null);
      await handleSessionUpdate(null);
      clearCSRFToken();
      
      const currentUser = await supabase.auth.getUser();
      if (currentUser.data.user) {
        await cleanupUserSessions(currentUser.data.user.id);
      }
    }
  }, [handleSessionUpdate]);

  return { handleSession };
};