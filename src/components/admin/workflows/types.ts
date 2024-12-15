import { BaseEntity } from '@/lib/types/base';
import type { Json } from '@/integrations/supabase/types';

export interface WorkflowFormData {
  name: string;
  description: string;
  steps: WorkflowStage[];
  is_active?: boolean;
}

export interface WorkflowTemplate extends BaseEntity {
  name: string;
  description?: string;
  steps: Json;
  stages: WorkflowStage[];
  is_active: boolean;
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
  timeLimit?: number;
  customFields?: Array<{
    name: string;
    type: 'text' | 'number' | 'date' | 'select';
    required: boolean;
  }>;
  approvers?: string[];
  deadline?: string;
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
  requiredApprovers?: number;
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

export const parseStages = (steps: Json): WorkflowStage[] => {
  if (!steps || !Array.isArray(steps)) return [];
  return steps as WorkflowStage[];
};

export const serializeStages = (stages: WorkflowStage[]): Json => {
  return stages as unknown as Json;
};