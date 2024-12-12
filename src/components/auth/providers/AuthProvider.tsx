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
import { useLoadingState } from "@/hooks/useLoadingState";
import { useAtom } from 'jotai';
import type { AuthSession, AuthUser } from '@/lib/auth/types/auth';
import { 
  sessionAtom,
  userAtom,
  authLoadingAtom,
  authErrorAtom,
  isTransitioningAtom,
  setSessionAtom,
  setUserAtom,
  setAuthLoadingAtom,
  setAuthErrorAtom,
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
  const [isLoading] = useAtom(authLoadingAtom);
  const [, setLoading] = useAtom(setAuthLoadingAtom);
  const [error] = useAtom(authErrorAtom);
  const [, setError] = useAtom(setAuthErrorAtom);
  const [isTransitioning] = useAtom(isTransitioningAtom);
  const [, setIsTransitioning] = useAtom(setIsTransitioningAtom);

  const { 
    isLoading: loadingState, 
    message, 
    startLoading, 
    stopLoading, 
    setError: setLoadingError, 
    progress 
  } = useLoadingState({
    timeout: 120000,
    progressInterval: 1000,
    onTimeout: () => {
      console.error('Auth initialization timed out');
      toast.error('Authentication initialization timed out', {
        description: 'Please refresh the page and try again. If the problem persists, contact support.'
      });
      setError(new Error('Authentication initialization timed out'));
    }
  });

  useEffect(() => {
    console.log('AuthProvider mounted - Starting initialization');
    
    const initSecurity = async () => {
      try {
        startLoading('Initializing security...');
        const success = await applySecurityHeaders();
        if (!success) {
          console.warn('Security headers could not be applied, continuing with default security settings');
        }
      } catch (error) {
        console.error('Error initializing security headers:', error);
        setLoadingError(error instanceof Error ? error : new Error('Failed to initialize security'));
        return false;
      }
      return true;
    };

    if (initialSetupDone.current) {
      console.log('Initial setup already done, skipping');
      stopLoading();
      return;
    }
    
    initialSetupDone.current = true;
    let retryCount = 0;
    const maxRetries = 3;
    const retryDelay = 1000;

    const setupAuth = async () => {
      const cleanup = startLoading('Setting up authentication...');
      
      try {
        setLoading(true);
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
            stopLoading();
            setIsTransitioning(false);
            return;
          }
          throw sessionError;
        }

        // Transform Supabase session to our AuthSession type
        const authSession: AuthSession | null = supabaseSession ? {
          user: {
            id: supabaseSession.user.id,
            email: supabaseSession.user.email,
            role: supabaseSession.user.user_metadata?.role,
            username: supabaseSession.user.user_metadata?.username,
            displayName: supabaseSession.user.user_metadata?.display_name,
            user_metadata: supabaseSession.user.user_metadata
          },
          expires_at: supabaseSession.expires_at
        } : null;

        console.log('Initial session check:', authSession?.user?.id || 'No session');
        await handleAuthChange(authSession);
        stopLoading();
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
          cleanup?.();
        }
      } finally {
        setLoading(false);
      }
    };

    setupAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, supabaseSession) => {
      try {
        console.log('Auth state changed:', event, supabaseSession?.user?.id);
        startLoading('Updating authentication state...');
        setIsTransitioning(true);

        // Transform Supabase session to our AuthSession type
        const authSession: AuthSession | null = supabaseSession ? {
          user: {
            id: supabaseSession.user.id,
            email: supabaseSession.user.email,
            role: supabaseSession.user.user_metadata?.role,
            username: supabaseSession.user.user_metadata?.username,
            displayName: supabaseSession.user.user_metadata?.display_name,
            user_metadata: supabaseSession.user.user_metadata
          },
          expires_at: supabaseSession.expires_at
        } : null;

        await handleAuthChange(authSession);
        stopLoading();
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
      stopLoading();
    };
  }, [handleAuthChange, startLoading, stopLoading, setLoadingError, setSession, setUser, setLoading, setError, setIsTransitioning]);

  return (
    <AuthErrorBoundary>
      <LoadingOverlay 
        isVisible={loadingState} 
        message={message}
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