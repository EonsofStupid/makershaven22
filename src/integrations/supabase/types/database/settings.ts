import type { Json } from './base';

export interface SettingsTableDefinitions {
  site_settings: {
    Row: {
      id: string;
      site_title: string;
      tagline: string | null;
      primary_color: string | null;
      secondary_color: string | null;
      accent_color: string | null;
      security_settings: Json;
      updated_at: string | null;
      updated_by: string | null;
    };
    Insert: {
      site_title: string;
      tagline?: string;
      security_settings?: Json;
    };
    Update: {
      site_title?: string;
      tagline?: string;
      security_settings?: Json;
    };
  };
}