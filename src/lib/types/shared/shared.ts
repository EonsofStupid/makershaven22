import type { Json } from '../core/json';

export interface CmsContent {
  id: string;
  title: string;
  content: Json;
  status: 'draft' | 'published' | 'archived';
  created_at: string;
  updated_at: string;
  created_by: string;
  updated_by?: string;
  author_id: string;
  metadata?: Record<string, any>;
  type: 'page' | 'component' | 'template' | 'workflow' | 'hero' | 'feature';
  version?: number;
  slug?: string;
}

export { type Settings } from '../settings/types';