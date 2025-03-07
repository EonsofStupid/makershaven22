
export * from './stage';
export * from './template';
export * from './types';

import { Json } from '../core/json';
import { WorkflowStageType } from '../core/enums';

export interface WorkflowStageValidationRule {
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

export interface WorkflowStep {
  id: string;
  name: string;
  type: WorkflowStageType;
  order: number;
  config: WorkflowStageConfig;
  description?: string;
  validationRules?: WorkflowStageValidationRule[];
}

export const parseWorkflowSteps = (data: Json): WorkflowStep[] => {
  if (!Array.isArray(data)) return [];

  return data.map((item: any) => ({
    id: item.id || crypto.randomUUID(),
    name: item.name || '',
    type: item.type || 'task',
    order: item.order || 0,
    config: item.config || {},
    description: item.description || '',
    validationRules: item.validationRules || []
  }));
};

export const serializeWorkflowSteps = (steps: WorkflowStep[]): Json => {
  return JSON.parse(JSON.stringify(steps)) as Json;
};
