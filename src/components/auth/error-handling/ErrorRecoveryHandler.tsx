
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { AuthError } from '@/lib/auth/types/errors';

interface ErrorRecoveryHandlerProps {
  error: AuthError;
  resetError: () => void;
}

interface AuthErrorRecoveryState {
  attemptCount: number;
  lastAttempt?: Date;
  nextAttemptDelay: number;
}

const initialRecoveryState: AuthErrorRecoveryState = {
  attemptCount: 0,
  lastAttempt: undefined,
  nextAttemptDelay: 2000 // 2 seconds initial delay
};

export const ErrorRecoveryHandler: React.FC<ErrorRecoveryHandlerProps> = ({ 
  error, 
  resetError 
}) => {
  const [recoveryState, setRecoveryState] = useState<AuthErrorRecoveryState>(initialRecoveryState);
  const [countdown, setCountdown] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    // Handle countdown timer if there's a delay before next attempt
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleRetry = async () => {
    setIsLoading(true);
    
    // Update recovery state
    const newRecoveryState = {
      attemptCount: recoveryState.attemptCount + 1,
      lastAttempt: new Date(),
      nextAttemptDelay: Math.min(recoveryState.nextAttemptDelay * 2, 30000) // Exponential backoff, max 30s
    };
    
    setRecoveryState(newRecoveryState);
    
    // Simulating network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // If too many attempts, enforce a countdown
    if (newRecoveryState.attemptCount > 3) {
      const waitSeconds = Math.floor(newRecoveryState.nextAttemptDelay / 1000);
      setCountdown(waitSeconds);
      setIsLoading(false);
      return;
    }
    
    setIsLoading(false);
    resetError();
  };

  // Determine if we should show specific guidance based on error type
  const getErrorGuidance = () => {
    switch (error.type) {
      case 'authentication':
        return "Please check your credentials and try again.";
      case 'authorization':
        return "You don't have permission to access this resource.";
      case 'network':
        return "Please check your internet connection and try again.";
      case 'server':
        return "There was a problem with our servers. Please try again later.";
      default:
        return "An unexpected error occurred. Please try again.";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-lg bg-destructive/5 p-6 border border-destructive/20 flex flex-col items-center justify-center space-y-4 text-center max-w-md mx-auto my-8"
    >
      <AlertCircle className="h-12 w-12 text-destructive" />
      
      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-destructive">Authentication Error</h2>
        <p className="text-sm text-muted-foreground">{error.message}</p>
        <p className="text-xs text-muted-foreground">{getErrorGuidance()}</p>
      </div>
      
      {countdown > 0 ? (
        <div className="text-sm text-muted-foreground">
          <p>Too many retry attempts. Please wait {countdown} seconds before trying again.</p>
        </div>
      ) : (
        <Button 
          onClick={handleRetry} 
          disabled={isLoading || countdown > 0}
          className="w-full"
          variant="outline"
        >
          {isLoading ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Retrying...
            </>
          ) : (
            'Try Again'
          )}
        </Button>
      )}
      
      <p className="text-xs text-muted-foreground">
        If this issue persists, please contact support.
      </p>
    </motion.div>
  );
};
