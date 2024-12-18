import { Json } from '../core/json';
import { ContentStatus, ContentType } from '../core/enums';

export interface BaseContent {
  id: string;
  title: string;
  type: ContentType;
  content?: Json;
  metadata?: Json;
  slug?: string;
  status: ContentStatus;
  version?: number;
  created_by: string;
  updated_by?: string;
  created_at: string;
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
  publish_status?: string;
  scheduled_publish_at?: string;
  rollback_from?: string;
  rollback_metadata?: Json;
}

export interface ContentWithAuthor {
  id: string;
  title: string;
  type: ContentType;
  content?: Json;
  metadata?: Json;
  slug?: string;
  status: ContentStatus;
  version?: number;
  created_at: string;
  updated_at?: string;
  created_by: {
    display_name: string;
  };
}