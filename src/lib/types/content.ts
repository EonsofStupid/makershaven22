import type { Json } from "@/integrations/supabase/types";

export type ContentType = 'page' | 'component' | 'template' | 'workflow';
export type ContentStatus = 'draft' | 'published' | 'archived';

export interface BaseContent {
  id: string;
  title: string;
  content: Json;
  type: ContentType;
  status: ContentStatus;
  created_by: string;
  created_at: string;
  updated_at?: string;
  metadata?: Json;
  version?: number;
  slug?: string;
  updated_by?: string;
}

export interface ContentWithAuthor extends BaseContent {
  profiles: {
    display_name: string;
    username?: string;
  };
}

export interface ContentRevision {
  id: string;
  content_id: string;
  content: Json;
  metadata?: Json;
  version_number: number;
  created_by: string;
  created_at: string;
  profiles: {
    display_name: string;
  };
  change_summary?: string;
  rollback_metadata?: Json;
}

export interface PageContent extends BaseContent {
  type: 'page';
  content: {
    body: string;
    seo?: Record<string, any>;
  };
}

export interface ComponentContent extends BaseContent {
  type: 'component';
  content: {
    componentType: string;
    props: Record<string, any>;
    styles: Record<string, any>;
  };
}