import type { Json } from '@/integrations/supabase/types';

export type UserRole = 'subscriber' | 'maker' | 'admin' | 'super_admin' | 'guest';

export interface AuthUser {
  id: string;
  email: string;
  role: UserRole;
  username: string;
  displayName: string;
  user_metadata: Record<string, any>;
  app_metadata: Record<string, any>;
}

export interface AuthSession {
  access_token: string;
  refresh_token: string;
  expires_at: number;
  user: AuthUser;
}

export interface AuthState {
  user: AuthUser | null;
  session: AuthSession | null;
  isLoading: boolean;
  error: Error | null;
}

export interface AuthErrorRecoveryState {
  error: Error;
  attemptCount: number;
  lastAttempt: Date;
  nextAttemptDelay: number;
}

export interface AuthUIState {
  isLoading: boolean;
  error: Error | null;
  user: AuthUser | null;
  isAuthenticating: boolean;
  showPassword: boolean;
  rememberMe: boolean;
  validationErrors: Record<string, string>;
}

export interface SessionConfig {
  timeout: number;
  maxAttempts: number;
  lockoutDuration: number;
}