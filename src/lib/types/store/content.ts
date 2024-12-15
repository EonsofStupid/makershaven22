export type ContentType = 'page' | 'post' | 'component' | 'workflow' | 'template';
export type ContentStatus = 'draft' | 'published' | 'archived';

export interface BaseContent {
  id: string;
  title: string;
  type: ContentType;
  content: any;
  metadata?: Record<string, any>;
  status: ContentStatus;
  version: number;
  created_at: string;
  updated_at: string;
  created_by?: string;
  updated_by?: string;
}

export interface ContentState {
  currentContent: BaseContent | null;
  contentList: BaseContent[];
  isLoading: boolean;
  error: Error | null;
}