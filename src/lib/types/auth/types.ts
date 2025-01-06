export type UserRole = 'subscriber' | 'maker' | 'admin' | 'super_admin' | 'moderator';

export interface AuthState {
  session: AuthSession | null;
  user: AuthUser | null;
  isLoading: boolean;
  error: Error | null;
  setSession: (session: AuthSession | null) => void;
  setUser: (user: AuthUser | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: Error | null) => void;
  signOut: () => Promise<void>;
}

export interface AuthSession {
  access_token: string;
  refresh_token: string;
  expires_at?: number;
  user: AuthUser;
}

export interface AuthUser {
  id: string;
  email: string;
  role: UserRole;
  metadata?: Record<string, any>;
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