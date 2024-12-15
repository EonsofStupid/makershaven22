export interface AuthError extends Error {
  code?: string;
  statusCode?: number;
  details?: string;
}

export interface ErrorState {
  message: string;
  code?: string;
  details?: Record<string, any>;
}

export interface AuthErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export interface AuthErrorBoundaryState {
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

export interface AuthErrorRecoveryState {
  retryCount: number;
  lastError: Error | null;
  isRecovering: boolean;
}