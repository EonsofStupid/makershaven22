import { Json } from '../core/json';

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
  error: AuthError | null;
  setSession: (session: AuthSession | null) => void;
  setUser: (user: AuthUser | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: AuthError | null) => void;
  signOut: () => Promise<void>;
}

export interface AuthError {
  type: string;
  message: string;
  code?: string;
  stack?: string;
}

export type UserRole = 'subscriber' | 'maker' | 'admin' | 'super_admin' | 'moderator';