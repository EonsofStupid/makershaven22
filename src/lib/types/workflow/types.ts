import { Json } from "../core/json";

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
  created_at: string;
  updated_at: string;
  created_by: string;
  is_active: boolean;
  email?: string;
}

export type WorkflowFormData = Omit<WorkflowTemplate, 'id' | 'created_at' | 'updated_at'>;

export const serializeWorkflowStage = (stage: WorkflowStage): Json => ({
  id: stage.id,
  name: stage.name,
  type: stage.type,
  order: stage.order,
  config: stage.config,
  description: stage.description
});

export const serializeWorkflowTemplate = (template: WorkflowTemplate): Json => ({
  ...template,
  stages: template.stages.map(serializeWorkflowStage)
});