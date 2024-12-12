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

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { handleAuthChange, initialSetupDone } = useAuthSetup();
  const { isLoading, message, startLoading, stopLoading, setError } = useLoadingState({
    timeout: 30000,
    onTimeout: () => {
      console.error('Auth initialization timed out');
      toast.error('Authentication initialization timed out', {
        description: 'Please refresh the page and try again'
      });
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
        setError(error instanceof Error ? error : new Error('Failed to initialize security'));
      }
    };

    initSecurity();

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
      try {
        console.log('Starting auth setup');
        startLoading('Setting up authentication...');
        
        try {
          sessionManager.startSession();
          securityManager.initialize();
          console.log('Security systems initialized');
        } catch (securityError) {
          console.error('Error initializing security systems:', securityError);
          throw securityError;
        }

        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          if (sessionError.message.includes('refresh_token_not_found')) {
            console.log('Refresh token not found, signing out');
            await supabase.auth.signOut();
            stopLoading();
            return;
          }
          throw sessionError;
        }

        console.log('Initial session check:', session?.user?.id || 'No session');
        await handleAuthChange(session);
        stopLoading('success');

      } catch (error) {
        console.error("Auth setup error:", error);
        if (retryCount < maxRetries) {
          retryCount++;
          console.log(`Retrying auth setup (${retryCount}/${maxRetries})...`);
          setTimeout(setupAuth, retryDelay * retryCount);
        } else {
          setError(error instanceof Error ? error : new Error('Failed to initialize authentication'));
        }
      }
    };

    setupAuth();

    console.log('Setting up auth state change subscription');
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      try {
        console.log('Auth state changed:', _event, session?.user?.id);
        startLoading('Updating authentication state...');
        await handleAuthChange(session);
        stopLoading('success');
      } catch (error) {
        console.error('Auth state change error:', error);
        setError(error instanceof Error ? error : new Error('Authentication error occurred'));
        toast.error('Authentication error', {
          description: 'There was a problem with your session. Please try signing in again.',
        });
      }
    });
    
    return () => {
      console.log('Cleaning up AuthProvider');
      subscription.unsubscribe();
      sessionManager.destroy();
      securityManager.cleanup();
      stopLoading();
    };
  }, [handleAuthChange, startLoading, stopLoading, setError]);

  return (
    <AuthErrorBoundary>
      <LoadingOverlay 
        isVisible={isLoading} 
        message={message}
        timeout={30000}
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