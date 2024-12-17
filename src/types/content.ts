import { ComponentType, ContentStatus } from './enums';
import type { Json } from '@supabase/supabase-js';

export interface BaseContent {
  id: string;
  title: string;
  type: ComponentType;
  content: string | Json;
  metadata?: Json;
  slug?: string;
  status: ContentStatus;
  version: number;
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
  created_by: string;
  created_at: string;
  version_number: number;
  change_summary?: string;
  rollback_metadata?: Json;
  publish_status?: string;
}

export interface ContentRelationship {
  id: string;
  parent_id?: string;
  child_id?: string;
  relationship_type: string;
  order_index?: number;
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