import { Json } from '../base';
import { WorkflowStageType } from '../core/enums';
import { BaseEntity, UserOwnedEntity } from '../base';

export interface WorkflowStage {
  id: string;
  name: string;
  type: WorkflowStageType;
  order: number;
  config: WorkflowStageConfig;
  description?: string;
}

export interface WorkflowTemplate extends UserOwnedEntity {
  name: string;
  description?: string;
  steps: WorkflowStage[];
  is_active: boolean;
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
    id: typeof stage === 'object' && stage !== null ? String(stage.id || crypto.randomUUID()) : crypto.randomUUID(),
    name: typeof stage === 'object' && stage !== null ? String(stage.name || '') : '',
    type: typeof stage === 'object' && stage !== null ? (stage.type as WorkflowStageType || 'TASK') : 'TASK',
    order: typeof stage === 'object' && stage !== null ? Number(stage.order || 0) : 0,
    config: typeof stage === 'object' && stage !== null ? (stage.config as WorkflowStageConfig || {}) : {},
    description: typeof stage === 'object' && stage !== null ? String(stage.description || '') : undefined
  }));
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