import type { Json } from '@/integrations/supabase/types';

export type WorkflowStageType = 'approval' | 'review' | 'task' | 'notification' | 'conditional';

export interface WorkflowStage {
  id: string;
  name: string;
  type: WorkflowStageType;
  order: number;
  config: WorkflowStageConfig;
  description?: string;
}

export interface WorkflowStageConfig {
  timeLimit?: number;
  autoAssignment?: {
    type: 'user' | 'role' | 'group';
    value: string;
  };
  notifications?: {
    onStart?: boolean;
    onComplete?: boolean;
    reminderInterval?: number;
  };
  customFields?: Array<{
    name: string;
    type: 'text' | 'number' | 'date' | 'select';
    required?: boolean;
  }>;
}

export interface WorkflowTemplate {
  id?: string;
  name: string;
  description: string | null;
  stages: WorkflowStage[];
  is_active: boolean;
  created_at?: string;
  created_by?: string;
  updated_at?: string;
}

export interface WorkflowFormData {
  name: string;
  description: string;
  stages: WorkflowStage[];
  is_active: boolean;
}

export interface StageConfigUpdateProps {
  stage: WorkflowStage;
  onUpdate: StageUpdateFunction;
}

export type StageUpdateFunction = (stageId: string, updates: Partial<WorkflowStage>) => void;

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export const validateStage = (stage: WorkflowStage): ValidationResult => {
  const errors: string[] = [];
  
  if (!stage.id) errors.push('Stage ID is required');
  if (!stage.name.trim()) errors.push('Stage name is required');
  if (!stage.type) errors.push('Stage type is required');
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

export const isValidStageUpdate = (update: Partial<WorkflowStage>): boolean => {
  if (update.name !== undefined && !update.name.trim()) return false;
  if (update.type !== undefined && !update.type) return false;
  return true;
};

export const createStageUpdate = (
  stageId: string, 
  updates: Partial<WorkflowStage>
): Partial<WorkflowStage> => {
  return {
    ...updates,
    id: stageId
  };
};

export const serializeStages = (stages: WorkflowStage[]): Json => {
  return stages as unknown as Json;
};

export const parseStages = (stepsJson: Json): WorkflowStage[] => {
  if (!Array.isArray(stepsJson)) return [];
  return stepsJson.map(step => ({
    id: step.id || crypto.randomUUID(),
    name: step.name || '',
    type: step.type || 'task',
    order: step.order || 0,
    config: step.config || {},
    description: step.description
  }));
};