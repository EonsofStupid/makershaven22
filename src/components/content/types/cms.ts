import { Json } from "@/integrations/supabase/types";

export interface BaseContent {
  id: string;
  title: string;
  type: string;
  content: Json;
  metadata?: Record<string, any>;
  status?: string;
  version?: number;
  created_at?: string;
  updated_at?: string;
}

export interface ContentRevision {
  id: string;
  content_id: string;
  content: Json;
  metadata?: Record<string, any>;
  version_number: number;
  created_at: string;
  created_by?: string;
}