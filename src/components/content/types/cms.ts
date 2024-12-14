import { Json } from '@/integrations/supabase/types';

export interface BaseContent {
  id?: string;
  title: string;
  content?: any;
  metadata?: { [key: string]: any };
  status?: 'draft' | 'published' | 'archived';
  version?: number;
}

export interface ComponentContent extends BaseContent {
  type: 'component';
}

export interface PageContent extends BaseContent {
  type: 'page';
  layout?: string;
}

export interface ContentRevision {
  id: string;
  content_id: string;
  content: Json;
  metadata?: Json;
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