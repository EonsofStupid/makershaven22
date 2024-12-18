import { Json, JsonObject } from "../core/json";
import { WorkflowStage, parseWorkflowStage, serializeWorkflowStage } from "./stage";

export interface WorkflowTemplate {
  id: string;
  name: string;
  description?: string;
  stages: WorkflowStage[];
  steps: WorkflowStage[];
  is_active?: boolean;
  created_by?: string;
  created_at?: string;
  updated_at?: string;
}

export const parseWorkflowTemplate = (json: Json): WorkflowTemplate => {
  if (!json || typeof json !== 'object') {
    throw new Error('Invalid workflow template data');
  }

  const obj = json as JsonObject;
  
  return {
    id: String(obj.id || ''),
    name: String(obj.name || ''),
    description: obj.description ? String(obj.description) : undefined,
    stages: Array.isArray(obj.stages) ? obj.stages.map(parseWorkflowStage) : [],
    steps: Array.isArray(obj.steps) ? obj.steps.map(parseWorkflowStage) : [],
    is_active: obj.is_active === true,
    created_by: obj.created_by ? String(obj.created_by) : undefined,
    created_at: obj.created_at ? String(obj.created_at) : undefined,
    updated_at: obj.updated_at ? String(obj.updated_at) : undefined
  };
};

export const serializeWorkflowTemplate = (template: WorkflowTemplate): JsonObject => {
  return {
    id: template.id,
    name: template.name,
    description: template.description,
    stages: template.stages.map(serializeWorkflowStage),
    steps: template.steps.map(serializeWorkflowStage),
    is_active: template.is_active,
    created_by: template.created_by,
    created_at: template.created_at,
    updated_at: template.updated_at
  };
};