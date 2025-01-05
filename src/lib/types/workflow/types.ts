import { Json } from "../core/json";
import { UserOwnedEntity } from "../core/json";

export interface WorkflowStage {
  id: string;
  name: string;
  type: string;
  order: number;
  config: Record<string, any>;
  description?: string;
}

export interface WorkflowTemplate extends UserOwnedEntity {
  name: string;
  description?: string;
  stages: WorkflowStage[];
  is_active?: boolean;
  created_at: string;
}

export const serializeWorkflowStage = (stage: WorkflowStage): Json => {
  return {
    id: stage.id,
    name: stage.name,
    type: stage.type,
    order: stage.order,
    config: stage.config,
    description: stage.description
  } as unknown as Json;
};

export const serializeWorkflowTemplate = (template: WorkflowTemplate): Json => {
  return {
    ...template,
    stages: template.stages.map(serializeWorkflowStage)
  } as unknown as Json;
};