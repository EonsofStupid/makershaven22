import { Json } from './json';
import { WorkflowStageType } from './enums';

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
  is_active: boolean;
  created_by?: string;
  created_at?: string;
  updated_at?: string;
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

export const parseStages = (data: Json[]): WorkflowStage[] => {
  if (!Array.isArray(data)) return [];
  
  return data.map(stage => ({
    id: stage.id?.toString() || crypto.randomUUID(),
    name: stage.name?.toString() || '',
    type: (stage.type as WorkflowStageType) || 'TASK',
    order: Number(stage.order) || 0,
    config: stage.config as WorkflowStageConfig || {},
    description: stage.description?.toString()
  }));
};

export const serializeWorkflowTemplate = (template: WorkflowTemplate): Json => {
  return template as unknown as Json;
};