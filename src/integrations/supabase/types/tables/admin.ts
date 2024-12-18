import type { Database } from '../database';

export type AdminSettings = {
  id: string;
  setting_key: string;
  setting_value: string | null;
  setting_type: string;
  created_at: string | null;
  updated_at: string | null;
};

export type AdminToolbarShortcut = {
  id: string;
  user_id: string | null;
  item_id: string;
  position: number | null;
  created_at: string | null;
};

export type AdminSettingsInsert = Partial<AdminSettings>;
export type AdminSettingsUpdate = Partial<AdminSettings>;