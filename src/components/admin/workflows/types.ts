import type { Json } from '@/integrations/supabase/types';

export interface WorkflowStage {
  id: string;
  name: string;
  type: 'task' | 'approval' | 'notification' | 'review';
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

export interface WorkflowFormData {
  name: string;
  description?: string;
  stages: WorkflowStage[];
  is_active: boolean;
}

export type StageUpdateFunction = (stageId: string, updates: Partial<WorkflowStage>) => void;

export const parseWorkflowStages = (stepsJson: Json): WorkflowStage[] => {
  if (typeof stepsJson === 'string') {
    return JSON.parse(stepsJson);
  }
  return stepsJson as WorkflowStage[];
};