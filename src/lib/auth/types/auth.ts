export type UserRole = 'subscriber' | 'maker' | 'admin' | 'super_admin' | 'guest';

export interface AuthUser {
  id: string;
  email?: string;
  role?: UserRole;
  username?: string;
  displayName?: string;
  user_metadata?: {
    avatar_url?: string;
    [key: string]: any;
  };
}

export interface AuthSession {
  user: AuthUser;
  expires_at?: number;
}

export interface AuthState {
  isLoading: boolean;
  hasAccess: boolean;
  error: Error | null;
  isTransitioning: boolean;
  reset: () => void;
}

export interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  fallbackPath?: string;
  loadingComponent?: React.ReactNode;
  unauthorizedComponent?: React.ReactNode;
}

export type SecurityEventSeverity = 'info' | 'warning' | 'error' | 'critical';
export type SecurityEventCategory = 'auth' | 'content' | 'system' | 'user';

export interface SessionConfig {
  refreshInterval: number;
  sessionTimeout: number;
  storageKey: string;
  onSessionExpired?: () => void;
  onRefreshError?: (error: Error) => void;
}

export interface SessionState {
  isAuthenticated: boolean;
  lastActivity: Date;
  token?: string;
}