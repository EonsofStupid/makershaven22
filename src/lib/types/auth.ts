import type { User } from '@supabase/supabase-js';

export type UserRole = 'subscriber' | 'maker' | 'admin' | 'super_admin';

export interface AuthUser {
  id: string;
  email: string;
  role?: UserRole;
  username?: string;
  displayName?: string;
  user_metadata?: Record<string, any>;
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
  hasAccess: boolean;
}

export interface AuthStore extends AuthState {
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  setUser: (user: AuthUser | null) => void;
  setSession: (session: AuthSession | null) => void;
  setError: (error: Error | null) => void;
  setTransitioning: (isTransitioning: boolean) => void;
  reset: () => void;
}

export interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requiredRole?: UserRole | UserRole[];
  fallbackPath?: string;
}

export interface AuthErrorCode {
  code: string;
  message: string;
  details?: Record<string, any>;
}

export interface AuthError extends Error {
  code?: string;
  statusCode?: number;
  details?: string;
}

export interface AuthErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

export interface AuthErrorBoundaryState {
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

export interface AuthErrorRecoveryState {
  retryCount: number;
  lastError: Error | null;
}

export const mapSupabaseUser = (user: User): AuthUser => ({
  id: user.id,
  email: user.email!,
  role: (user.user_metadata?.role || 'subscriber') as UserRole,
  username: user.user_metadata?.username,
  displayName: user.user_metadata?.display_name,
  user_metadata: user.user_metadata
});