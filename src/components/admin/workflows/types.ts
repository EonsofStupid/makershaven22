import type { Json } from '@/integrations/supabase/types/base';

export enum WorkflowStageType {
  APPROVAL = 'approval',
  REVIEW = 'review',
  TASK = 'task',
  NOTIFICATION = 'notification'
}

export interface WorkflowStage {
  id: string;
  name: string;
  type: WorkflowStageType;
  order: number;
  config: Record<string, any>;
  description?: string;
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
  steps: Json;
}

export interface WorkflowFormData {
  name: string;
  description: string;
  stages: WorkflowStage[];
  is_active: boolean;
}

export type StageUpdateFunction = (stageId: string, updates: Partial<WorkflowStage>) => void;

export interface StageConfigUpdateProps {
  stage: WorkflowStage;
  onUpdate: (updates: Partial<WorkflowStage>) => void;
}

export const validateStage = (stage: WorkflowStage): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (!stage.name.trim()) errors.push('Stage name is required');
  if (!stage.type) errors.push('Stage type is required');
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

export const isValidStageUpdate = (update: Partial<WorkflowStage>): boolean => {
  if (update.name !== undefined && !update.name.trim()) return false;
  if (update.type !== undefined && !Object.values(WorkflowStageType).includes(update.type)) return false;
  return true;
};

export const createStageUpdate = (stageId: string, updates: Partial<WorkflowStage>): Partial<WorkflowStage> => {
  return { ...updates };
};

export const serializeStages = (stages: WorkflowStage[]): Json => {
  return JSON.stringify(stages) as Json;
};

export const parseStages = (stepsJson: Json): WorkflowStage[] => {
  try {
    if (typeof stepsJson === 'string') {
      const parsed = JSON.parse(stepsJson);
      if (Array.isArray(parsed)) {
        return parsed.map(stage => ({
          id: stage.id,
          name: stage.name,
          type: stage.type,
          order: stage.order,
          config: stage.config,
          description: stage.description
        }));
      }
    }
    return [];
  } catch {
    return [];
  }
};