import { Session, User } from "@supabase/supabase-js";

export interface AuthState {
  session: Session | null;
  user: User | null;
  loading: boolean;
  error: Error | null;
  setSession: (session: Session | null) => void;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: Error | null) => void;
  signOut: () => Promise<void>;
}

export interface AuthError extends Error {
  type: string;
  code: string;
  stack?: string;
}

export interface AuthSession {
  session: Session;
  user: User;
}

export interface AuthErrorRecoveryState {
  error: AuthError | null;
  retryCount: number;
  lastAttempt: Date | null;
}