export interface AuthError extends Error {
  code: string;
  message: string;
  stack?: string;
}

export interface AuthErrorBoundaryState {
  hasError: boolean;
  error: AuthError | null;
}

export interface AuthErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{
    error: AuthError;
    reset: () => void;
  }>;
}

export interface AuthErrorRecoveryState {
  attemptCount: number;
  lastAttempt: Date | null;
  nextAttemptDelay: number;
  error: AuthError | null;
}