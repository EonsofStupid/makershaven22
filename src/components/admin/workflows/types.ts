import { Json } from '@supabase/supabase-js';

export interface WorkflowFormData {
  name: string;
  description: string;
  steps: WorkflowStage[];
}

export interface WorkflowTemplate {
  id: string;
  name: string;
  description?: string;
  steps: Json;
  stages: WorkflowStage[];
  is_active: boolean;
  created_by?: string;
  created_at?: string;
  updated_at?: string;
}

export interface WorkflowStage {
  id: string;
  type: WorkflowStageType;
  name: string;
  description?: string;
  config: WorkflowStageConfig;
  order: number;
}

export type WorkflowStageType = 'approval' | 'review' | 'task' | 'notification' | 'conditional';

export interface WorkflowStageConfig {
  approvers?: string[];
  deadline?: string;
  timeLimit?: number;
  autoAssignment?: {
    type: 'user' | 'role' | 'group';
    value: string;
  };
  notifications?: {
    onStart?: boolean;
    onComplete?: boolean;
    reminderInterval?: number;
    type: string;
    recipients: string[];
    template: string;
  }[];
  customFields?: Array<{
    name: string;
    type: 'text' | 'number' | 'date' | 'select';
    required: boolean;
  }>;
}

export interface StageConfigUpdateProps {
  stage: WorkflowStage;
  onUpdate: (updates: Partial<WorkflowStage>) => void;
}

export type StageUpdateFunction = (stageId: string, updates: Partial<WorkflowStage>) => void;

export const validateStage = (stage: WorkflowStage): { isValid: boolean; errors?: string[] } => {
  const errors: string[] = [];
  
  if (!stage.name?.trim()) {
    errors.push('Stage name is required');
  }
  
  if (!stage.type) {
    errors.push('Stage type is required');
  }

  return {
    isValid: errors.length === 0,
    errors: errors.length > 0 ? errors : undefined
  };
};

export const isValidStageUpdate = (update: Partial<WorkflowStage>): boolean => {
  if (update.name !== undefined && !update.name.trim()) {
    return false;
  }
  return true;
};

export const createStageUpdate = (stageId: string, updates: Partial<WorkflowStage>) => {
  return { id: stageId, ...updates };
};

export const parseWorkflowSteps = (steps: Json): WorkflowStage[] => {
  if (!steps || !Array.isArray(steps)) return [];
  return steps as WorkflowStage[];
};

export const serializeWorkflowSteps = (stages: WorkflowStage[]): Json => {
  return stages as unknown as Json;
};