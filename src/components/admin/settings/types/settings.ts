import type { ThemeSettings, ThemeUpdateParams } from '@/integrations/supabase/types/theme';

export type Settings = ThemeSettings;
export type SettingsFormData = Settings;
export type SettingsUpdateParams = ThemeUpdateParams;

export interface SettingsResponse {
  data: Settings;
  error: null | Error;
}