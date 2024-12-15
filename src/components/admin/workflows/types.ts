import { Json } from '@/integrations/supabase/types';

export type WorkflowStageType = 'approval' | 'review' | 'task' | 'notification' | 'conditional';

export interface WorkflowStage {
  id: string;
  name: string;
  description?: string;
  type: WorkflowStageType;
  order: number;
  config: Record<string, any>;
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

export interface WorkflowFormData {
  name: string;
  description?: string;
  stages: WorkflowStage[];
  is_active: boolean;
}

export interface StageConfigUpdateProps {
  stage: WorkflowStage;
  onUpdate: (updates: Partial<WorkflowStage>) => void;
}

export const validateStage = (stage: WorkflowStage) => {
  const errors: string[] = [];
  
  if (!stage.name.trim()) {
    errors.push('Stage name is required');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

export const isValidStageUpdate = (update: Partial<WorkflowStage>) => {
  return true; // Add validation logic as needed
};

export const createStageUpdate = (id: string, updates: Partial<WorkflowStage>) => {
  return updates;
};