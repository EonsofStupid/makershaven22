import type { Json } from '../base';
import type { Profile } from '../auth/types';

export interface WorkflowTemplate {
  id: string;
  name: string;
  description?: string;
  steps: Json; // Raw database storage
  stages?: WorkflowStage[]; // Runtime transformed data
  is_active: boolean;
  created_by?: string;
  created_at?: string;
  updated_at?: string;
  profile?: Profile;
}

export interface WorkflowStage {
  id: string;
  name: string;
  type: WorkflowStageType;
  order: number;
  config: WorkflowStageConfig;
  description?: string;
}

export type WorkflowStageType = 'APPROVAL' | 'REVIEW' | 'TASK' | 'NOTIFICATION' | 'CONDITIONAL';

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

// Type guard for workflow stage
export const isWorkflowStage = (value: unknown): value is WorkflowStage => {
  if (!value || typeof value !== 'object') return false;
  const stage = value as WorkflowStage;
  return (
    typeof stage.id === 'string' &&
    typeof stage.name === 'string' &&
    typeof stage.type === 'string' &&
    typeof stage.order === 'number' &&
    typeof stage.config === 'object'
  );
};

// Type guard for workflow template
export const isWorkflowTemplate = (value: unknown): value is WorkflowTemplate => {
  if (!value || typeof value !== 'object') return false;
  const template = value as WorkflowTemplate;
  return (
    typeof template.id === 'string' &&
    typeof template.name === 'string' &&
    typeof template.is_active === 'boolean'
  );
};