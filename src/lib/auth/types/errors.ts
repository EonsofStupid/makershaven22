
export type AuthErrorType = 
  | 'authentication' 
  | 'authorization' 
  | 'validation' 
  | 'server' 
  | 'network'
  | 'unknown';

export interface AuthError {
  type: AuthErrorType;
  code?: string;
  message: string;
  stack?: string;
}

export interface AuthErrorRecoveryState {
  attemptCount: number;
  lastAttempt?: Date;
  nextAttemptDelay: number;
}
