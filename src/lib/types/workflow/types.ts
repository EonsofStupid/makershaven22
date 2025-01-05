import { Json } from '../core/json';

export interface WorkflowTemplate {
  id: string;
  name: string;
  description?: string;
  stages: WorkflowStage[];
  steps: Json;
  triggers?: Json;
  created_at: string;
  updated_at: string;
  created_by: string;
  updated_by?: string;
  is_active: boolean;
  email?: string;
}

export interface WorkflowStage {
  id: string;
  name: string;
  type: string;
  order: number;
  config: Json;
  description?: string;
}

export type WorkflowFormData = Omit<WorkflowTemplate, 'id' | 'created_at' | 'updated_at'>;