import { Json } from '../core/json';
import { ContentStatus, ContentType } from '../core/enums';
import type { BaseEntity } from '../core/entity';
import type { JsonObject } from '../core/json';

// Base Content interface - foundation for all content types
export interface BaseContent extends BaseEntity {
  id: string;
  title: string;
  type: ContentType;
  content?: JsonObject;
  metadata?: JsonObject;
  slug: string;
  status: ContentStatus;
  version?: number;
  created_by: string; // This is required, fixing the type mismatch
  updated_by?: string;
  created_at?: string;
  updated_at?: string;
}

// Content Creation type - used specifically for creating new content
export interface ContentCreate {
  title: string;
  type: ContentType;
  status: ContentStatus;
  slug: string;
  content?: JsonObject;
  metadata?: JsonObject;
  created_by: string; // Required for database insertion
}

// Content Update type - used specifically for updating existing content
export interface ContentUpdate {
  title?: string;
  type?: ContentType;
  status?: ContentStatus;
  slug?: string;
  content?: JsonObject;
  metadata?: JsonObject;
  updated_by: string; // Required for updates
}

// Additional content-related types
export interface ContentRevision {
  id: string;
  content_id: string;
  content: Json;
  metadata?: Json;
  created_by?: string;
  created_at: string;
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

// Additional post-related types
export interface PostWithAuthor {
  id: string;
  title: string;
  slug: string;
  content: Json;
  excerpt?: string;
  featured_image?: string;
  status: ContentStatus;
  created_at: string;
  updated_at?: string;
  published_at?: string;
  author_id: string;
  category?: string;
  tags?: string[];
  metadata?: Json;
  views_count: number;
  likes_count?: number;
  comments_count?: number;
  profiles: {
    display_name: string;
    username: string;
  };
}

// Define valid category types
export const ContentCategories = {
  BLOG: 'blog',
  GUIDE: 'guide',
  REVIEW: 'review',
  NEWS: 'news',
  UPDATE: 'update',
  TEMPLATE: 'template',
  OTHER: 'other'
} as const;

// Define valid content types for convenience
export const ValidContentTypes = {
  PAGE: 'page' as ContentType,
  COMPONENT: 'component' as ContentType,
  TEMPLATE: 'template' as ContentType,
  WORKFLOW: 'workflow' as ContentType,
  BUILD: 'build' as ContentType,
  GUIDE: 'guide' as ContentType,
  PART: 'part' as ContentType,
  HERO: 'hero' as ContentType,
  FEATURE: 'feature' as ContentType
} as const;

/**
 * Content query options
 */
export interface ContentQueryOptions {
  type?: ContentType;
  status?: ContentStatus;
  search?: string;
  sort?: string;
  order?: 'asc' | 'desc';
  limit?: number;
  offset?: number;
}
