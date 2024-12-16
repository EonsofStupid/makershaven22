import { Json } from './base';
import type { ContentType, ContentStatus } from '../enums';

export interface ContentTables {
  cms_content: {
    Row: {
      id: string;
      title: string;
      type: ContentType;
      content: Json | null;
      metadata: Json | null;
      slug: string | null;
      status: ContentStatus | null;
      created_by: string;
      updated_by: string | null;
      created_at: string | null;
      updated_at: string | null;
      version: number | null;
    };
    Insert: Partial<ContentTables['cms_content']['Row']>;
    Update: Partial<ContentTables['cms_content']['Row']>;
  };

  cms_content_revisions: {
    Row: {
      id: string;
      content_id: string | null;
      content: Json;
      metadata: Json | null;
      created_by: string | null;
      created_at: string | null;
      version_number: number | null;
      change_summary: string | null;
      rollback_metadata: Json | null;
      publish_status: string | null;
    };
    Insert: Partial<ContentTables['cms_content_revisions']['Row']>;
    Update: Partial<ContentTables['cms_content_revisions']['Row']>;
  };
}