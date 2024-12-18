import { Json } from './base-types';
import { BaseEntity, UserOwnedEntity } from './base-types';

export type ContentType = 'page' | 'component' | 'template' | 'workflow';
export type ContentStatus = 'draft' | 'published' | 'archived';

export interface BaseContent extends UserOwnedEntity {
  title: string;
  type: ContentType;
  content?: Json;
  metadata?: Json;
  slug?: string;
  status?: ContentStatus;
  version?: number;
}

export interface ContentRevision extends BaseEntity {
  content_id: string;
  content: Json;
  metadata?: Json;
  created_by?: string;
  version_number: number;
  change_summary?: string;
  publish_status?: string;
  scheduled_publish_at?: string;
  rollback_from?: string;
  rollback_metadata?: Json;
}

export interface ContentRelationship {
  id: string;
  parent_id: string;
  child_id: string;
  relationship_type: string;
  order_index?: number;
}