import { Json } from '../core/json';

export type ContentType = 'template' | 'page' | 'build' | 'guide' | 'part' | 'component' | 'workflow' | 'hero' | 'feature';
export type ContentStatus = 'draft' | 'published' | 'archived';

export interface BaseContent {
  id: string;
  title: string;
  type: ContentType;
  status: ContentStatus;
  content?: Json;
  metadata?: Json;
  created_at: string;
  updated_at?: string;
  created_by: string;
  updated_by?: string;
}

export interface ContentRevision {
  id: string;
  content_id: string;
  version: number;
  content: Json;
  metadata?: Json;
  created_by: string;
  created_at: string;
}