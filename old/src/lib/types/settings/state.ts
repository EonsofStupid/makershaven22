
import { FlattenedSettings } from './core';

/**
 * Interface for settings form data
 */
export type SettingsFormData = FlattenedSettings;

/**
 * Interface for settings API responses
 */
export interface SettingsResponse {
  data: FlattenedSettings | null;
  error: null | {
    message: string;
  };
}

/**
 * Interface for useSettingsForm hook return value
 */
export interface UseSettingsFormReturn {
  settings: FlattenedSettings | null;
  isLoading: boolean;
  isSaving: boolean;
  isResetting: boolean;
  logoFile: File | null;
  faviconFile: File | null;
  handleLogoUpload: (file: File) => Promise<void>;
  handleFaviconUpload: (file: File) => Promise<void>;
  handleSettingsUpdate: (data: FlattenedSettings) => Promise<void>;
  handleResetToDefault: () => Promise<void>;
}

/**
 * Interface for settings store state
 */
export interface SettingsState {
  settings: Partial<FlattenedSettings>;
  isLoading: boolean;
  error: string | null;
  updateSetting: <K extends keyof FlattenedSettings>(key: K, value: FlattenedSettings[K]) => void;
  updateSettings: (settings: Partial<FlattenedSettings>) => Promise<void>;
  resetSettings: () => Promise<void>;
  fetchSettings: () => Promise<SettingsResponse>;
}
