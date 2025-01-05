import type { Session } from '@supabase/supabase-js';

export type UserRole = 'subscriber' | 'maker' | 'admin' | 'super_admin';

export interface AuthUser {
  id: string;
  email?: string | null;
  role?: UserRole;
  username?: string;
  displayName?: string;
}

export interface AuthSession {
  user: AuthUser;
  session: Session;
  expires_at?: number;
}

export interface AuthState {
  session: AuthSession | null;
  user: AuthUser | null;
  isLoading: boolean;
  error: AuthError | null;
  isOffline: boolean;
  isTransitioning: boolean;
  setSession: (session: AuthSession | null) => void;
  setUser: (user: AuthUser | null) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: AuthError | null) => void;
  setOffline: (isOffline: boolean) => void;
  signOut: () => Promise<void>;
}

export interface AuthError {
  type: string;
  code?: string;
  message: string;
  stack?: string;
}

export interface AuthErrorRecoveryState {
  isRecovering: boolean;
  recoveryAttempts: number;
  lastRecoveryAttempt: Date | null;
}