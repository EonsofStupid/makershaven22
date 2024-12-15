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

export interface ContentRevision {
  id: string;
  content_id: string;
  version: number;
  content: any;
  created_by: string;
  created_at: string;
}

export interface PublishQueueItem {
  id: string;
  content_id: string;
  scheduled_for: string;
  status: 'pending' | 'published' | 'failed';
  created_by: string;
}