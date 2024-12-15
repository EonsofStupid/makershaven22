import type { Json } from '@/integrations/supabase/types/base';

export type UserRole = 'subscriber' | 'maker' | 'admin' | 'super_admin';

export interface AuthUser {
  id: string;
  email: string;
  role: UserRole;
  username?: string;
  displayName?: string;
  user_metadata?: Record<string, any>;
  app_metadata?: Record<string, any>;
  created_at?: string;
  updated_at?: string;
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
  showPassword: boolean;
  rememberMe: boolean;
  validationErrors: Record<string, string>;
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

export interface SecurityLog {
  id: string;
  user_id: string;
  event_type: string;
  severity: string;
  details: Json;
  metadata: Json;
  ip_address?: string;
  user_agent?: string;
  created_at: string;
  profiles?: {
    username: string;
    display_name: string;
  };
}