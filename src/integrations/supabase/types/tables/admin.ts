import { Json } from '../base';
import type { Database } from '../database';

export interface AdminToolbarShortcut {
  id: string;
  user_id: string | null;
  item_id: string;
  position: number | null;
  created_at: string | null;
}

export interface ImportSession {
  id: string;
  user_id: string | null;
  file_name: string | null;
  file_size: number | null;
  row_count: number | null;
  status: string;
  type?: string;
  metadata?: Json;
  error_message: string | null;
  created_at: string | null;
  completed_at: string | null;
}

export type AdminSettings = Database['public']['Tables']['admin_settings']['Row'];