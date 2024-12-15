import { Settings as BaseSettings } from '@/lib/types/settings';

export interface SettingsFormData extends BaseSettings {
  // Add any form-specific fields here
}

export interface SettingsResponse {
  data: SettingsFormData;
  error: Error | null;
}
