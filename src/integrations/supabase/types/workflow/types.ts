import { Json } from '../core/json';
import { WorkflowStageType } from '../core/enums';
import type { Profile } from '../auth/types';

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
  profile?: Profile;
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

export const parseStages = (data: any[]): WorkflowStage[] => {
  if (!Array.isArray(data)) return [];
  
  return data.map(stage => ({
    id: stage.id?.toString() || crypto.randomUUID(),
    name: stage.name?.toString() || '',
    type: (stage.type as WorkflowStageType) || 'TASK',
    order: Number(stage.order) || 0,
    config: stage.config || {},
    description: stage.description?.toString()
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

export const serializeWorkflowStage = (stage: WorkflowStage): Json => {
  return {
    ...stage,
    id: stage.id.toString(),
    type: stage.type.toString(),
    order: Number(stage.order),
    config: stage.config || {}
  } as unknown as Json;
};