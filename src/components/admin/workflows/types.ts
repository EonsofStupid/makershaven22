import { Json } from '@/integrations/supabase/types';

export type WorkflowStageType = 'approval' | 'review' | 'task' | 'notification' | 'conditional';

export interface WorkflowStage {
  id: string;
  name: string;
  type: WorkflowStageType;
  order: number;
  config: WorkflowStageConfig;
  description?: string;
}

export interface WorkflowFormData {
  name: string;
  description: string;
  stages: WorkflowStage[];
  is_active?: boolean;
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

export interface StageUpdateFunction {
  (stageId: string, updates: Partial<WorkflowStage>): void;
}

export interface StageConfigUpdateProps {
  stage: WorkflowStage;
  onUpdate: (updates: Partial<WorkflowStage>) => void;
}

export const createStageUpdate = (stageId: string, updates: Partial<WorkflowStage>) => {
  return updates;
};

export const isValidStageUpdate = (update: Partial<WorkflowStage>): boolean => {
  if (update.name !== undefined && !update.name.trim()) return false;
  if (update.type !== undefined && !['approval', 'review', 'task', 'notification', 'conditional'].includes(update.type)) return false;
  return true;
};

export const validateStage = (stage: WorkflowStage): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!stage.name.trim()) {
    errors.push('Stage name is required');
  }

  if (!stage.type) {
    errors.push('Stage type is required');
  }

  switch (stage.type) {
    case 'approval':
      if (!stage.config.requiredApprovers || stage.config.requiredApprovers < 1) {
        errors.push('At least one approver is required');
      }
      break;
    case 'task':
      if (stage.config.customFields?.some(field => !field.name)) {
        errors.push('All custom fields must have a name');
      }
      break;
    case 'conditional':
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

export const parseStages = (data: Json): WorkflowStage[] => {
  if (!Array.isArray(data)) return [];
  
  return data.map(stage => ({
    id: typeof stage === 'object' && stage !== null ? String(stage.id || crypto.randomUUID()) : crypto.randomUUID(),
    name: typeof stage === 'object' && stage !== null ? String(stage.name || '') : '',
    type: typeof stage === 'object' && stage !== null ? (stage.type as WorkflowStageType || 'task') : 'task',
    order: typeof stage === 'object' && stage !== null ? Number(stage.order || 0) : 0,
    config: typeof stage === 'object' && stage !== null ? (stage.config as WorkflowStageConfig || {}) : {},
    description: typeof stage === 'object' && stage !== null ? String(stage.description || '') : undefined
  }));
};

export const serializeWorkflowStages = (stages: WorkflowStage[]): Json => {
  return stages as unknown as Json;
};