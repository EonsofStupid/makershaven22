import { Json, JsonObject, isJsonObject } from "../core/json";

export type WorkflowStageType = 'APPROVAL' | 'REVIEW' | 'TASK' | 'NOTIFICATION' | 'CONDITIONAL';

export interface WorkflowStage {
  id: string;
  name: string;
  type: WorkflowStageType;
  order: number;
  config: Record<string, any>;
  description?: string;
}

export const parseWorkflowStage = (json: Json): WorkflowStage => {
  if (!isJsonObject(json)) {
    return {
      id: crypto.randomUUID(),
      name: '',
      type: 'TASK',
      order: 0,
      config: {},
    };
  }

  return {
    id: String(json.id || crypto.randomUUID()),
    name: String(json.name || ''),
    type: (json.type as WorkflowStageType) || 'TASK',
    order: Number(json.order || 0),
    config: (json.config as Record<string, any>) || {},
    description: json.description ? String(json.description) : undefined
  };
};

export const serializeWorkflowStage = (stage: WorkflowStage): JsonObject => {
  return {
    id: stage.id,
    name: stage.name,
    type: stage.type,
    order: stage.order,
    config: stage.config,
    description: stage.description
  };
};