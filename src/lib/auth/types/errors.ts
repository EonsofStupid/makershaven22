export interface AuthError extends Error {
  code: string;
  details?: string;
}

export interface AuthErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export interface AuthErrorBoundaryState {
  error: Error | null;
}

export interface AuthErrorRecoveryState {
  retryCount: number;
  lastError: AuthError | null;
}

export interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}