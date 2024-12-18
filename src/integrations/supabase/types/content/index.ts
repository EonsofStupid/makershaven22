import { Json } from '../base/json';
import { ContentStatus, ContentType } from '../base/enums';

export interface BaseContent {
  id: string;
  title: string;
  type: ContentType;
  status: ContentStatus;
  content?: Json;
  metadata?: Json;
  created_by: string;
  updated_by?: string;
  created_at: string;
  updated_at?: string;
  version?: number;
  slug?: string;
}

export interface ContentWithAuthor {
  id: string;
  title: string;
  type: ContentType;
  status: ContentStatus;
  content?: Json;
  metadata?: Json;
  created_by: {
    display_name: string;
  };
  updated_by?: string;
  created_at: string;
  updated_at?: string;
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
  change_summary?: string;
  rollback_metadata?: Json;
  profiles?: {
    display_name: string;
    avatar_url?: string;
  };
}