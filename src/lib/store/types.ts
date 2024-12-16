import type { Settings, ThemeMode } from '@/lib/types/settings';
import type { AuthUser, AuthSession } from '@/lib/types/auth/base';

export interface GlobalState {
  // Core state
  isReady: boolean;
  isMaintenanceMode: boolean;
  error: Error | null;
  
  // Theme state
  theme: Theme | null;
  settings: Settings | null;
  mode: ThemeMode;
  isThemeLoading: boolean;
  themeError: Error | null;

  // Actions
  setState: (state: Partial<GlobalState>) => void;
  updateSettings: (settings: Settings) => void;
  setMode: (mode: ThemeMode) => void;
  setError: (error: Error | null) => void;
  reset: () => void;
}

export interface Theme {
  settings: Settings | null;
  mode: ThemeMode;
}