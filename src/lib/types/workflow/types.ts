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
  steps: Json;
  triggers?: Json;
  is_active: boolean;
  created_by?: string;
  created_at?: string;
  updated_at?: string;
}

export interface WorkflowFormData {
  name: string;
  description?: string;
  stages: WorkflowStage[];
  is_active?: boolean;
  steps: Json;
  triggers?: Json;
}

export const serializeWorkflowTemplate = (template: WorkflowTemplate): Json => ({
  id: template.id,
  name: template.name,
  description: template.description,
  stages: template.stages,
  steps: template.steps,
  triggers: template.triggers,
  is_active: template.is_active,
  created_by: template.created_by,
  created_at: template.created_at,
  updated_at: template.updated_at
});