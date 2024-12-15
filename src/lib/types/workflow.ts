import type { Json } from '@/integrations/supabase/types';

export type WorkflowStageType = 'approval' | 'review' | 'task' | 'notification' | 'conditional';

export interface WorkflowStage {
  id: string;
  type: WorkflowStageType;
  name: string;
  description?: string;
  config: WorkflowStageConfig;
  order: number;
  dependencies?: string[];
}

export interface WorkflowStageConfig {
  approvers?: string[];
  reviewers?: string[];
  assignees?: string[];
  dueDate?: string;
  priority?: 'low' | 'medium' | 'high';
  notificationTemplate?: string;
  conditions?: WorkflowCondition[];
}

export interface WorkflowCondition {
  field: string;
  operator: 'equals' | 'not_equals' | 'contains' | 'not_contains';
  value: string | number | boolean;
}

export interface WorkflowTemplate {
  id: string;
  name: string;
  description?: string;
  stages: WorkflowStage[];
  is_active: boolean;
  created_by?: string;
  created_at?: string;
  updated_at?: string;
}