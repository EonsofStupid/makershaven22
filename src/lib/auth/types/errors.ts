export interface AuthError extends Error {
  code?: string;
  statusCode?: number;
  details?: unknown;
}

export interface AuthErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error: AuthError; reset: () => void }>;
}

export interface AuthErrorBoundaryState {
  hasError: boolean;
  error: AuthError | null;
}

export type AuthErrorHandler = (error: AuthError) => void;

export interface AuthErrorRecoveryOptions {
  retry?: boolean;
  redirect?: string;
  resetAuth?: boolean;
}

export type AuthErrorType = 
  | 'auth/invalid-email'
  | 'auth/user-disabled'
  | 'auth/user-not-found'
  | 'auth/wrong-password'
  | 'auth/email-already-in-use'
  | 'auth/operation-not-allowed'
  | 'auth/weak-password'
  | 'auth/invalid-action-code'
  | 'auth/expired-action-code'
  | 'auth/invalid-verification-code'
  | 'auth/invalid-verification-id'
  | 'auth/missing-verification-code'
  | 'auth/missing-verification-id'
  | 'auth/credential-already-in-use'
  | 'auth/invalid-credential'
  | 'auth/invalid-verification'
  | 'auth/invalid-session'
  | 'auth/session-expired'
  | 'auth/network-request-failed'
  | 'auth/too-many-requests'
  | 'auth/unauthorized'
  | 'auth/internal-error';

export interface AuthErrorLog {
  id: string;
  userId?: string;
  errorType: AuthErrorType;
  errorMessage?: string;
  stackTrace?: string;
  metadata?: Record<string, unknown>;
  resolved: boolean;
  createdAt: Date;
  resolvedAt?: Date;
  resolutionMetadata?: Record<string, unknown>;
}

export interface AuthErrorRecoveryState {
  attemptCount: number;
  lastAttempt?: Date;
  nextAttemptDelay?: number;
  recoveryStrategy?: 'retry' | 'redirect' | 'reset';
}

export interface AuthErrorContext {
  error: AuthError | null;
  recovery: AuthErrorRecoveryState;
  handleError: AuthErrorHandler;
  resetError: () => void;
  retryOperation: () => Promise<void>;
}