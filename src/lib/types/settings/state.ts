
import { FlattenedSettings } from './core';
import { SecuritySettings } from '../security/types';

/**
 * Settings store state interface
 */
export interface SettingsState {
  settings: Partial<FlattenedSettings>;
  isLoading: boolean;
  error: string | null;
  updateSetting: (key: keyof FlattenedSettings, value: any) => void;
  updateSettings: (settings: Partial<FlattenedSettings>) => Promise<void>;
  resetSettings: () => Promise<void>;
}

/**
 * Theme store state interface
 */
export interface ThemeState {
  settings: Partial<FlattenedSettings> | null;
  isLoading: boolean;
  error: Error | null;
  setSettings: (settings: Partial<FlattenedSettings>) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: Error | null) => void;
  updateSettings: (settings: Partial<FlattenedSettings>) => Promise<void>;
}

/**
 * Security store state interface
 */
export interface SecurityState {
  settings: SecuritySettings | null;
  isLoading: boolean;
  error: string | null;
  updateSettings: (settings: Partial<SecuritySettings>) => Promise<void>;
}

/**
 * Settings context prop types
 */
export interface SettingsContextProps {
  children: React.ReactNode;
}

/**
 * Type for settings API responses
 */
export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
}
