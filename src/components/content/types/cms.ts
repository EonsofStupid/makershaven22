import { Json } from "@/integrations/supabase/types";

export interface BaseContent {
  id: string;
  title: string;
  content: Json;
  type: 'page' | 'component' | 'template' | 'workflow';
  status: 'draft' | 'published' | 'archived';
  created_by: { display_name: string };
  created_at: string;
  updated_at?: string;
  metadata?: Json;
  version?: number;
}

export interface ContentWithAuthor extends BaseContent {
  created_by: { display_name: string };
}

export interface ContentRevision {
  id: string;
  content_id: string;
  content: Json;
  metadata?: Json;
  version_number: number;
  created_by: string;
  created_at: string;
  profiles: { display_name: string };
}

export interface Revision {
  id: string;
  content: Json;
  metadata?: Json;
  created_by: string;
  created_at: string;
  profiles: { display_name: string };
}