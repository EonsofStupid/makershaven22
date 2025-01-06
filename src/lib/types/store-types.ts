import { Settings } from './settings/types';
import { AuthSession, AuthUser, AuthError } from './auth/types';

export interface ThemeState {
  settings: Settings | null;
  isLoading: boolean;
  error: Error | null;
  setSettings: (settings: Settings) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: Error | null) => void;
  updateSettings: (settings: Settings) => Promise<void>;
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

export interface SettingsState {
  settings: Settings;
  saveTransformationRule: (rule: any) => Promise<void>;
}