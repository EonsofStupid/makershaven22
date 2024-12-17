import { Json } from './json';
import { ContentStatus, ContentType } from './enums';
import { BaseEntity, UserOwnedEntity } from './base';

export interface BaseContent extends UserOwnedEntity {
  title: string;
  content: Json;
  type: ContentType;
  status: ContentStatus;
  metadata?: Json;
  version?: number;
  slug?: string;
}

export interface ContentRevision {
  id: string;
  content_id: string;
  content: Json;
  metadata?: Json;
  version_number: number;
  created_by: string;
  created_at: string;
  profiles: { display_name: string };
  change_summary?: string;
  rollback_metadata?: Json;
}

export interface ContentRelationship {
  id: string;
  parent_id?: string;
  child_id?: string;
  relationship_type: string;
  order_index?: number;
}

export interface SecurityLog {
  id: string;
  user_id: string;
  event_type: string;
  severity: string;
  details: Json;
  metadata: Json;
  ip_address: string;
  user_agent: string;
  created_at: string;
  profiles?: {
    username: string;
    display_name: string;
  };
}