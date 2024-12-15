import { Settings } from '@/lib/types/settings';

export interface SettingsFormData extends Settings {
  // Add any form-specific fields here
}

export interface SettingsResponse {
  data: SettingsFormData;
  error: Error | null;
}