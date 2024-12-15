import { BaseEntity, UserOwned, Json } from './base';

export type WorkflowStageType = 'APPROVAL' | 'REVIEW' | 'TASK' | 'NOTIFICATION' | 'CONDITIONAL';

export interface WorkflowStage {
  id: string;
  type: WorkflowStageType;
  name: string;
  description?: string;
  config: Json;
  order: number;
}

export interface WorkflowTemplate extends BaseEntity, UserOwned {
  name: string;
  description?: string;
  stages: WorkflowStage[];
  is_active: boolean;
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
}

export type StageUpdateFunction = (stage: WorkflowStage) => void;

export interface StageConfigUpdateProps {
  stage: WorkflowStage;
  onUpdate: StageUpdateFunction;
}

export const validateStage = (stage: WorkflowStage) => {
  const errors: string[] = [];
  if (!stage.name.trim()) {
    errors.push('Stage name is required');
  }
  if (!stage.type) {
    errors.push('Stage type is required');
  }
  return {
    isValid: errors.length === 0,
    errors
  };
};

export const isValidStageUpdate = (stage: Partial<WorkflowStage>): boolean => {
  return true; // Add validation logic as needed
};

export const createStageUpdate = (id: string, updates: Partial<WorkflowStage>): Partial<WorkflowStage> => {
  return { id, ...updates };
};