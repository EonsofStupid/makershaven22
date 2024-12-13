import type { Database } from '../database';

export type AdminSettings = Database['public']['Tables']['admin_settings']['Row'];
export type AdminSettingsInsert = Database['public']['Tables']['admin_settings']['Insert'];
export type AdminSettingsUpdate = Database['public']['Tables']['admin_settings']['Update'];