import { BaseEntity, UserOwnedEntity } from '../core/base';
import { Json } from '../core/json';

export type WorkflowStageType = 'APPROVAL' | 'REVIEW' | 'TASK' | 'NOTIFICATION' | 'CONDITIONAL';

export interface WorkflowTemplate extends UserOwnedEntity {
  name: string;
  description?: string;
  stages: WorkflowStage[];
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

export interface WorkflowFormData {
  id?: string;
  name: string;
  description?: string;
  stages: WorkflowStage[];
  is_active?: boolean;
}

export interface WorkflowState {
  workflows: WorkflowTemplate[];
  activeWorkflow: WorkflowTemplate | null;
  isLoading: boolean;
  error: Error | null;
  initialize: () => Promise<void>;
  setActiveWorkflow: (workflow: WorkflowTemplate | null) => void;
  handleWorkflowUpdate: (workflow: WorkflowTemplate) => Promise<void>;
  setError: (error: Error | null) => void;
}

export const parseWorkflowStages = (data: Json[]): WorkflowStage[] => {
  if (!Array.isArray(data)) return [];
  
  return data.map(stage => ({
    id: String(stage.id || crypto.randomUUID()),
    name: String(stage.name || ''),
    type: (stage.type as WorkflowStageType) || 'TASK',
    order: Number(stage.order || 0),
    config: stage.config as WorkflowStageConfig || {},
    description: stage.description ? String(stage.description) : undefined
  }));
};

export const serializeWorkflowStages = (stages: WorkflowStage[]): Json => {
  return stages.map(stage => ({
    ...stage,
    id: stage.id.toString(),
    type: stage.type.toString(),
    order: Number(stage.order),
    config: stage.config || {}
  })) as unknown as Json;
};