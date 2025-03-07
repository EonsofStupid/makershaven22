
export interface AuthError {
  type: string;
  code?: string;
  message: string;
  stack?: string;
}

export interface AuthErrorRecoveryState {
  isRecovering: boolean;
  error: AuthError | null;
  attemptCount: number;
  maxAttempts: number;
  recoveryStrategy?: string;
  nextRetryTime?: Date;
}

export type ErrorRecoveryStrategy = 'retry' | 'refresh-token' | 'logout' | 'clear-storage' | 'none';

export interface ErrorRecoveryOptions {
  maxAttempts?: number;
  retryDelay?: number;
  errorTypes?: Record<string, ErrorRecoveryStrategy>;
}
