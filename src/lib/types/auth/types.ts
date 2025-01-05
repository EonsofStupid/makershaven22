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

export interface AuthState {
  session: AuthSession | null;
  user: AuthUser | null;
  isLoading: boolean;
  hasAccess: boolean;
  error: Error | null;
  isTransitioning?: boolean;
  setSession: (session: AuthSession | null) => void;
  setUser: (user: AuthUser | null) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: Error | null) => void;
  signOut: () => Promise<void>;
}

export interface AuthError extends Error {
  type: string;
  code?: string;
  stack?: string;
}

export interface AuthErrorRecoveryState {
  error: AuthError | null;
  isRecovering: boolean;
  recoveryAttempts: number;
}