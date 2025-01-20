import { Json } from '../core/json';

export type WorkflowStageType = 'approval' | 'review' | 'task' | 'notification' | 'conditional';

export interface WorkflowStep {
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
  steps: WorkflowStep[];
  stages?: WorkflowStep[];
  is_active: boolean;
  created_at?: string;
  created_by?: string;
  updated_at?: string;
}

export interface WorkflowFormData {
  name: string;
  description?: string;
  steps: WorkflowStep[];
  stages?: WorkflowStep[];
  is_active?: boolean;
}