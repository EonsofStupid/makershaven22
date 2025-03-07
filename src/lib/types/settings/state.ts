
import { Settings } from './core';

export interface SettingsState {
  settings: Settings | null;
  isLoading: boolean;
  error: Error | null;
  setSettings: (settings: Settings | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: Error | null) => void;
  updateSettings: (settings: Partial<Settings>) => Promise<void>;
  resetSettings: () => Promise<void>;
}
