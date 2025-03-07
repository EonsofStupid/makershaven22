
import { ContentStatus, ContentType } from '../core/enums';
import { Json } from '../core/json';

export interface ContentItem {
  id: string;
  title: string;
  slug?: string;
  type: ContentType;
  status: ContentStatus;
  content?: Json;
  metadata?: Json;
  created_by: string;
  created_at?: string;
  updated_by?: string;
  updated_at?: string;
  version?: number;
}

export interface ContentRevision {
  id: string;
  content_id: string;
  content: Json;
  version_number: number;
  change_summary?: string;
  created_by?: string;
  created_at?: string;
  metadata?: Json;
  scheduled_publish_at?: string;
  publish_status?: string;
}

export interface ContentRelationship {
  id: string;
  parent_id: string;
  child_id: string;
  relationship_type: string;
  order_index?: number;
}

export interface ContentFormData {
  title: string;
  slug?: string;
  type: ContentType;
  status: ContentStatus;
  content?: Json;
  metadata?: Json;
}

export interface ContentCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  parent_id?: string;
  metadata?: Json;
  created_at?: string;
  updated_at?: string;
}
