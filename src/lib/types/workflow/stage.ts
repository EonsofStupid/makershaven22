
import { Json } from '../core/json';
import { WorkflowStageType } from '../core/enums';

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

export const validateStage = (stage: WorkflowStage): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!stage.name.trim()) {
    errors.push('Stage name is required');
  }

  switch (stage.type) {
    case 'approval':
      if (!stage.config.requiredApprovers || stage.config.requiredApprovers < 1) {
        errors.push('At least one approver is required');
      }
      break;
    case 'review':
      if (!stage.config.autoAssignment?.value) {
        errors.push('Reviewer assignment is required');
      }
      break;
    case 'task':
      if (stage.config.customFields?.some(field => field.required && !field.name)) {
        errors.push('Required custom fields must have a name');
      }
      break;
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

export const serializeWorkflowStage = (stage: WorkflowStage): Json => {
  return JSON.parse(JSON.stringify(stage));
};

export const parseWorkflowStage = (data: Json): WorkflowStage => {
  if (!data) {
    return {
      id: crypto.randomUUID(),
      name: '',
      type: 'task',
      order: 0,
      config: {}
    };
  }

  const stage = data as any;
  return {
    id: stage.id || crypto.randomUUID(),
    name: stage.name || '',
    description: stage.description || '',
    type: stage.type || 'task',
    order: stage.order || 0,
    config: stage.config || {},
    validationRules: stage.validationRules || []
  };
};
