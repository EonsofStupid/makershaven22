import type { Json } from '../base';
import type { ContentStatus, ContentType } from '../enums';

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt?: string;
  slug: string;
  author_id: string;
  category?: string;
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