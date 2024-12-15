export type ContentType = 'page' | 'component' | 'template' | 'workflow';
export type ContentStatus = 'draft' | 'published' | 'archived';

export interface BaseContent {
  id: string;
  title: string;
  type: ContentType;
  content: any;
  metadata?: Record<string, any>;
  slug?: string;
  status?: ContentStatus;
  version?: number;
  created_by?: string;
  updated_by?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ContentState {
  activeContent: BaseContent | null;
  contentHistory: Record<string, BaseContent[]>;
  isLoading: boolean;
  error: Error | null;
}