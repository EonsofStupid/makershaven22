export interface BaseContent {
  id: string;
  title: string;
  type: 'page' | 'component' | 'template' | 'workflow';
  content?: any;
  metadata?: Record<string, any>;
  status?: 'draft' | 'published' | 'archived';
  version?: number;
  created_at?: string;
  updated_at?: string;
  created_by?: string;
  updated_by?: string;
}

export interface ContentState {
  activeContent: BaseContent | null;
  contentHistory: Record<string, BaseContent[]>;
  isLoading: boolean;
  error: Error | null;
}