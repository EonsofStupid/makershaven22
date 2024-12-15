export type UserRole = 'subscriber' | 'maker' | 'admin' | 'super_admin';

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
  isAuthenticating: boolean;
  showPassword: boolean;
  rememberMe: boolean;
  validationErrors: Record<string, string>;
}

export interface AuthErrorRecoveryState {
  attemptCount: number;
  lastAttempt: Date;
  nextAttemptDelay: number;
  error: Error | null;
}

export interface SessionConfig {
  timeout: number;
  refreshInterval: number;
  persistKey: string;
  onSessionExpired?: () => void;
  onRefreshError?: (error: Error) => void;
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