import { z } from 'zod';
import type { Json } from '@/integrations/supabase/types';

export type ContentType = 'page' | 'component' | 'template' | 'post' | 'workflow';
export type ContentStatus = 'draft' | 'published' | 'archived';

export interface BaseContent {
  id: string;
  title: string;
  type: ContentType;
  content: ContentData;
  metadata?: Json;
  slug?: string;
  status?: ContentStatus;
  version?: number;
  created_by?: string;
  updated_by?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ContentData {
  body?: string;
  seo?: Record<string, any>;
  componentType?: string;
  props?: Record<string, any>;
  styles?: Record<string, any>;
}

export interface ComponentContent extends BaseContent {
  type: 'component';
  content: {
    componentType: string;
    props: Record<string, any>;
    styles: Record<string, any>;
  };
}

export interface PageContent extends BaseContent {
  type: 'page';
  content: {
    body: string;
    seo: Record<string, any>;
  };
}

export const componentContentSchema = z.object({
  type: z.literal('component'),
  title: z.string().min(1, 'Title is required'),
  content: z.object({
    componentType: z.string(),
    props: z.record(z.any()),
    styles: z.record(z.any())
  }),
  status: z.enum(['draft', 'published', 'archived']).default('draft')
});

export const pageContentSchema = z.object({
  type: z.literal('page'),
  title: z.string().min(1, 'Title is required'),
  content: z.object({
    body: z.string(),
    seo: z.record(z.any())
  }),
  status: z.enum(['draft', 'published', 'archived']).default('draft')
});

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