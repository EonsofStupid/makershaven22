import { Json } from '../base/json';
import { WorkflowStage, parseWorkflowStage } from './stage';

export interface WorkflowTemplate {
  id: string;
  name: string;
  description?: string;
  steps: WorkflowStage[];
  stages: WorkflowStage[];
  is_active: boolean;
  created_by?: string;
  created_at?: string;
  updated_at?: string;
}

export const parseWorkflowTemplate = (data: Json): WorkflowTemplate => {
  if (!data || typeof data !== 'object') {
    throw new Error('Invalid workflow template data');
  }

  const template = data as Record<string, unknown>;
  
  return {
    id: String(template.id || ''),
    name: String(template.name || ''),
    description: template.description ? String(template.description) : undefined,
    steps: Array.isArray(template.steps) ? template.steps.map(parseWorkflowStage) : [],
    stages: Array.isArray(template.stages) ? template.stages.map(parseWorkflowStage) : [],
    is_active: Boolean(template.is_active),
    created_by: template.created_by ? String(template.created_by) : undefined,
    created_at: template.created_at ? String(template.created_at) : undefined,
    updated_at: template.updated_at ? String(template.updated_at) : undefined
  };
};

export const serializeWorkflowTemplate = (template: WorkflowTemplate): Json => {
  return {
    ...template,
    stages: template.stages.map(stage => ({
      ...stage,
      id: stage.id.toString(),
      type: stage.type.toString(),
      order: Number(stage.order),
      config: stage.config || {}
    }))
  };
};