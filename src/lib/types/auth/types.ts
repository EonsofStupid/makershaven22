import { Session } from "@supabase/supabase-js";

export type UserRole = 'subscriber' | 'maker' | 'admin' | 'super_admin';

export interface AuthUser {
  id: string;
  email?: string | null;
  role?: UserRole;
  username?: string;
  displayName?: string;
  user_metadata?: Record<string, any>;
}

export interface AuthState {
  session: Session | null;
  user: AuthUser | null;
  isLoading: boolean;
  error: Error | null;
  setSession: (session: Session | null) => void;
  setUser: (user: AuthUser | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: Error | null) => void;
  signOut: () => Promise<void>;
}

export interface AuthError extends Error {
  type: string;
  code?: string;
  stack?: string;
}

export interface AuthErrorRecoveryState {
  attemptCount: number;
  lastAttempt?: Date;
  nextAttemptDelay: number;
}