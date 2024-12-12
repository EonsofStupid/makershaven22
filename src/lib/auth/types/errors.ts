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