import { Json } from './base';
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

export const parseWorkflowStages = (data: Json[]): WorkflowStage[] => {
  if (!Array.isArray(data)) return [];
  
  return data.map(stage => ({
    id: typeof stage === 'object' && stage !== null ? String(stage.id || crypto.randomUUID()) : crypto.randomUUID(),
    name: typeof stage === 'object' && stage !== null ? String(stage.name || '') : '',
    type: typeof stage === 'object' && stage !== null ? (stage.type as WorkflowStageType || 'TASK') : 'TASK',
    order: typeof stage === 'object' && stage !== null ? Number(stage.order || 0) : 0,
    config: typeof stage === 'object' && stage !== null ? (stage.config as Record<string, any> || {}) : {},
    description: typeof stage === 'object' && stage !== null ? String(stage.description || '') : undefined
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