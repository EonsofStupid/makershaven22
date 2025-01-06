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
  description: string | null;
  stages: WorkflowStage[];
  is_active: boolean;
  created_by?: string;
  created_at?: string;
  updated_at?: string;
}

export interface WorkflowFormData extends Omit<WorkflowTemplate, 'id' | 'created_at' | 'updated_at'> {
  id?: string;
}

export const serializeWorkflowStage = (stage: WorkflowStage): Json => ({
  id: stage.id,
  name: stage.name,
  type: stage.type,
  order: stage.order,
  config: stage.config,
  description: stage.description
});

export const serializeWorkflowTemplate = (template: WorkflowTemplate): Json => ({
  id: template.id,
  name: template.name,
  description: template.description,
  stages: template.stages.map(serializeWorkflowStage),
  is_active: template.is_active,
  created_by: template.created_by,
  created_at: template.created_at,
  updated_at: template.updated_at
});