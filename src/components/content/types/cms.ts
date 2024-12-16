import { BaseEntity, ContentStatus, ContentType } from '@/lib/types/base';

export interface BaseContent extends BaseEntity {
  title: string;
  type: ContentType;
  content?: Record<string, any>;
  metadata?: Record<string, any>;
  slug?: string;
  status?: ContentStatus;
  version?: number;
  created_by: string;
  updated_by?: string;
}

export interface ContentRevision extends BaseEntity {
  content_id: string;
  content: Record<string, any>;
  metadata?: Record<string, any>;
  created_by?: string;
  version_number?: number;
  change_summary?: string;
  rollback_metadata?: Record<string, any>;
  publish_status?: string;
}

export interface ContentRelationship extends BaseEntity {
  parent_id?: string;
  child_id?: string;
  relationship_type: string;
  order_index?: number;
}