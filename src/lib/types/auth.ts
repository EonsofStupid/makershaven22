import type { UserRole } from '@/integrations/supabase/types';

export interface AuthUser {
  id: string;
  email: string;
  role: UserRole;
  username?: string;
  displayName?: string;
  user_metadata?: Record<string, any>;
  app_metadata?: Record<string, any>;
}

export interface AuthSession {
  user: AuthUser;
  expires_at: number;
  access_token: string;
  refresh_token?: string;
}

export interface AuthState {
  isLoading: boolean;
  hasAccess: boolean;
  error: Error | null;
}

export interface AuthErrorRecoveryState {
  attemptCount: number;
  lastAttempt: Date;
  nextAttemptDelay: number;
  error: Error;
}

export interface AuthUIState {
  isLoading: boolean;
  error: Error | null;
  user: AuthUser | null;
  isAuthenticating: boolean;
}

export interface SessionConfig {
  sessionTimeout: number;
  maxAttempts: number;
  lockoutDuration: number;
}

export interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requiredRole?: UserRole[];
  fallbackPath?: string;
}