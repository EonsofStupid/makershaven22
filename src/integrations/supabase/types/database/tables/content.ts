import type { AuditableEntity, MetadataEntity } from '../core/base-types';
import type { ContentStatus, ContentType } from '../core/enums';
import type { Json } from '../core/json';

export interface CMSContent extends AuditableEntity, MetadataEntity {
  title: string;
  type: ContentType;
  content?: Json;
  slug?: string;
  status?: ContentStatus;
  version?: number;
}

export interface BlogPost extends AuditableEntity {
  title: string;
  content: string;
  excerpt?: string;
  slug: string;
  author_id?: string;
  category?: string;
  tags?: string[];
  featured_image?: string;
  images?: string[];
  status?: string;
  published_at?: string;
  views_count?: number;
  rich_content?: Json;
}