import { useCallback, useRef } from 'react';
import { useAuthStore } from '@/lib/store/auth-store';
import { toast } from "sonner";
import { useSessionManagement } from './auth/useSessionManagement';
import { useAuthValidation } from './auth/useAuthValidation';
import { handleSecurityEvent } from '@/utils/auth/securityHandlers';
import { supabase } from "@/integrations/supabase/client";
import { attachCSRFToken, clearCSRFToken } from '@/utils/auth/csrfProtection';
import { authManager } from '@/lib/auth/AuthManager';

export const useAuthSetup = () => {
  const { setLoading, setError } = useAuthStore();
  const initialSetupDone = useRef(false);
  const sessionTimeoutRef = useRef<NodeJS.Timeout>();
  const retryAttempts = useRef(0);
  const MAX_RETRY_ATTEMPTS = 3;
  
  const { handleSessionUpdate } = useSessionManagement();
  const { validateAuthAttempt } = useAuthValidation();
  
  const handleAuthChange = useCallback(async (session) => {
    console.log('Handling auth change:', session?.user?.id);
    setLoading(true);
    setError(null);
    
    try {
      if (sessionTimeoutRef.current) {
        clearTimeout(sessionTimeoutRef.current);
      }

      if (session?.user) {
        const loadingToast = toast.loading('Authenticating...');

        try {
          await attachCSRFToken();
          await validateAuthAttempt(session);
          await authManager.startSession();
          
        } catch (validationError) {
          console.error('Auth validation failed:', validationError);
          clearCSRFToken();
          authManager.destroy();
          await supabase.auth.signOut();
          throw validationError;
        }

        await handleSessionUpdate(session);
        
        toast.dismiss(loadingToast);
        toast.success('Successfully authenticated');
        retryAttempts.current = 0;
      } else {
        clearCSRFToken();
        authManager.destroy();
        await handleSessionUpdate(session);
        toast.success('Signed out successfully');
      }
    } catch (error) {
      console.error('Error in auth change handler:', error);
      setError(error instanceof Error ? error : new Error('An unexpected error occurred'));
      
      if (session?.user) {
        await handleSecurityEvent(
          session.user.id,
          'auth_error',
          'high',
          { error: error instanceof Error ? error.message : 'Unknown error' }
        );

        if (retryAttempts.current < MAX_RETRY_ATTEMPTS) {
          retryAttempts.current++;
          console.log(`Retrying auth setup (${retryAttempts.current}/${MAX_RETRY_ATTEMPTS})`);
          setTimeout(() => handleAuthChange(session), 1000 * retryAttempts.current);
          return;
        }
      }
      
      toast.error('Authentication error', {
        description: error instanceof Error ? error.message : 'An unexpected error occurred'
      });
    } finally {
      setLoading(false);
    }
  }, [setLoading, setError, handleSessionUpdate, validateAuthAttempt]);

  return { handleAuthChange, initialSetupDone };
};