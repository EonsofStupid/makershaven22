
import type { BaseContent, ContentStatus, ContentType } from '@/lib/types/content/types';
import type { Json } from '@/lib/types/core/json';

// Re-export the core types for convenience
export type { BaseContent, ContentStatus, ContentType };

// Additional CMS-specific types
export interface ContentWithRelationships extends BaseContent {
  relationships?: ContentRelationship[];
}

export interface ContentRelationship {
  id: string;
  parent_id: string;
  child_id: string;
  relationship_type: string;
  order_index?: number;
  parent?: BaseContent;
  child?: BaseContent;
}

export interface ContentRevision {
  id: string;
  content_id: string;
  content: Json;
  metadata?: Json;
  created_by: string;
  created_at: string;
  version_number: number;
  change_summary?: string;
  publish_status?: string;
  scheduled_publish_at?: string;
  rollback_from?: string;
  rollback_metadata?: Json;
}

export interface ContentFormState {
  title: string;
  type: ContentType;
  status: ContentStatus;
  slug: string;
  content: any;
  metadata: any;
}
