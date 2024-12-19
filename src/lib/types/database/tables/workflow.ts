import { Json } from '../../core/json';

export type WorkflowStageType = 'approval' | 'review' | 'task' | 'notification' | 'conditional';

export interface WorkflowStage {
  id: string;
  type: WorkflowStageType;
  order: number;
  config: WorkflowStageConfig;
  name: string;
  description?: string;
}

export interface WorkflowStageConfig {
  [key: string]: Json;
}

export interface WorkflowFormData {
  id?: string;
  name: string;
  description?: string;
  stages: WorkflowStage[];
  is_active: boolean;
  created_by?: string;
  created_at?: string;
  updated_at?: string;
}

export interface StageConfigUpdateProps {
  stage: WorkflowStage;
  onUpdate: (updates: Partial<WorkflowStage>) => void;
}

export type StageUpdateFunction = (updates: Partial<WorkflowStage>) => void;

export const validateStage = (stage: WorkflowStage): boolean => {
  return !!(stage.id && stage.type && stage.name);
};