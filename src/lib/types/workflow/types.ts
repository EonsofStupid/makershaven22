import { Json } from '../core/json';
import { WorkflowStageType } from '../core/enums';
import { BaseEntity, UserOwnedEntity } from '../core/base';

export interface WorkflowTemplate extends UserOwnedEntity {
  name: string;
  description?: string;
  steps: WorkflowStage[];
  is_active?: boolean;
}

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

export const parseWorkflowStages = (data: Json[]): WorkflowStage[] => {
  if (!Array.isArray(data)) return [];
  
  return data.map(stage => {
    if (typeof stage !== 'object' || stage === null) {
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
    steps: template.steps.map(step => ({
      ...step,
      id: step.id.toString(),
      type: step.type.toString(),
      order: Number(step.order),
      config: step.config || {}
    }))
  } as unknown as Json;
};