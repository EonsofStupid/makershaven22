import { Json } from './json';
import { WorkflowStageType } from './enums';
import { BaseEntity, UserOwnedEntity } from './base';

export interface WorkflowStage {
  id: string;
  name: string;
  type: WorkflowStageType;
  order: number;
  config: Record<string, any>;
  description?: string;
}

export interface WorkflowTemplate extends UserOwnedEntity {
  name: string;
  description?: string;
  steps: WorkflowStage[];
  is_active?: boolean;
}

export interface WorkflowStageConfig {
  approvers?: string[];
  reviewers?: string[];
  assignees?: string[];
  dueDate?: string;
  priority?: 'low' | 'medium' | 'high';
  notifications?: {
    channels: ('email' | 'in_app')[];
    message?: string;
  };
  conditions?: {
    field: string;
    operator: 'equals' | 'not_equals' | 'contains' | 'not_contains';
    value: any;
  }[];
}

export const parseWorkflowStages = (data: any[]): WorkflowStage[] => {
  if (!Array.isArray(data)) return [];
  
  return data.map(stage => ({
    id: stage.id || crypto.randomUUID(),
    name: stage.name || '',
    type: stage.type || 'TASK',
    order: stage.order || 0,
    config: stage.config || {},
    description: stage.description
  }));
};

export const serializeWorkflowStages = (stages: WorkflowStage[]): Json => {
  return stages.map(stage => ({
    ...stage,
    id: stage.id.toString(),
    type: stage.type.toString(),
    order: Number(stage.order),
    config: stage.config || {}
  }));
};