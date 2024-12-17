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
  user: AuthUser;
}

export interface AuthState {
  session: AuthSession | null;
  user: AuthUser | null;
  isLoading: boolean;
  error: Error | null;
  isOffline: boolean;
  isTransitioning: boolean;
  initialize: () => Promise<void>;
  handleSessionUpdate: (session: AuthSession | null) => Promise<void>;
  setSession: (session: AuthSession | null) => void;
  setUser: (user: AuthUser | null) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: Error | null) => void;
  setOffline: (isOffline: boolean) => void;
  signOut: () => Promise<void>;
  reset: () => void;
}

export interface ThemeState {
  settings: Settings | null;
  isLoading: boolean;
  error: Error | null;
  mode: 'light' | 'dark' | 'system';
  themeMode: 'light' | 'dark' | 'system';
  setThemeMode: (mode: 'light' | 'dark' | 'system') => void;
  systemTheme: 'light' | 'dark';
  setSystemTheme: (theme: 'light' | 'dark') => void;
  effectiveTheme: 'light' | 'dark';
  cssVariables: Record<string, string>;
  setSettings: (settings: Settings) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: Error | null) => void;
  setMode: (mode: 'light' | 'dark' | 'system') => void;
  updateSettings: (settings: Settings) => Promise<void>;
  updateTheme: (settings: Settings) => Promise<void>;
}