import { Json } from "../core/json";

export interface AuthState {
  session: AuthSession | null;
  user: AuthUser | null;
  isLoading: boolean;
  error: AuthError | null;
  setSession: (session: AuthSession | null) => void;
  setUser: (user: AuthUser | null) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: AuthError | null) => void;
  signOut: () => Promise<void>;
}

export interface AuthUser {
  id: string;
  email?: string | null;
  role?: string;
  username?: string;
  displayName?: string;
  user_metadata?: {
    avatar_url?: string;
    [key: string]: Json;
  };
}

export interface AuthSession {
  user: AuthUser;
  expires_at?: number;
  access_token?: string;
  refresh_token?: string;
}

export interface AuthError {
  type: string;
  code?: string;
  stack?: string;
  message: string;
}

export interface AuthErrorRecoveryState {
  error: AuthError | null;
  retryCount: number;
  maxRetries: number;
}

export type SecurityEventSeverity = 'low' | 'medium' | 'high' | 'critical';
export type SecurityEventCategory = 'auth' | 'access' | 'data' | 'system';