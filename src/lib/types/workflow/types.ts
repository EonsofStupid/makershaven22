import { Json } from "../base/json";

export interface WorkflowStage {
  id: string;
  name: string;
  type: string;
  order: number;
  config: Json;
  description?: string;
}

export interface WorkflowTemplate {
  id: string;
  name: string;
  description: string;
  stages: WorkflowStage[];
  is_active: boolean;
  created_by: string;
  updated_at?: string;
}

export interface WorkflowFormData {
  name: string;
  description: string;
  stages: WorkflowStage[];
  is_active: boolean;
}

export type WorkflowStageType = 'APPROVAL' | 'REVIEW' | 'TASK' | 'NOTIFICATION' | 'CONDITIONAL';
export type WorkflowState = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED';

export const serializeWorkflowStage = (stage: WorkflowStage): Json => ({
  id: stage.id,
  name: stage.name,
  type: stage.type,
  order: stage.order,
  config: stage.config,
  description: stage.description
});

export const parseWorkflowStage = (json: Json): WorkflowStage => ({
  id: json.id as string,
  name: json.name as string,
  type: json.type as string,
  order: json.order as number,
  config: json.config as Json,
  description: json.description as string
});