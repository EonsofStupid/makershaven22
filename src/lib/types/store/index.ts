import { Settings, ThemeMode } from '../settings';

export interface GlobalState {
  // Core state
  isReady: boolean;
  isMaintenanceMode: boolean;
  error: Error | null;
  
  // Theme state
  theme: Settings | null;
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