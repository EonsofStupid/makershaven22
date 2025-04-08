
import { ThemeMode, UserRole } from './core/enums';
import { FlattenedSettings } from './settings/core';
import { SecuritySettings } from './security/types';

export interface ThemeState {
  currentTheme: string;
  systemTheme: ThemeMode;
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  setSystemTheme: (mode: ThemeMode) => void;
}

export interface AuthState {
  user: AuthUser | null;
  session: AuthSession | null;
  isLoading: boolean;
  isTransitioning?: boolean;
  hasAccess: boolean;
  error: Error | { message: string } | null;
  
  // Auth methods that should be available in the store
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string, userData?: Record<string, any>) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateProfile: (data: Partial<AuthUser>) => Promise<void>;
  
  // Derived state and utility methods
  getIsAuthenticated: () => boolean;
  getUserRole: () => UserRole | undefined;
  checkAccess: (requiredRoles?: UserRole[]) => boolean;
}

export interface AuthUser {
  id: string;
  email?: string | null;
  role?: UserRole;
  username?: string;
  displayName?: string;
  user_metadata?: {
    avatar_url?: string;
    [key: string]: any;
  };
}

export interface AuthSession {
  id: string;
  user: AuthUser;
  expires_at?: number;
  created_at: string;
}

export interface SettingsState {
  settings: FlattenedSettings;
  isLoading: boolean;
  error: Error | null;
  isDirty: boolean;
  defaultSettings: FlattenedSettings;
  
  // Settings methods
  updateSettings: (settings: Partial<FlattenedSettings>) => Promise<void>;
  resetSettings: () => Promise<void>;
  loadSettings: () => Promise<void>;
}
