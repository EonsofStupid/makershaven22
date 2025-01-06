import type { Json } from '../core/json';
import type { AuthUser, UserRole } from '../auth/types';
import type { Settings } from '../settings/types';

export interface CmsContent {
  id: string;
  title: string;
  content: string;
  status: 'draft' | 'published' | 'archived';
  created_at: string;
  updated_at: string;
  created_by: string;
  updated_by?: string;
  author_id: string;
  metadata?: Record<string, any>;
  type: 'page' | 'component' | 'template' | 'workflow';
  version?: number;
  slug?: string;
}

export interface ContentWithAuthor extends Omit<CmsContent, 'created_by'> {
  created_by: {
    display_name: string;
  };
}

export interface RevisionStore {
  revisions: any[];
  selectedRevision: string | null;
  compareRevision: string | null;
  diffMode: 'unified' | 'split';
  selectedVersions: {
    left: number;
    right: number;
  };
}

export interface WorkflowStage {
  id: string;
  name: string;
  type: string;
  order: number;
  config: Record<string, any>;
  description?: string;
}

export interface WorkflowTemplate {
  id: string;
  name: string;
  description?: string;
  stages: WorkflowStage[];
  is_active: boolean;
  created_at: string;
  created_by: string;
  updated_at?: string;
}

export { type Settings };