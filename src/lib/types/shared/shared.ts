export * from '../auth/types';
export * from '../settings/types';
export * from '../core/json';

// Content Types
export interface CmsContent {
  id: string;
  title: string;
  content: string;
  status: 'draft' | 'published' | 'archived';
  created_at: string;
  updated_at: string;
  created_by: string;
  author_id: string;
  metadata?: Record<string, any>;
  type: 'page' | 'component' | 'template' | 'workflow';
  version?: number;
}

// Workflow Types
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

// Revision Types
export interface RevisionStore {
  revisions: any[];
  selectedRevision: string | null;
  compareRevision: string | null;
  diffMode: 'unified' | 'split';
  selectedVersions: string[];
}