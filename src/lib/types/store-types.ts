import type { Session, User } from '@supabase/supabase-js';

export type UserRole = 'subscriber' | 'maker' | 'admin' | 'super_admin';
export type Status = 'idle' | 'loading' | 'error' | 'success';

export interface ValidationError {
  field: string;
  message: string;
}

export interface StoreError {
  code: string;
  message: string;
  details?: unknown;
}

export interface AuthUser extends User {
  role?: UserRole;
  display_name?: string;
  avatar_url?: string;
}

export interface AuthSession extends Session {
  user: AuthUser;
}

export interface AuthState {
  session: AuthSession | null;
  user: AuthUser | null;
  isLoading: boolean;
  isTransitioning: boolean;
  error: StoreError | null;
  isOffline: boolean;
  
  // Actions
  initialize: () => Promise<void>;
  handleSessionUpdate: (session: AuthSession | null) => Promise<void>;
  setSession: (session: AuthSession | null) => void;
  setUser: (user: AuthUser | null) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: StoreError | null) => void;
  setOffline: (isOffline: boolean) => void;
  signOut: () => Promise<void>;
  reset: () => void;
}