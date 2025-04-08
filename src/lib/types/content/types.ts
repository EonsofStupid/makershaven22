
import { Json, JsonObject } from '../core/json';
import { ContentStatus, ContentType } from '../core/enums';

/**
 * Base content interface for all content types
 */
export interface BaseContent {
  id: string;
  title: string;
  type: ContentType;
  status: ContentStatus;
  slug?: string;
  content?: JsonObject;
  metadata?: JsonObject;
  created_at: string;
  updated_at?: string;
  created_by: string;
  updated_by?: string;
  version?: number;
}

/**
 * Interface for creating new content
 */
export interface ContentCreate {
  title: string;
  type: ContentType;
  status?: ContentStatus;
  slug?: string;
  content?: JsonObject;
  metadata?: JsonObject;
  created_by: string;
}

/**
 * Interface for updating existing content
 */
export interface ContentUpdate {
  id: string;
  title?: string;
  type?: ContentType;
  status?: ContentStatus;
  slug?: string;
  content?: JsonObject;
  metadata?: JsonObject;
  updated_by: string;
}

/**
 * Interface for content revisions
 */
export interface ContentRevision {
  id: string;
  content_id: string;
  content: JsonObject;
  metadata?: JsonObject;
  version_number: number;
  created_by: string;
  created_at: string;
  change_summary?: string;
  rollback_metadata?: JsonObject;
  profiles: {
    display_name: string;
  };
}

/**
 * Interface for content relationships
 */
export interface ContentRelationship {
  id: string;
  parent_id: string;
  child_id: string;
  relationship_type: string;
  order_index?: number;
}

/**
 * Interface for posts with author information
 */
export interface PostWithAuthor {
  id: string;
  title: string;
  content: string;
  excerpt?: string;
  slug: string;
  featured_image?: string;
  published_at?: string;
  status: string;
  author: {
    id: string;
    username?: string;
    display_name?: string;
    avatar_url?: string;
  };
}
