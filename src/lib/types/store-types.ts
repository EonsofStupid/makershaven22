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
  user_metadata?: Record<string, any>;
}

export interface AuthSession extends Session {
  user: AuthUser;
  token_type: string;
}

export interface AuthState {
  session: AuthSession | null;
  user: AuthUser | null;
  isLoading: boolean;
  isTransitioning: boolean;
  error: StoreError | null;
  isOffline: boolean;
  initialSetupDone: boolean;
  
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

export interface SyncState {
  lastSynced: Date | null;
  isSyncing: boolean;
  syncError: StoreError | null;
  pendingChanges: number;
}

export interface AuditInfo {
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy: string;
}

export interface Result<T> {
  data?: T;
  error?: StoreError;
  validation?: ValidationError[];
}