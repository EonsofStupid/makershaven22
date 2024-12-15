import { UserRole } from '../base';

export interface AuthError extends Error {
  code: string;
  details?: string;
}

export interface AuthGuardProps {
  children: React.ReactNode;
  requiredRole?: UserRole;
  fallback?: React.ReactNode;
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

export interface PinVerificationResponse {
  success: boolean;
  error?: string;
  lockout_until?: string;
}

export interface PinSetupResponse {
  success: boolean;
  error?: string;
}