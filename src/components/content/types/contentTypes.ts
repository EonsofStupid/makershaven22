import { type Json } from "@/integrations/supabase/types";

export type ContentType = 'page' | 'component' | 'template' | 'workflow';
export type ContentStatus = 'draft' | 'published' | 'archived';

export interface BaseContent {
  id: string;
  title: string;
  content: Json;
  type: ContentType;
  status: ContentStatus;
  created_by: { display_name: string };
  created_at: string;
  updated_at?: string;
  metadata?: Json;
  version?: number;
}

export interface PageContent {
  title: string;
  content: {
    body: string;
    seo?: Record<string, any>;
  };
  type: 'page';
  status?: ContentStatus;
  metadata?: Record<string, any>;
}

export interface ComponentContent {
  title: string;
  content: {
    componentType: string;
    props: Record<string, any>;
    styles: Record<string, any>;
  };
  type: 'component';
  status?: ContentStatus;
  metadata?: Record<string, any>;
}

export interface ContentWithAuthor extends BaseContent {
  created_by: { display_name: string };
}