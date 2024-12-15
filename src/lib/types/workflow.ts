import { BaseEntity } from './base';
import type { Json } from '@/integrations/supabase/types/base';

export interface WorkflowStage {
  id: string;
  type: WorkflowStageType;
  name: string;
  description?: string;
  config: WorkflowStageConfig;
  order: number;
}

export type WorkflowStageType = 'approval' | 'review' | 'task' | 'notification' | 'conditional';

export interface WorkflowStageConfig {
  timeLimit?: number;
  customFields?: Array<{
    name: string;
    type: 'text' | 'number' | 'date' | 'select';
    required: boolean;
  }>;
  approvers?: string[];
  deadline?: string;
  autoAssignment?: {
    type: 'user' | 'role' | 'group';
    value: string;
  };
  notifications?: {
    onStart?: boolean;
    onComplete?: boolean;
    reminderInterval?: number;
    type: string;
    recipients: string[];
    template: string;
  }[];
  requiredApprovers?: number;
}

export interface WorkflowTemplate extends BaseEntity {
  name: string;
  description?: string;
  steps: WorkflowStage[];
  is_active?: boolean;
  created_by?: string;
}

export interface WorkflowFormData {
  name: string;
  description: string;
  steps: WorkflowStage[];
  is_active?: boolean;
}