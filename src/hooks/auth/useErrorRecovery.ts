import { useState, useCallback } from 'react';
import { AuthError, AuthErrorRecoveryState } from '@/lib/auth/types/errors';
import { supabase } from '@/integrations/supabase/client';

interface ErrorRecoveryConfig {
  maxAttempts?: number;
  initialDelay?: number;
  onMaxAttemptsReached?: () => void;
}

export const useErrorRecovery = (config: ErrorRecoveryConfig = {}) => {
  const {
    maxAttempts = 3,
    initialDelay = 1000,
    onMaxAttemptsReached
  } = config;

  const [recoveryState, setRecoveryState] = useState<AuthErrorRecoveryState>({
    attemptCount: 0,
    lastAttempt: undefined,
    nextAttemptDelay: initialDelay,
  });

  const logError = useCallback(async (error: AuthError) => {
    try {
      const { error: logError } = await supabase
        .from('auth_error_logs')
        .insert({
          errorType: error.code || 'auth/internal-error',
          errorMessage: error.message,
          stackTrace: error.stack,
          metadata: {
            recoveryAttempts: recoveryState.attemptCount,
            lastAttempt: recoveryState.lastAttempt?.toISOString(),
          },
        });

      if (logError) throw logError;
    } catch (e) {
      console.error('Failed to log error:', e);
    }
  }, [recoveryState]);

  const handleError = useCallback(async (error: AuthError) => {
    await logError(error);
    
    if (recoveryState.attemptCount >= maxAttempts) {
      onMaxAttemptsReached?.();
      return false;
    }

    setRecoveryState(prev => ({
      ...prev,
      attemptCount: prev.attemptCount + 1,
      lastAttempt: new Date(),
      nextAttemptDelay: prev.nextAttemptDelay ? prev.nextAttemptDelay * 2 : initialDelay,
    }));

    return true;
  }, [recoveryState, maxAttempts, initialDelay, onMaxAttemptsReached, logError]);

  const resetRecovery = useCallback(() => {
    setRecoveryState({
      attemptCount: 0,
      lastAttempt: undefined,
      nextAttemptDelay: initialDelay,
    });
  }, [initialDelay]);

  return {
    recoveryState,
    handleError,
    resetRecovery,
    canRetry: recoveryState.attemptCount < maxAttempts,
  };
};