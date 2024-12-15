import type { Json } from '@/integrations/supabase/types/base';

export enum WorkflowStageType {
  APPROVAL = 'APPROVAL',
  REVIEW = 'REVIEW',
  TASK = 'TASK',
  NOTIFICATION = 'NOTIFICATION',
  CONDITIONAL = 'CONDITIONAL'
}

export interface WorkflowStageConfig {
  timeLimit?: number;
  requiredApprovers?: number;
  autoAssignment?: {
    type: 'user' | 'role' | 'group';
    value: string;
  };
  notifications?: {
    onStart?: boolean;
    onComplete?: boolean;
    reminderInterval?: number;
  };
  customFields?: Array<{
    name: string;
    type: 'text' | 'number' | 'date' | 'select';
    required: boolean;
  }>;
}

export interface WorkflowStage {
  id: string;
  name: string;
  type: WorkflowStageType;
  order: number;
  config: WorkflowStageConfig;
  description?: string;
}

export interface WorkflowTemplate {
  id: string;
  name: string;
  description?: string;
  stages: WorkflowStage[];
  steps: Json;
  is_active: boolean;
  created_by?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Workflow extends WorkflowTemplate {
  triggers?: Json;
}