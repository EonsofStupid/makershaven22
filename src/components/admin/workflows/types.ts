import { BaseEntity } from '@/lib/types/base';
import { Json } from '@supabase/supabase-js';

export interface WorkflowTemplate extends BaseEntity {
  name: string;
  description?: string;
  stages: WorkflowStage[];
  is_active: boolean;
  created_by?: string;
}

export interface WorkflowStage {
  id: string;
  type: string;
  name: string;
  config: WorkflowStageConfig;
  order: number;
}

export interface WorkflowStageConfig {
  approvers?: string[];
  deadline?: string;
  description?: string;
  notifications?: {
    type: string;
    recipients: string[];
    template: string;
  }[];
  [key: string]: any;
}

export type StageUpdateFunction = (stageId: string, updates: Partial<WorkflowStage>) => void;

export const serializeStages = (stages: WorkflowStage[]): Json => {
  return stages as unknown as Json;
};

export const parseStages = (data: Json): WorkflowStage[] => {
  return (data as unknown as WorkflowStage[]) || [];
};

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