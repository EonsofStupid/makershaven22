import type { Session, User, UserMetadata, UserAppMetadata, Factor } from '@supabase/supabase-js';

export type UserRole = 'guest' | 'subscriber' | 'maker' | 'admin' | 'super_admin';

export interface AuthUser extends User {
  email: string;
  username: string;
  displayName: string;
  role: UserRole;
  user_metadata: UserMetadata;
  app_metadata: UserAppMetadata;
}

export interface AuthSession extends Session {
  user: AuthUser;
  expires_at: number;
}

export interface AuthState {
  user: AuthUser | null;
  session: AuthSession | null;
  isLoading: boolean;
  error: Error | null;
  isTransitioning: boolean;
}

export interface AuthUIState {
  isLoading: boolean;
  error: Error | null;
  user: AuthUser | null;
  showPassword: boolean;
  rememberMe: boolean;
  validationErrors: Record<string, string>;
}

export interface AuthErrorRecoveryState {
  error: Error;
  attemptCount: number;
  lastAttempt: Date;
  nextAttemptDelay: number;
}

export interface SessionConfig {
  access_token: string;
  refresh_token?: string;
  expires_at: number;
  sessionTimeout?: number;
}

export interface AuthError extends Error {
  code: string;
  message: string;
  status?: number;
}