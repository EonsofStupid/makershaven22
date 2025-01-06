import { Settings } from './settings/types';

export interface ThemeState {
  settings: Settings | null;
  isLoading: boolean;
  error: Error | null;
  setSettings: (settings: Settings) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: Error | null) => void;
  updateSettings: (settings: Settings) => Promise<void>;
}