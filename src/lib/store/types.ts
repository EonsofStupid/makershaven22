import type { Settings, Theme, ThemeMode } from '@/lib/types/settings';
import type { AuthUser, AuthSession } from '@/lib/types/auth/base';

export interface GlobalState {
  // Core state
  isReady: boolean;
  isMaintenanceMode: boolean;
  error: Error | null;
  isLoading: boolean;
  
  // Theme state
  theme: Theme | null;
  settings: Settings | null;
  mode: ThemeMode;
  isThemeLoading: boolean;
  themeError: Error | null;

  // Auth state
  user: AuthUser | null;
  session: AuthSession | null;
  isAuthLoading: boolean;
  authError: Error | null;
  isTransitioning: boolean;
  hasAccess: boolean;

  // Actions
  setState: (state: Partial<GlobalState>) => void;
  updateSettings: (settings: Settings) => void;
  setMode: (mode: ThemeMode) => void;
  setError: (error: Error | null) => void;
  reset: () => void;
}

export interface ThemeState {
  theme: Theme | null;
  settings: Settings | null;
  mode: ThemeMode;
  isThemeLoading: boolean;
  themeError: Error | null;
}

export interface AuthState {
  user: AuthUser | null;
  session: AuthSession | null;
  isAuthLoading: boolean;
  error: Error | null;
  isTransitioning: boolean;
  hasAccess: boolean;
}