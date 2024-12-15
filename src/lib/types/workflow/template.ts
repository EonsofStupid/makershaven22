import { BaseEntity, UserOwned } from '../base/entity';
import { WorkflowStage } from './stage';

export interface WorkflowTemplate extends BaseEntity, UserOwned {
  name: string;
  description?: string;
  stages: WorkflowStage[];
  is_active: boolean;
}

export interface WorkflowFormData {
  name: string;
  description: string;
  stages: WorkflowStage[];
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

export const serializeStages = (stages: WorkflowStage[]) => {
  return JSON.stringify(stages);
};

export const parseStages = (stagesJson: string): WorkflowStage[] => {
  try {
    return JSON.parse(stagesJson);
  } catch {
    return [];
  }
};