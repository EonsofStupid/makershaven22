import type { Json } from '../core/json';
import type { WorkflowStageType } from '../core/enums';

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

export const validateStage = (stage: WorkflowStage): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!stage.name.trim()) {
    errors.push('Stage name is required');
  }

  if (!stage.type) {
    errors.push('Stage type is required');
  }

  switch (stage.type) {
    case 'APPROVAL':
      if (!stage.config.requiredApprovers || stage.config.requiredApprovers < 1) {
        errors.push('At least one approver is required');
      }
      break;
    case 'TASK':
      if (stage.config.customFields?.some(field => !field.name)) {
        errors.push('All custom fields must have a name');
      }
      break;
    case 'CONDITIONAL':
      if (!stage.config.conditions?.rules?.length) {
        errors.push('Conditional stages must have at least one rule');
      }
      break;
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};