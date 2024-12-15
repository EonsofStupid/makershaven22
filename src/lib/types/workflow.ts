import type { Json } from '@/integrations/supabase/types';

export enum WorkflowStageType {
  APPROVAL = 'approval',
  REVIEW = 'review',
  TASK = 'task',
  NOTIFICATION = 'notification',
  CONDITIONAL = 'conditional'
}

export interface WorkflowStage {
  id: string;
  name: string;
  type: WorkflowStageType;
  order: number;
  config: Record<string, any>;
  description?: string;
}

export interface WorkflowTemplate {
  id?: string;
  name: string;
  description: string | null;
  stages: WorkflowStage[];
  is_active: boolean;
  created_at?: string;
  created_by?: string;
  updated_at?: string;
  steps: Json;
}

export interface WorkflowFormData {
  name: string;
  description: string;
  stages: WorkflowStage[];
  is_active: boolean;
}

export interface WorkflowStageConfig {
  title?: string;
  description?: string;
  assignees?: string[];
  dueDate?: string;
  priority?: 'low' | 'medium' | 'high';
  notifications?: {
    type: string;
    template: string;
    recipients: string[];
  }[];
  conditions?: {
    field: string;
    operator: string;
    value: any;
  }[];
}