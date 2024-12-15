import { BaseEntity } from './base';

export type UserRole = 'subscriber' | 'maker' | 'admin' | 'super_admin';

export interface AuthUser extends BaseEntity {
  email: string;
  role: UserRole;
  username?: string;
  displayName?: string;
  metadata?: Record<string, any>;
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
  reset?: () => void;
  hasAccess?: boolean;
}

export interface SessionConfig {
  timeout: number;
  refreshInterval: number;
  persistKey: string;
  sessionTimeout?: number;
  onSessionExpired?: () => void;
  onRefreshError?: (error: Error) => void;
}

export interface AuthErrorRecoveryState {
  error: Error;
  attemptCount: number;
  lastAttempt: Date;
  nextAttemptDelay: number;
}

export interface AuthErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export interface AuthErrorBoundaryState {
  error: Error | null;
}