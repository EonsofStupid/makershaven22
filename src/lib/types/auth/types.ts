import { Json } from '../core/json';

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

export interface AuthError extends Error {
  type: string;
  code?: string;
  stack?: string;
}

export type UserRole = 'subscriber' | 'maker' | 'admin' | 'super_admin' | 'moderator';

export interface AuthErrorRecoveryState {
  error: AuthError | null;
  isRecovering: boolean;
  recoveryAttempts: number;
}

export type SecurityEventSeverity = 'info' | 'warn' | 'error' | 'critical';
export type SecurityEventCategory = 'auth' | 'access' | 'data' | 'system';