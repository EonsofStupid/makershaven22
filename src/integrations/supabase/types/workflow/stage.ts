import { Json } from '../base/json';
import { WorkflowStageType } from '../enums';

export interface WorkflowStage {
  id: string;
  name: string;
  type: WorkflowStageType;
  order: number;
  config: WorkflowStageConfig;
  description?: string;
}

export interface WorkflowStageConfig {
  assignees?: string[];
  timeLimit?: number;
  autoAssignment?: {
    type: 'user' | 'role' | 'group';
    value: string;
  };
  priority?: 'low' | 'medium' | 'high';
  notifications?: {
    email?: boolean;
    inApp?: boolean;
    onStart?: boolean;
    onComplete?: boolean;
    reminderInterval?: number;
  };
  conditions?: {
    type: 'AND' | 'OR';
    rules: Array<{
      field: string;
      operator: string;
      value: any;
    }>;
  };
  requiredApprovers?: number;
  customFields?: Array<{
    name: string;
    type: 'text' | 'number' | 'date' | 'select';
    required: boolean;
    options?: string[];
  }>;
}

export const parseStage = (data: Json): WorkflowStage => {
  if (typeof data !== 'object' || !data) {
    throw new Error('Invalid stage data');
  }

  return {
    id: data.id as string || crypto.randomUUID(),
    name: data.name as string || '',
    type: (data.type as WorkflowStageType) || 'TASK',
    order: (data.order as number) || 0,
    config: (data.config as WorkflowStageConfig) || {},
    description: data.description as string
  };
};

export const serializeStage = (stage: WorkflowStage): Json => {
  return stage as unknown as Json;
};