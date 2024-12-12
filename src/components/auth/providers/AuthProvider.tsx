import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuthSetup } from '@/hooks/useAuthSetup';
import { motion } from "framer-motion";
import { toast } from "sonner";
import { applySecurityHeaders } from "@/utils/auth/securityHeaders";
import { sessionManager } from "@/lib/auth/SessionManager";
import { securityManager } from "@/lib/auth/SecurityManager";
import { AuthErrorBoundary } from "@/components/auth/error-handling/AuthErrorBoundary";
import { LoadingOverlay } from "@/components/auth/components/loading/LoadingOverlay";
import { useAtom } from 'jotai';
import { 
  sessionAtom,
  userAtom,
  loadingStateAtom,
  authErrorAtom,
  setSessionAtom,
  setUserAtom,
  setLoadingStateAtom,
  setAuthErrorAtom,
  isTransitioningAtom,
  setIsTransitioningAtom
} from '@/lib/store/atoms/auth';

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { handleAuthChange, initialSetupDone } = useAuthSetup();
  const [session] = useAtom(sessionAtom);
  const [, setSession] = useAtom(setSessionAtom);
  const [, setUser] = useAtom(setUserAtom);
  const [loadingState] = useAtom(loadingStateAtom);
  const [, setLoadingState] = useAtom(setLoadingStateAtom);
  const [error] = useAtom(authErrorAtom);
  const [, setError] = useAtom(setAuthErrorAtom);
  const [isTransitioning] = useAtom(isTransitioningAtom);
  const [, setIsTransitioning] = useAtom(setIsTransitioningAtom);

  useEffect(() => {
    console.log('AuthProvider mounted - Starting initialization');
    
    const initSecurity = async () => {
      try {
        setLoadingState({ isLoading: true, message: 'Initializing security...' });
        const success = await applySecurityHeaders();
        if (!success) {
          console.warn('Security headers could not be applied, continuing with default security settings');
        }
      } catch (error) {
        console.error('Error initializing security headers:', error);
        setError(error instanceof Error ? error : new Error('Failed to initialize security'));
        return false;
      }
      return true;
    };

    if (initialSetupDone.current) {
      console.log('Initial setup already done, skipping');
      setLoadingState({ isLoading: false });
      return;
    }
    
    initialSetupDone.current = true;
    let retryCount = 0;
    const maxRetries = 3;
    const retryDelay = 1000;

    const setupAuth = async () => {
      setLoadingState({ isLoading: true, message: 'Setting up authentication...' });
      
      try {
        setIsTransitioning(true);
        
        const securityInitialized = await initSecurity();
        if (!securityInitialized) {
          throw new Error('Security initialization failed');
        }
        
        try {
          await sessionManager.startSession();
          await securityManager.initialize();
          console.log('Security systems initialized');
        } catch (securityError) {
          console.error('Error initializing security systems:', securityError);
          throw securityError;
        }

        const { data: { session: supabaseSession }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          if (sessionError.message.includes('refresh_token_not_found')) {
            console.log('Refresh token not found, signing out');
            await supabase.auth.signOut();
            setSession(null);
            setUser(null);
            setLoadingState({ isLoading: false });
            setIsTransitioning(false);
            return;
          }
          throw sessionError;
        }

        console.log('Initial session check:', supabaseSession?.user?.id || 'No session');
        await handleAuthChange(supabaseSession);
        setLoadingState({ isLoading: false });
        setIsTransitioning(false);

      } catch (error) {
        console.error("Auth setup error:", error);
        if (retryCount < maxRetries) {
          retryCount++;
          console.log(`Retrying auth setup (${retryCount}/${maxRetries})...`);
          setTimeout(setupAuth, retryDelay * retryCount);
        } else {
          setError(error instanceof Error ? error : new Error('Failed to initialize authentication'));
          setIsTransitioning(false);
          setLoadingState({ isLoading: false });
        }
      }
    };

    setupAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, supabaseSession) => {
      try {
        console.log('Auth state changed:', event, supabaseSession?.user?.id);
        setLoadingState({ 
          isLoading: true, 
          message: 'Updating authentication state...' 
        });
        setIsTransitioning(true);

        await handleAuthChange(supabaseSession);
        setLoadingState({ isLoading: false });
      } catch (error) {
        console.error('Auth state change error:', error);
        setError(error instanceof Error ? error : new Error('Authentication error occurred'));
        toast.error('Authentication error', {
          description: 'There was a problem with your session. Please try signing in again.',
        });
      } finally {
        setIsTransitioning(false);
      }
    });
    
    return () => {
      console.log('Cleaning up AuthProvider');
      subscription.unsubscribe();
      sessionManager.destroy();
      securityManager.cleanup();
      setLoadingState({ isLoading: false });
    };
  }, [handleAuthChange, setLoadingState, setSession, setUser, setError, setIsTransitioning]);

  return (
    <AuthErrorBoundary>
      <LoadingOverlay 
        isVisible={loadingState.isLoading} 
        message={loadingState.message}
        timeout={120000}
        onTimeout={() => setError(new Error('Operation timed out'))}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </AuthErrorBoundary>
  );
};