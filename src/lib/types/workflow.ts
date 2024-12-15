import type { Json } from '@/integrations/supabase/types';

export type WorkflowStageType = 'approval' | 'review' | 'task' | 'notification' | 'conditional';

export interface WorkflowStageConfig {
  type: WorkflowStageType;
  name: string;
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
  order: number;
  config: Record<string, any>;
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
  status: 'active' | 'completed' | 'cancelled';
  currentStage?: number;
  metadata?: Record<string, any>;
}