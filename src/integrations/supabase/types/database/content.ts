import { Json } from './base';
import { UserRole } from './auth';

export interface ContentTableDefinitions {
  cms_content: {
    Row: {
      id: string;
      title: string;
      type: ContentType;
      content: Json | null;
      metadata: Json | null;
      slug: string | null;
      status: ContentStatus | null;
      version: number | null;
      created_by: string;
      updated_by: string | null;
      created_at: string | null;
      updated_at: string | null;
    };
    Insert: Partial<ContentTableDefinitions['cms_content']['Row']>;
    Update: Partial<ContentTableDefinitions['cms_content']['Row']>;
  };
}

export type ContentType = 'page' | 'component' | 'template' | 'workflow';
export type ContentStatus = 'draft' | 'published' | 'archived';