
import { Json } from '../core/json';
import { ContentStatus, ContentType } from '../enums';

export interface BaseContent {
  id: string;
  title: string;
  type: ContentType;
  status: ContentStatus;
  slug?: string;
  content?: Json;
  metadata?: Json;
  created_at: string;
  updated_at?: string;
  created_by: string;  // This is required by the database
  updated_by?: string;
  version?: number;
}

export interface ContentCreate {
  title: string;
  type: ContentType;
  status?: ContentStatus;
  slug?: string;
  content?: Json;
  metadata?: Json;
  created_by: string;  // Making this required to match database constraint
}

export interface ContentUpdate {
  id: string;
  title?: string;
  type?: ContentType;
  status?: ContentStatus;
  slug?: string;
  content?: Json;
  metadata?: Json;
  updated_by: string;  // This is required for updates
}

export interface PageContent extends BaseContent {
  type: ContentType;
  content?: {
    body?: string;
    seo?: {
      title?: string;
      description?: string;
      keywords?: string[];
    };
  };
}

export interface ComponentContent extends BaseContent {
  type: ContentType;
  content?: {
    template?: string;
    props?: Record<string, any>;
    styles?: Record<string, string>;
  };
}

export type AnyContent = PageContent | ComponentContent | BaseContent;

export interface ContentVersionMetadata {
  version: number;
  created_at: string;
  created_by: string;
  change_summary?: string;
}
