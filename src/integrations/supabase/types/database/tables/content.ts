import type { Json } from '../../core/json';
import type { ContentStatus, ContentType, PostCategory } from '../../core/enums';

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt?: string;
  slug: string;
  author_id?: string;
  category?: PostCategory;
  tags?: string[];
  featured_image?: string;
  images?: string[];
  status?: string;
  published_at?: string;
  updated_at?: string;
  views_count?: number;
  rich_content?: Json;
}

export interface CMSContent {
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

export interface ContentRevision {
  id: string;
  content_id: string;
  content: Json;
  metadata?: Json;
  version_number: number;
  created_by: string;
  created_at: string;
  change_summary?: string;
  rollback_metadata?: Json;
}