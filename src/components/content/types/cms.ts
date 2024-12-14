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

export interface SecurityLog {
  id: string;
  user_id?: string;
  event_type: string;
  severity: string;
  details: Json;
  metadata: Json;
  ip_address?: string;
  user_agent?: string;
  created_at: string;
  profiles?: {
    username: string;
    display_name: string;
  };
}