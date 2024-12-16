import type { Json } from '@supabase/supabase-js';
import type { ContentType, ContentStatus } from './base';

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

export interface ContentState {
  activeContent: BaseContent | null;
  contentHistory: Record<string, BaseContent[]>;
  isLoading: boolean;
  error: Error | null;
}