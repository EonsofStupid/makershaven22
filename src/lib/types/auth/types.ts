export type UserRole = 'subscriber' | 'maker' | 'admin' | 'super_admin' | 'moderator';

export interface AuthUser {
  id: string;
  email?: string;
  role?: UserRole;
  metadata?: Record<string, any>;
}

export interface AuthSession {
  access_token: string;
  expires_at?: number;
  expires_in?: number;
  refresh_token?: string;
}

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
  reset: () => void;
}

export interface AuthError {
  type: string;
  code?: string;
  stack?: string;
  message: string;
}

export interface AuthErrorRecoveryState {
  error: AuthError | null;
  isRecovering: boolean;
  recoveryStep: string | null;
}

export type SecurityEventSeverity = 'low' | 'medium' | 'high' | 'critical';
export type SecurityEventCategory = 'auth' | 'data_access' | 'admin' | 'system';