import { Json, UserOwnedEntity } from '../core/json';

export type WorkflowStageType = 'APPROVAL' | 'REVIEW' | 'TASK' | 'NOTIFICATION' | 'CONDITIONAL';

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

export interface WorkflowTemplate extends UserOwnedEntity {
  name: string;
  description?: string;
  stages: WorkflowStage[];
  steps: WorkflowStage[];
  is_active?: boolean;
  created_at: string;
  email?: string;
}

export interface WorkflowFormData {
  id?: string;
  name: string;
  description?: string;
  stages: WorkflowStage[];
  is_active?: boolean;
}

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

export const serializeWorkflowTemplate = (template: WorkflowTemplate): Json => {
  return {
    ...template,
    stages: template.stages.map(serializeWorkflowStage)
  } as unknown as Json;
};