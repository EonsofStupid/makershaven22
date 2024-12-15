import type { User, UserMetadata, Session } from '@supabase/supabase-js';

export type UserRole = 'subscriber' | 'maker' | 'admin' | 'super_admin';

export interface AuthUser extends User {
  role: UserRole;
  email: string;
  username: string;
  displayName: string;
}

export interface AuthSession extends Session {
  expires_at: number;
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
  expires_at: number;
  refresh_token?: string;
}