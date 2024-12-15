import type { Json } from '@/integrations/supabase/types';

export enum WorkflowStageType {
  APPROVAL = 'approval',
  REVIEW = 'review',
  TASK = 'task',
  NOTIFICATION = 'notification',
  CONDITIONAL = 'conditional'
}

export interface WorkflowStageConfig {
  type: WorkflowStageType;
  title: string;
  description?: string;
  assignees?: string[];
  dueDate?: string;
  metadata?: Record<string, any>;
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

export interface WorkflowStage extends WorkflowStageConfig {
  id: string;
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
  created_by: string;
  created_at: string;
  updated_at?: string;
  steps: Json;
}

export interface Workflow extends WorkflowTemplate {
  status: 'draft' | 'active' | 'completed' | 'archived';
  triggers?: Json;
}