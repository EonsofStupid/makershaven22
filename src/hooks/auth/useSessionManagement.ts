import { useCallback } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useAtom } from 'jotai';
import { 
  sessionAtom, 
  userAtom,
  setSessionAtom,
  setUserAtom
} from '@/lib/store/atoms/auth';
import { storeSessionLocally } from '@/utils/auth/offlineAuth';
import { registerUserSession, cleanupUserSessions } from '@/utils/auth/sessionManager';
import { handleSecurityEvent } from '@/utils/auth/securityHandlers';
import { attachCSRFToken, clearCSRFToken } from '@/utils/auth/csrfProtection';
import { toast } from 'sonner';

export const useSessionManagement = () => {
  const [session] = useAtom(sessionAtom);
  const [, setSession] = useAtom(setSessionAtom);
  const [, setUser] = useAtom(setUserAtom);

  const handleSessionUpdate = useCallback(async (session: any) => {
    if (session?.user) {
      try {
        await attachCSRFToken();
        storeSessionLocally(session);
        await registerUserSession(session.user.id);

        const { data: profile, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
          
        if (error) {
          console.error('Error fetching profile:', error);
          throw error;
        }
        
        if (!profile) {
          console.error('No profile found');
          throw new Error('No profile found');
        }
        
        setSession(session);
        setUser({ ...session.user, role: profile.role });
        
        await handleSecurityEvent(session.user.id, 'successful_auth', 'low');

        const expiresIn = session.expires_in || 3600;
        const refreshBuffer = 60;
        const refreshTimeout = (expiresIn - refreshBuffer) * 1000;
        
        setTimeout(async () => {
          console.log('Refreshing session token');
          const { data: { session: newSession }, error: refreshError } = await supabase.auth.refreshSession();
          
          if (refreshError || !newSession) {
            console.error('Failed to refresh session:', refreshError);
            await supabase.auth.signOut();
            setSession(null);
            setUser(null);
            clearCSRFToken();
          }
        }, refreshTimeout);

      } catch (error) {
        console.error('Session update error:', error);
        throw error;
      }
    } else {
      storeSessionLocally(null);
      setSession(null);
      setUser(null);
      clearCSRFToken();
      
      const currentUser = await supabase.auth.getUser();
      if (currentUser.data.user) {
        await cleanupUserSessions(currentUser.data.user.id);
      }
    }
  }, [setSession, setUser]);

  return { handleSessionUpdate };
};