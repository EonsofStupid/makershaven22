
import { Settings, FlattenedSettings, SiteSettings, ThemeSettings, UserSettings } from './core';
import { SecuritySettings } from '../security/types';

// Export core types for external use
export type { Settings, FlattenedSettings, SiteSettings, ThemeSettings, SecuritySettings, UserSettings };

// Type for form data - used consistently across all settings forms
export type SettingsFormData = FlattenedSettings;

// Type for API responses
export interface SettingsResponse {
  data: FlattenedSettings;
  error: null | {
    message: string;
  };
}

// Interfaces for different settings contexts
export interface SiteSettingsContext {
  settings: SiteSettings | null;
  isLoading: boolean;
  error: string | null;
  updateSettings: (settings: Partial<SiteSettings>) => Promise<void>;
}

export interface ThemeSettingsContext {
  settings: ThemeSettings | null;
  isLoading: boolean;
  error: string | null;
  updateSettings: (settings: Partial<ThemeSettings>) => Promise<void>;
}

export interface SecuritySettingsContext {
  settings: SecuritySettings | null;
  isLoading: boolean;
  error: string | null;
  updateSettings: (settings: Partial<SecuritySettings>) => Promise<void>;
}

export interface UserSettingsContext {
  settings: UserSettings | null;
  isLoading: boolean;
  error: string | null;
  updateSettings: (settings: Partial<UserSettings>) => Promise<void>;
}

// Comprehensive settings form hook return type
export interface UseSettingsFormReturn {
  form: any; // This will be the return type of useForm, could be more specific with RHF types
  settings: FlattenedSettings | null;
  isLoading: boolean;
  isSaving: boolean;
  logoFile: File | null;
  faviconFile: File | null;
  handleLogoUpload: (file: File) => Promise<void>;
  handleFaviconUpload: (file: File) => Promise<void>;
  handleSettingsUpdate: (data: FlattenedSettings) => Promise<void>;
  handleResetToDefault: () => Promise<void>;
}

// Type for settings transformations
export interface SettingsConverters {
  flattenSettings: (settings: Settings) => FlattenedSettings;
  unflattenSettings: (settings: FlattenedSettings) => Settings;
}
