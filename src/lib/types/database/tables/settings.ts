import { Settings } from '../../settings/types';

export interface SiteSettingsTable {
  Row: Settings;
  Insert: Partial<Settings>;
  Update: Partial<Settings>;
}