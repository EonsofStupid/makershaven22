import { Json } from '@/integrations/supabase/types';

export interface BaseContent {
  id: string;
  title: string;
  type: ContentType;
  content: Json;
  metadata?: Json;
  slug?: string;
  status?: ContentStatus;
  version?: number;
  created_by?: string;
  updated_by?: string;
  created_at?: string;
  updated_at?: string;
}

export type ContentType = 'page' | 'component' | 'template' | 'post';
export type ContentStatus = 'draft' | 'published' | 'archived';

export interface ComponentContent extends BaseContent {
  type: 'component';
}

export interface PageContent extends BaseContent {
  type: 'page';
}

export const componentContentSchema = {
  // Add schema definition
};

export const pageContentSchema = {
  // Add schema definition
};

export const getSchemaByType = (type: ContentType) => {
  switch (type) {
    case 'component':
      return componentContentSchema;
    case 'page':
      return pageContentSchema;
    default:
      return null;
  }
};