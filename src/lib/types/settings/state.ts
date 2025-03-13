
import { Settings, SiteSettings, ThemeSettings, SecuritySettings, UserSettings } from './core';

export interface SettingsState {
  settings: Settings | null;
  isLoading: boolean;
  error: string | null;
  lastUpdated?: Date;
}

export type SettingsAction =
  | { type: 'SET_SETTINGS'; payload: Settings }
  | { type: 'UPDATE_SITE_SETTINGS'; payload: Partial<SiteSettings> }
  | { type: 'UPDATE_THEME_SETTINGS'; payload: Partial<ThemeSettings> }
  | { type: 'UPDATE_SECURITY_SETTINGS'; payload: Partial<SecuritySettings> }
  | { type: 'UPDATE_USER_SETTINGS'; payload: Partial<UserSettings> }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null };

export interface SettingsStoreState {
  settings: Settings | null;
  isLoading: boolean;
  error: string | null;
  lastUpdated?: Date;
  setSetting: <K extends keyof Settings>(key: K, value: Settings[K]) => void;
  updateSiteSettings: (settings: Partial<SiteSettings>) => void;
  updateThemeSettings: (settings: Partial<ThemeSettings>) => void;
  updateSecuritySettings: (settings: Partial<SecuritySettings>) => void;
  updateUserSettings: (settings: Partial<UserSettings>) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  resetSettings: () => void;
  fetchSettings: () => Promise<void>;
}
