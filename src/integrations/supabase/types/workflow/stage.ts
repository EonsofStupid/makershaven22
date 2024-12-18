import { Json } from '../base/json';

export type WorkflowStageType = 'approval' | 'review' | 'task' | 'notification' | 'conditional';

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

export const parseWorkflowStage = (data: Json): WorkflowStage => {
  if (!data || typeof data !== 'object') {
    return {
      id: crypto.randomUUID(),
      name: '',
      type: 'task',
      order: 0,
      config: {},
    };
  }

  const stage = data as Record<string, unknown>;
  
  return {
    id: String(stage.id || crypto.randomUUID()),
    name: String(stage.name || ''),
    type: (stage.type as WorkflowStageType) || 'task',
    order: Number(stage.order || 0),
    config: stage.config as WorkflowStageConfig || {},
    description: stage.description ? String(stage.description) : undefined
  };
};