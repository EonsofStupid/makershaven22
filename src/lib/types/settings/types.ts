
import { FlattenedSettings, Settings as CoreSettings } from './core';

// Re-export the core types
export type { FlattenedSettings };

// For backward compatibility
export type Settings = FlattenedSettings;
export type SettingsFormData = FlattenedSettings;

// Add additional utility types as needed
export interface SettingsResponse {
  data: FlattenedSettings | null;
  error: null | {
    message: string;
  };
}

export interface SettingsUpdate {
  id: string;
  [key: string]: any;
}
