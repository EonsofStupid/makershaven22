import { Session } from '@supabase/supabase-js';
import { Settings, ThemeMode } from './settings/types';

export interface AuthSession extends Session {
  user: {
    id: string;
    email?: string;
    role?: string;
    username?: string;
    displayName?: string;
    avatarUrl?: string;
  };
}

export interface AuthState {
  session: AuthSession | null;
  user: AuthSession['user'] | null;
  loading: boolean;
  error: Error | null;
}

export interface ThemeState {
  settings: Settings | null;
  isLoading: boolean;
  error: Error | null;
  mode: ThemeMode;
  themeMode: ThemeMode;
  systemTheme: ThemeMode;
  effectiveTheme: ThemeMode;
  cssVariables: Record<string, string>;
}