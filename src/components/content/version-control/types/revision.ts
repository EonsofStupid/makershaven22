import { Json } from '@/integrations/supabase/types';

export interface ContentRevision {
  id: string;
  content_id: string;
  content: Json;
  metadata?: Json;
  version_number: number;
  created_by: string;
  created_at: string;
  change_summary?: string;
  profiles?: {
    display_name: string;
    avatar_url?: string;
  };
}

export interface RevisionState {
  revisions: ContentRevision[];
  selectedRevision: ContentRevision | null;
  compareRevision: ContentRevision | null;
  diffMode: 'split' | 'unified';
  selectedVersions: {
    left: number;
    right: number;
  };
}