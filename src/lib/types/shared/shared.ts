import type { Json } from '../core/json';
import type { Settings } from '../settings/types';

export interface CmsContent {
  id: string;
  title: string;
  content: Json;
  metadata?: Json;
  status: 'draft' | 'published' | 'archived';
  type: 'page' | 'component' | 'template' | 'workflow' | 'hero' | 'feature';
  slug?: string;
  version?: number;
  created_by: string;
  updated_by?: string;
  created_at: string;
  updated_at: string;
  author_id: string;
}

export { type Settings };