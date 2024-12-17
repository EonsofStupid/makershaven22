import type { Session, User } from '@supabase/supabase-js';
import type { Settings } from '@/components/admin/settings/types';

export type UserRole = 'subscriber' | 'maker' | 'admin' | 'super_admin';

export interface AuthUser extends User {
  role?: UserRole;
  username?: string;
  displayName?: string;
  avatarUrl?: string;
}

export interface AuthSession extends Session {
  user: AuthUser | null;
}

export interface AuthState {
  session: AuthSession | null;
  user: AuthUser | null;
  isLoading: boolean;
  error: Error | null;
  isTransitioning: boolean;
  setSession: (session: AuthSession | null) => void;
  setUser: (user: AuthUser | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: Error | null) => void;
  setIsTransitioning: (transitioning: boolean) => void;
  signOut: () => Promise<void>;
  initialize: () => Promise<void>;
  handleSessionUpdate: (session: AuthSession | null) => Promise<void>;
}

export interface ThemeState {
  settings: Settings | null;
  isLoading: boolean;
  error: Error | null;
  mode: 'light' | 'dark' | 'system';
  setSettings: (settings: Settings) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: Error | null) => void;
  setMode: (mode: 'light' | 'dark' | 'system') => void;
  updateSettings: (settings: Settings) => Promise<void>;
}