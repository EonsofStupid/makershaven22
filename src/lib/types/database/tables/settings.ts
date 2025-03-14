
import { FlattenedSettings } from '../../settings/core';

/**
 * Type definition for the site_settings table in Supabase
 */
export interface SiteSettingsTable {
  Row: FlattenedSettings;
  Insert: Partial<FlattenedSettings>;
  Update: Partial<FlattenedSettings>;
}

/**
 * Type definition for the security_settings table in Supabase
 */
export interface SecuritySettingsTable {
  Row: {
    id: string;
    settings: Record<string, any>;
    updated_at?: string;
    updated_by?: string;
  };
  Insert: {
    id?: string;
    settings: Record<string, any>;
    updated_at?: string;
    updated_by?: string;
  };
  Update: {
    id?: string;
    settings?: Record<string, any>;
    updated_at?: string;
    updated_by?: string;
  };
}

/**
 * Type definition for the admin_settings table in Supabase
 */
export interface AdminSettingsTable {
  Row: {
    id: string;
    setting_key: string;
    setting_type: string;
    setting_value: string | null;
    created_at?: string;
    updated_at?: string;
  };
  Insert: {
    id?: string;
    setting_key: string;
    setting_type?: string;
    setting_value?: string | null;
    created_at?: string;
    updated_at?: string;
  };
  Update: {
    id?: string;
    setting_key?: string;
    setting_type?: string;
    setting_value?: string | null;
    created_at?: string;
    updated_at?: string;
  };
}
