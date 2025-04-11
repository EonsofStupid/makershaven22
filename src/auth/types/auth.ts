
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

export type SessionEventType = 'mousedown' | 'keydown' | 'touchstart' | 'scroll';

export interface AuthState {
  isLoading: boolean;
  hasAccess: boolean;
  error: Error | { message: string } | null;
  isTransitioning?: boolean;
}

export interface AuthUser {
  id: string;
  email?: string | null;
  role?: string;
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

export type SecurityEventSeverity = 'low' | 'medium' | 'high';
export type SecurityEventCategory = 'auth' | 'data_access' | 'admin' | 'system';
