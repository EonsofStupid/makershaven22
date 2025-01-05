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
  created_at: string;
  created_by: string;
  updated_at?: string;
  is_active: boolean;
  email?: string;
}

export interface WorkflowFormData extends Omit<WorkflowTemplate, 'id' | 'created_at' | 'updated_at'> {
  id?: string;
}

export const serializeWorkflowStage = (stage: WorkflowStage): Json => {
  return stage as unknown as Json;
};

export const serializeWorkflowTemplate = (template: WorkflowTemplate): Json => {
  return {
    ...template,
    stages: template.stages.map(stage => serializeWorkflowStage(stage))
  } as unknown as Json;
};