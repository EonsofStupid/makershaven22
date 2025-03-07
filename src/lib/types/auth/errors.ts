
export interface AuthErrorRecoveryState {
  attemptCount: number;
  lastAttempt?: Date;
  nextAttemptDelay: number;
}

export interface AuthErrorHandlingOptions {
  maxRetries?: number;
  resetAfterMinutes?: number;
  retryDelayMs?: number;
}

export type AuthErrorCode = 
  | 'auth/invalid-email'
  | 'auth/user-disabled'
  | 'auth/user-not-found'
  | 'auth/wrong-password'
  | 'auth/email-already-in-use'
  | 'auth/operation-not-allowed'
  | 'auth/weak-password'
  | 'auth/too-many-requests'
  | 'auth/network-request-failed'
  | 'auth/internal-error'
  | 'auth/requires-recent-login'
  | 'auth/session-expired'
  | 'auth/invalid-credential'
  | 'auth/invalid-verification-code';
