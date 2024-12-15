import type { UserRole } from '@/integrations/supabase/types/enums';

export interface AuthUser {
  id: string;
  email: string;
  role: UserRole;
  username: string;
  displayName: string;
  user_metadata: Record<string, any>;
  app_metadata: Record<string, any>;
  metadata?: Record<string, any>;
}

export interface AuthSession {
  user: AuthUser;
  access_token: string;
  refresh_token?: string;
  expires_at: number;
}

export interface AuthState {
  user: AuthUser | null;
  session: AuthSession | null;
  isLoading: boolean;
  error: Error | null;
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
  timeout: number;
  refreshInterval: number;
  persistKey: string;
  maxAttempts: number;
  lockoutDuration: number;
}

export interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requiredRole?: UserRole[];
  fallbackPath?: string;
}