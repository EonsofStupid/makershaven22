import { Json } from '../core/json';
import type { WorkflowStageType } from '../core/enums';

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
  is_active?: boolean;
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

export const parseWorkflowStages = (data: Json[]): WorkflowStage[] => {
  if (!Array.isArray(data)) return [];
  
  return data.map(stage => {
    if (typeof stage !== 'object' || !stage) {
      return {
        id: crypto.randomUUID(),
        name: '',
        type: 'TASK' as WorkflowStageType,
        order: 0,
        config: {},
      };
    }

    return {
      id: String(stage.id || crypto.randomUUID()),
      name: String(stage.name || ''),
      type: (stage.type as WorkflowStageType) || 'TASK',
      order: Number(stage.order || 0),
      config: stage.config as WorkflowStageConfig || {},
      description: stage.description ? String(stage.description) : undefined
    };
  });
};

export const serializeWorkflowTemplate = (template: WorkflowTemplate): Json => {
  return {
    ...template,
    stages: template.stages.map(stage => ({
      ...stage,
      id: stage.id.toString(),
      type: stage.type.toString(),
      order: Number(stage.order),
      config: stage.config || {}
    }))
  } as unknown as Json;
};