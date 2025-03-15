
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
  id?: string;
  name: string;
  description?: string;
  stages?: WorkflowStage[];
  steps?: WorkflowStage[];
  is_active?: boolean;
}

/**
 * Safely serializes an array of workflow stages into a JSON format that can be stored in the database
 */
export const serializeWorkflowStages = (stages: WorkflowStage[]): Json => {
  return JSON.parse(JSON.stringify(stages)) as Json;
};

/**
 * Safely parses JSON data from the database into typed WorkflowStage objects
 */
export const parseWorkflowStages = (data: Json): WorkflowStage[] => {
  if (!Array.isArray(data)) return [];
  
  return data.map(stage => ({
    id: String(stage?.id || crypto.randomUUID()),
    name: String(stage?.name || ''),
    type: (stage?.type as WorkflowStageType) || 'task',
    order: Number(stage?.order || 0),
    config: stage?.config as WorkflowStageConfig || {},
    description: stage?.description ? String(stage.description) : undefined,
    validationRules: stage?.validationRules as StageValidationRule[] || []
  }));
};

/**
 * Validates a workflow stage for required fields and configuration
 */
export const validateWorkflowStage = (stage: WorkflowStage): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!stage.name.trim()) {
    errors.push('Stage name is required');
  }

  // Validation based on stage type
  switch (stage.type) {
    case 'approval':
      if (!stage.config.requiredApprovers || stage.config.requiredApprovers < 1) {
        errors.push('At least one approver is required for approval stages');
      }
      break;
    case 'review':
      if (!stage.config.autoAssignment?.value) {
        errors.push('Reviewer assignment is required for review stages');
      }
      break;
    // Add validation for other stage types as needed
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};
