
import { Json } from '../core/json';

export interface BaseContent {
  id: string;
  title: string;
  slug?: string;
  content?: Json;
  metadata?: Json;
  status: 'draft' | 'published' | 'archived';
  type: 'page' | 'build' | 'guide' | 'part' | 'component' | 'template' | 'workflow' | 'hero' | 'feature';
  created_by: string;
  created_at?: string;
  updated_by?: string;
  updated_at?: string;
  version?: number;
  author_id?: string; // For backward compatibility
}

export type ContentStatus = 'draft' | 'published' | 'archived';
export type ContentType = 'page' | 'build' | 'guide' | 'part' | 'component' | 'template' | 'workflow' | 'hero' | 'feature';

// Additional content-related types can be defined here
