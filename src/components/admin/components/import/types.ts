export interface ImportSession {
  id: string;
  user_id?: string;
  file_name?: string;
  file_size?: number;
  row_count?: number;
  status: string;
  error_message?: string;
  created_at?: string;
  completed_at?: string;
  type?: string;
  metadata?: Record<string, any>;
}

export interface ImportWizardProps {
  onComplete?: () => void;
  onCancel?: () => void;
  importType?: string;
  defaultMetadata?: Record<string, any>;
}