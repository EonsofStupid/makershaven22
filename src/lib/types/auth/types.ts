import { Session } from '@supabase/supabase-js';
import { Json } from '../core/json';

export type UserRole = 'subscriber' | 'maker' | 'admin' | 'super_admin';

export interface AuthState {
  session: Session | null;
  user: AuthUser | null;
  isLoading: boolean;
  error: Error | null;
  isOffline: boolean;
  isTransitioning: boolean;
  setSession: (session: Session | null) => void;
  setUser: (user: AuthUser | null) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: Error | null) => void;
  setOffline: (isOffline: boolean) => void;
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