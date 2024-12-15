import { BaseEntity, ContentStatus, ContentType } from './base';
import { Json } from '@/integrations/supabase/types';

export interface BaseContent extends BaseEntity {
  title: string;
  type: ContentType;
  content?: Json;
  metadata?: Json;
  slug?: string;
  status?: ContentStatus;
  version?: number;
}

export interface ContentRevision {
  id: string;
  content_id: string;
  content: Json;
  metadata?: Json;
  version_number: number;
  change_summary?: string;
}

export interface ContentRelationship {
  id: string;
  parent_id: string;
  child_id: string;
  relationship_type: string;
  order_index?: number;
}