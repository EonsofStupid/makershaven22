import { Session, User } from "@supabase/supabase-js";

export interface AuthState {
  session: Session | null;
  user: User | null;
  isLoading: boolean;
  hasAccess: boolean;
  error: Error | null;
  isTransitioning?: boolean;
  signOut: () => Promise<void>;
  setSession: (session: Session | null) => void;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: Error | null) => void;
}

export interface AuthError {
  type: string;
  code?: string;
  stack?: string;
  message: string;
}

export interface AuthSession {
  session: Session;
  user: User;
  expires_at?: number;
  access_token?: string;
  refresh_token?: string;
}

export interface AuthErrorRecoveryState {
  error: AuthError | null;
  isRecovering: boolean;
  recoveryAttempts: number;
}