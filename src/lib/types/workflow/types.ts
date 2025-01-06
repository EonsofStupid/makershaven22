import { Json } from '../core/json';

export interface WorkflowStage {
  id: string;
  name: string;
  type: string;
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
  created_at: string;
  created_by: string;
  updated_at?: string;
}

export interface WorkflowFormData {
  name: string;
  description?: string;
  stages: WorkflowStage[];
  is_active?: boolean;
}

export const serializeWorkflowStage = (stage: WorkflowStage): Json => ({
  id: stage.id,
  name: stage.name,
  type: stage.type,
  order: stage.order,
  config: stage.config,
  description: stage.description
});