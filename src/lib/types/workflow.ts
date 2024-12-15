import type { Json } from '@/integrations/supabase/types';

export type WorkflowStageType = 'approval' | 'review' | 'task' | 'notification' | 'conditional';

export interface WorkflowStageConfig {
  type: WorkflowStageType;
  title: string;
  description?: string;
  assignees?: string[];
  dueDate?: string;
  metadata?: Record<string, any>;
}

export interface WorkflowStage extends WorkflowStageConfig {
  id: string;
  order: number;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  created_at: string;
  updated_at?: string;
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

export interface Workflow extends WorkflowTemplate {
  instance_id: string;
  current_stage: number;
  status: 'active' | 'completed' | 'cancelled';
  started_at: string;
  completed_at?: string;
}