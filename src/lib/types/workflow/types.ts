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
  steps: Json;
  triggers?: Json;
  created_at: string;
  updated_at: string;
  created_by: string;
  updated_by?: string;
  is_active: boolean;
  email?: string;
}

export type WorkflowFormData = Omit<WorkflowTemplate, 'id' | 'created_at' | 'updated_at'>;

export const serializeWorkflowTemplate = (template: WorkflowTemplate): Json => {
  return {
    ...template,
    stages: template.stages.map(stage => ({
      ...stage,
      config: JSON.stringify(stage.config)
    }))
  };
};