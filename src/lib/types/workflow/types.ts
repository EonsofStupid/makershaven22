import { Json } from "../core/json";

export interface WorkflowStage {
  id: string;
  name: string;
  type: WorkflowStageType;
  order: number;
  config: WorkflowStageConfig;
  description?: string;
}

export type WorkflowStageType = 'APPROVAL' | 'REVIEW' | 'TASK' | 'NOTIFICATION' | 'CONDITIONAL';

export interface WorkflowStageConfig {
  [key: string]: Json;
}

export interface WorkflowTemplate {
  id: string;
  name: string;
  description?: string;
  stages: WorkflowStage[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
  created_by: string;
  email?: string;
  steps: Json;
  triggers?: Json;
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