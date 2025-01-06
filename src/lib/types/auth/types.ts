export type UserRole = 'subscriber' | 'maker' | 'admin' | 'super_admin' | 'moderator';

export interface AuthState {
  session: AuthSession | null;
  user: AuthUser | null;
  isLoading: boolean;
  error: Error | null;
  isOffline: boolean;
  isTransitioning: boolean;
  setSession: (session: AuthSession | null) => void;
  setUser: (user: AuthUser | null) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: Error | null) => void;
  setOffline: (isOffline: boolean) => void;
  signOut: () => Promise<void>;
}

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
  expires_at?: number;
}

export interface AuthError {
  type: string;
  code: string;
  stack?: string;
  message: string;
}

export interface SecurityEventSeverity {
  type: 'low' | 'medium' | 'high' | 'critical';
}

export interface SecurityEventCategory {
  type: 'auth' | 'data_access' | 'admin' | 'system';
}