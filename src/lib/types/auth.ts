import type { User, UserMetadata, UserAppMetadata, Factor } from '@supabase/supabase-js';

export type UserRole = 'subscriber' | 'maker' | 'admin' | 'super_admin';

export interface AuthUser extends User {
  email: string;
  username: string;
  displayName: string;
  role: UserRole;
  user_metadata: UserMetadata;
  app_metadata: UserAppMetadata;
  factors?: Factor[];
}

export interface AuthSession {
  user: AuthUser;
  access_token: string;
  refresh_token?: string;
  expires_in: number;
}

export interface AuthState {
  user: AuthUser | null;
  session: AuthSession | null;
  isLoading: boolean;
  error: Error | null;
  isTransitioning: boolean;
  hasAccess?: boolean;
}

export interface AuthUIState {
  isLoading: boolean;
  error: Error | null;
  user: AuthUser | null;
  showPassword: boolean;
  rememberMe: boolean;
  validationErrors: Record<string, string>;
  isAuthenticating?: boolean;
}

export interface SessionConfig {
  timeout: number;
  refreshInterval: number;
  persistKey: string;
  onSessionExpired?: () => void;
  onRefreshError?: (error: Error) => void;
}

export interface AuthError extends Error {
  code: string;
  message: string;
  status?: number;
}

export interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requiredRole?: UserRole | UserRole[];
  fallbackPath?: string;
  loadingComponent?: React.ReactNode;
  unauthorizedComponent?: React.ReactNode;
  onError?: (error: Error) => void;
}

export interface AuthErrorRecoveryState {
  error: Error;
  attemptCount: number;
  lastAttempt: Date;
  nextAttemptDelay: number;
}

export interface AuthErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{
    error: AuthError;
    reset: () => void;
  }>;
}

export interface AuthErrorBoundaryState {
  hasError: boolean;
  error: AuthError | null;
}