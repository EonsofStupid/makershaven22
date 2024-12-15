import { BaseEntity, UserOwned, Json } from './base';

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
  config: WorkflowStageConfig;
  description?: string;
}

export interface WorkflowTemplate extends BaseEntity, UserOwned {
  name: string;
  description: string | null;
  stages: WorkflowStage[];
  is_active: boolean;
  steps: Json;
}

export interface WorkflowStageConfig {
  title?: string;
  description?: string;
  assignees?: string[];
  dueDate?: string;
  priority?: 'low' | 'medium' | 'high';
  notifications?: {
    onStart?: boolean;
    onComplete?: boolean;
    reminderInterval?: number;
  };
  conditions?: Array<{
    field: string;
    operator: string;
    value: any;
  }>;
  autoAssignment?: {
    type: 'user' | 'role' | 'group';
    value: string;
  };
  timeLimit?: number;
  requiredApprovers?: number;
  customFields?: Array<{
    name: string;
    type: 'text' | 'number' | 'date' | 'select';
    required: boolean;
  }>;
}