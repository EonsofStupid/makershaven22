import { Json } from '@/integrations/supabase/types';

export type WorkflowStageType = 'approval' | 'review' | 'task' | 'notification' | 'conditional';

export interface WorkflowStage {
  id: string;
  name: string;
  type: WorkflowStageType;
  order: number;
  config: Record<string, any>;
  description?: string;
}

export interface WorkflowTemplate {
  id: string;
  name: string;
  description?: string;
  stages: WorkflowStage[];
  is_active: boolean;
  created_by?: string;
  created_at?: string;
  updated_at?: string;
}

export interface WorkflowStageConfig {
  title: string;
  description?: string;
  assignees?: string[];
  dueDate?: string;
  notifyUsers?: string[];
  conditions?: Record<string, any>;
}

export type StageUpdateFunction = (stage: WorkflowStage) => void;

export const validateStage = (stage: WorkflowStage): boolean => {
  return !!(stage.id && stage.name && stage.type);
};

export const isValidStageUpdate = (stage: WorkflowStage): boolean => {
  return validateStage(stage);
};

export const createStageUpdate = (stage: Partial<WorkflowStage>): WorkflowStage => {
  return {
    id: stage.id || crypto.randomUUID(),
    name: stage.name || '',
    type: stage.type || 'task',
    order: stage.order || 0,
    config: stage.config || {},
    description: stage.description
  };
};

export const serializeStages = (stages: WorkflowStage[]): Json => {
  return stages as unknown as Json;
};