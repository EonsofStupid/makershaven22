import { Json } from '@/integrations/supabase/types';

export type ContentType = 'page' | 'component' | 'template' | 'workflow';
export type ContentStatus = 'draft' | 'published' | 'archived';

export interface BaseContent {
  id: string;
  title: string;
  type: ContentType;
  status: ContentStatus;
  content?: Json;
  metadata?: Json;
  created_by: string;
  updated_by?: string;
  created_at: string;
  updated_at?: string;
  version?: number;
}

export interface ContentWithAuthor extends BaseContent {
  created_by: {
    display_name: string;
  };
}