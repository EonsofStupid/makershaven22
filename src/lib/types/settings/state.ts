import { Settings, SiteSettings, SecuritySettings, UserSettings } from './core';

export interface SettingsState {
  settings: Settings | null;
  isLoading: boolean;
  error: string | null;
  lastUpdated?: Date;
}

export type SettingsAction =
  | { type: 'SET_SETTINGS'; payload: Settings }
  | { type: 'UPDATE_SITE_SETTINGS'; payload: Partial<SiteSettings> }
  | { type: 'UPDATE_SECURITY_SETTINGS'; payload: Partial<SecuritySettings> }
  | { type: 'UPDATE_USER_SETTINGS'; payload: Partial<UserSettings> }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null };