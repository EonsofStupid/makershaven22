
export type ImportStatus = 'pending' | 'processing' | 'completed' | 'failed';

export interface ImportSession {
  id: string;
  user_id: string;
  status: ImportStatus;
  file_name: string;
  file_size: number;
  file_type: string;
  metadata: Record<string, any>;
  created_at: string;
  updated_at: string;
}
