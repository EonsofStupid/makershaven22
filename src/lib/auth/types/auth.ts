export type UserRole = 'guest' | 'subscriber' | 'maker' | 'admin' | 'super_admin';

export interface AuthUser {
  id: string;
  email?: string | null;
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
  expires_in?: number;
}

export interface AuthState {
  isLoading: boolean;
  hasAccess: boolean;
  error: Error | null;
  isTransitioning?: boolean;
  reset?: () => void;
}

export interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth: boolean;
  requiredRole?: UserRole | UserRole[];
  fallbackPath: string;
  loadingComponent?: React.ReactNode;
  unauthorizedComponent?: React.ReactNode;
  onError?: (error: Error) => void;
}

export type SecurityEventSeverity = 'low' | 'medium' | 'high';
export type SecurityEventCategory = 'auth' | 'access' | 'data' | 'system';

export interface SecurityLog {
  id: string;
  user_id: string;
  event_type: string;
  severity: SecurityEventSeverity;
  details: any;
  metadata: any;
  ip_address?: string;
  created_at: string;
  profiles?: {
    username: string;
    display_name: string;
  };
}

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