import { TableDefinition } from "../base";

export interface AdminSettings {
  id: string;
  setting_key: string;
  setting_value: string | null;
  setting_type: string;
  created_at: string;
  updated_at: string | null;
}

export type AdminSettingsTable = TableDefinition<AdminSettings>;