import { Json } from '../core/json';

export type WorkflowStageType = 'approval' | 'review' | 'task' | 'notification' | 'conditional';

export interface StageValidationRule {
  field: string;
  type: 'required' | 'min' | 'max' | 'pattern' | 'custom';
  value?: any;
  message?: string;
}

export interface WorkflowStageConfig {
  timeLimit?: number;
  requiredApprovers?: number;
  customFields?: {
    name: string;
    type: 'text' | 'number' | 'date' | 'select';
    options?: string[];
    required?: boolean;
  }[];
  autoAssignment?: {
    type: 'user' | 'role' | 'group';
    value: string;
  };
  notifications?: {
    onStart?: boolean;
    onComplete?: boolean;
    reminderInterval?: number;
  };
}

export interface WorkflowStage {
  id: string;
  name: string;
  description?: string;
  type: WorkflowStageType;
  order: number;
  config: WorkflowStageConfig;
  validationRules?: StageValidationRule[];
}

export interface WorkflowTemplate {
  id?: string;
  name: string;
  description: string | null;
  stages: WorkflowStage[];
  steps: WorkflowStage[];
  is_active: boolean;
  created_at?: string;
  created_by?: string;
  updated_at?: string;
}

export interface WorkflowFormData {
  name: string;
  description: string;
  stages: WorkflowStage[];
  steps: WorkflowStage[];
  is_active: boolean;
}

export const serializeWorkflowStage = (stage: WorkflowStage): Json => {
  return JSON.parse(JSON.stringify(stage));
};

export const serializeWorkflowTemplate = (template: WorkflowTemplate): Json => {
  return JSON.parse(JSON.stringify(template));
};