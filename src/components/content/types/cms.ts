import { Json } from '@/integrations/supabase/types';

export interface CMSContent {
  id: string;
  title: string;
  content: Json;
  metadata?: Json;
  created_at: string;
  updated_at?: string;
  created_by?: string;
  status: 'draft' | 'published' | 'archived';
}

export interface CMSRevision {
  id: string;
  content_id: string;
  content: Json;
  created_at: string;
  created_by: string;
  version: number;
}