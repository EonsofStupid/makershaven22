import { Json } from '../json';
import { WorkflowStageType } from './enums';

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
  steps: WorkflowStage[];
  stages: WorkflowStage[];
  is_active: boolean;
  created_by?: string;
  created_at?: string;
  updated_at?: string;
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

export const serializeWorkflowStage = (stage: WorkflowStage): Json => {
  return {
    id: stage.id,
    name: stage.name,
    type: stage.type,
    order: stage.order,
    config: stage.config,
    description: stage.description
  } as unknown as Json;
};