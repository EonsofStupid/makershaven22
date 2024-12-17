import { Json } from './json';
import { ContentStatus, ContentType } from './enums';
import { UserOwnedEntity, MetadataEntity } from './base';

export interface BaseContent extends UserOwnedEntity, MetadataEntity {
  title: string;
  content: Json;
  type: ContentType;
  status: ContentStatus;
  version?: number;
  slug?: string;
}

export interface ContentRevision extends UserOwnedEntity {
  content_id: string;
  content: Json;
  version_number: number;
  change_summary?: string;
  rollback_metadata?: Json;
  profiles?: {
    display_name: string;
  };
}

export interface ContentRelationship extends BaseEntity {
  parent_id: string;
  child_id: string;
  relationship_type: string;
  order_index?: number;
}