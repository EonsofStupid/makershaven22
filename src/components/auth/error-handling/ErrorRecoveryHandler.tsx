import React, { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { toast } from 'sonner';
import { AuthError, AuthErrorRecoveryState } from '@/lib/auth/types/errors';
import { supabase } from '@/integrations/supabase/client';

interface ErrorRecoveryHandlerProps {
  error: AuthError;
  onRetry?: () => Promise<void>;
  onReset?: () => void;
  maxAttempts?: number;
  initialDelay?: number;
}

export const ErrorRecoveryHandler: React.FC<ErrorRecoveryHandlerProps> = ({
  error,
  onRetry,
  onReset,
  maxAttempts = 3,
  initialDelay = 1000,
}) => {
  const [recoveryState, setRecoveryState] = useState<AuthErrorRecoveryState>({
    attemptCount: 0,
    lastAttempt: new Date(),
    nextAttemptDelay: initialDelay,
  });

  const logError = useCallback(async () => {
    try {
      const { error: logError } = await supabase
        .from('auth_error_logs')
        .insert({
          error_type: error.code || 'auth/internal-error',
          error_message: error.message,
          stack_trace: error.stack,
          metadata: {
            recoveryAttempts: recoveryState.attemptCount,
            lastAttempt: recoveryState.lastAttempt?.toISOString(),
          },
        });

      if (logError) {
        console.error('Failed to log error:', logError);
      }
    } catch (e) {
      console.error('Error logging failed:', e);
    }
  }, [error, recoveryState]);

  useEffect(() => {
    logError();
  }, [logError]);

  const handleRetry = async () => {
    if (!onRetry || recoveryState.attemptCount >= maxAttempts) {
      toast.error('Maximum retry attempts reached', {
        description: 'Please try resetting or contact support'
      });
      return;
    }

    setRecoveryState(prev => ({
      ...prev,
      attemptCount: prev.attemptCount + 1,
      lastAttempt: new Date(),
      nextAttemptDelay: prev.nextAttemptDelay ? prev.nextAttemptDelay * 2 : initialDelay,
    }));

    try {
      await onRetry();
    } catch (retryError) {
      toast.error('Retry failed', {
        description: 'Please try again later'
      });
    }
  };

  const handleReset = () => {
    setRecoveryState({
      attemptCount: 0,
      lastAttempt: new Date(),
      nextAttemptDelay: initialDelay,
    });
    onReset?.();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-md mx-auto p-4"
    >
      <Alert variant="destructive" className="bg-destructive/5 border-destructive/20">
        <AlertTriangle className="h-5 w-5" />
        <AlertTitle>Authentication Error</AlertTitle>
        <AlertDescription className="mt-2">
          <div className="text-sm text-destructive/90 mb-4">
            {error.message}
            {recoveryState.attemptCount > 0 && (
              <div className="text-xs mt-1">
                Attempt {recoveryState.attemptCount} of {maxAttempts}
              </div>
            )}
          </div>
          <div className="flex gap-2">
            {recoveryState.attemptCount < maxAttempts && onRetry && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleRetry}
                className="bg-background/50 hover:bg-background/80"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Retry
              </Button>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={handleReset}
              className="bg-background/50 hover:bg-background/80"
            >
              Reset
            </Button>
          </div>
        </AlertDescription>
      </Alert>
    </motion.div>
  );
};