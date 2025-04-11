
import { useState } from 'react';
import { AuthError } from '@/lib/auth/types/errors';

interface AuthErrorRecoveryState {
  attemptCount: number;
  lastAttempt?: Date;
  nextAttemptDelay: number;
}

export const useErrorRecovery = () => {
  const [recoveryState, setRecoveryState] = useState<AuthErrorRecoveryState>({
    attemptCount: 0,
    lastAttempt: undefined,
    nextAttemptDelay: 2000 // 2 seconds initial delay
  });

  const handleErrorRecovery = (error: AuthError) => {
    // Update recovery state with exponential backoff
    const newRecoveryState = {
      attemptCount: recoveryState.attemptCount + 1,
      lastAttempt: new Date(),
      nextAttemptDelay: Math.min(recoveryState.attemptCount === 0 ? 2000 : recoveryState.nextAttemptDelay * 2, 30000)
    };
    
    setRecoveryState(newRecoveryState);
    
    // Log detailed error info for debugging
    console.error('Auth Error:', {
      type: error.type,
      code: error.code || 'NO_CODE',
      message: error.message,
      stack: error.stack || 'NO_STACK',
      recoveryState: newRecoveryState
    });
    
    return newRecoveryState;
  };

  const resetRecoveryState = () => {
    setRecoveryState({
      attemptCount: 0,
      lastAttempt: undefined,
      nextAttemptDelay: 2000
    });
  };

  const shouldDelayNextAttempt = () => {
    if (!recoveryState.lastAttempt) return false;
    
    const now = new Date();
    const timeSinceLastAttempt = now.getTime() - recoveryState.lastAttempt.getTime();
    
    return timeSinceLastAttempt < recoveryState.nextAttemptDelay;
  };

  const getTimeUntilNextAttempt = () => {
    if (!recoveryState.lastAttempt) return 0;
    
    const now = new Date();
    const timeSinceLastAttempt = now.getTime() - recoveryState.lastAttempt.getTime();
    const remaining = recoveryState.nextAttemptDelay - timeSinceLastAttempt;
    
    return Math.max(0, Math.ceil(remaining / 1000));
  };

  return {
    recoveryState,
    handleErrorRecovery,
    resetRecoveryState,
    shouldDelayNextAttempt,
    getTimeUntilNextAttempt
  };
};
