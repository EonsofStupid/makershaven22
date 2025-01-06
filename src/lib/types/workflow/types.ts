import { Json } from '../core/json';

export interface WorkflowStage {
  id: string;
  name: string;
  type: WorkflowStageType;
  order: number;
  config: WorkflowStageConfig;
  description?: string;
}

export type WorkflowStageType = 'APPROVAL' | 'TASK' | 'CONDITIONAL';

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

export interface WorkflowTemplate {
  id: string;
  name: string;
  description: string | null;
  stages: WorkflowStage[];
  is_active: boolean;
  created_by?: string;
  created_at?: string;
  updated_at?: string;
}

export interface WorkflowFormData extends Omit<WorkflowTemplate, 'id' | 'created_at' | 'updated_at'> {
  id?: string;
}

export const serializeWorkflowStage = (stage: WorkflowStage): Json => {
  return stage as unknown as Json;
};

export const serializeWorkflowTemplate = (template: WorkflowTemplate): Json => {
  return {
    ...template,
    stages: template.stages.map(stage => serializeWorkflowStage(stage))
  } as unknown as Json;
};