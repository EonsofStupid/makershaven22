import { Session } from '@supabase/supabase-js';
import { Json } from '../core/json';

export interface AuthState {
  session: Session | null;
  user: AuthUser | null;
  isLoading: boolean;
  hasAccess: boolean;
  error: Error | { message: string } | null;
  isTransitioning?: boolean;
  setSession: (session: Session | null) => void;
  setUser: (user: AuthUser | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: Error | null) => void;
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
    [key: string]: Json | undefined;
  };
}

export interface AuthError {
  type: string;
  message: string;
  code?: string;
  stack?: string;
}

export type SecurityEventSeverity = 'low' | 'medium' | 'high' | 'critical';
export type SecurityEventCategory = 'auth' | 'access' | 'data' | 'system';

export interface AuthErrorRecoveryState {
  error: AuthError | null;
  retryCount: number;
  maxRetries: number;
}