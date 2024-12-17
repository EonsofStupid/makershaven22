import type { Session, User } from '@supabase/supabase-js';
import type { Settings } from '@/components/admin/settings/types';

export type UserRole = 'subscriber' | 'maker' | 'admin' | 'super_admin';

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
  updateTheme: (settings: Settings) => Promise<void>;
  themeMode: 'light' | 'dark' | 'system';
  setThemeMode: (mode: 'light' | 'dark' | 'system') => void;
  systemTheme: 'light' | 'dark';
  setSystemTheme: (theme: 'light' | 'dark') => void;
  effectiveTheme: 'light' | 'dark';
  cssVariables: Record<string, string>;
  themeState: {
    settings: Settings | null;
    isLoading: boolean;
    error: Error | null;
  };
}

export interface AuthState {
  session: Session | null;
  user: User | null;
  isLoading: boolean;
  error: Error | null;
  setSession: (session: Session | null) => void;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: Error | null) => void;
}