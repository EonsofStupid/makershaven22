import { Json } from './json';
import { ContentStatus, ContentType } from './enums';

export interface BaseContent {
  id: string;
  title: string;
  content: Json;
  type: ContentType;
  status: ContentStatus;
  created_by: string;
  created_at: string;
  updated_at?: string;
  metadata?: Json;
  version?: number;
  slug?: string;
  updated_by?: string;
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
  parentId: string;
  childId: string;
  relationshipType: string;
  orderIndex?: number;
}