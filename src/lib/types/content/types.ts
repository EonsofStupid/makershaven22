
import { Json } from '../core/json';
import { ContentStatus, ContentType } from '../core/enums';

export interface BaseContent {
  id: string;
  title: string;
  type: ContentType;
  content?: Json;
  metadata?: Json;
  slug?: string;
  status?: ContentStatus;
  version?: number;
  created_by: string;
  updated_by?: string;
  created_at?: string;
  updated_at?: string;
}

// Add ContentCreate interface for content creation operations
export interface ContentCreate {
  title: string;
  type: ContentType;
  content?: Json;
  metadata?: Json;
  slug?: string;
  status?: ContentStatus;
  created_by: string;
}

// Add ContentUpdate interface for content update operations
export interface ContentUpdate {
  id: string;
  title?: string;
  type?: ContentType;
  content?: Json;
  metadata?: Json;
  slug?: string;
  status?: ContentStatus;
  updated_by: string;
}

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

// Define valid content types
export const ValidContentTypes = {
  PAGE: ContentType.page,
  COMPONENT: ContentType.component,
  TEMPLATE: ContentType.template,
  WORKFLOW: ContentType.workflow,
  BUILD: ContentType.build,
  GUIDE: ContentType.guide,
  PART: ContentType.part,
  HERO: ContentType.hero,
  FEATURE: ContentType.feature
} as const;
