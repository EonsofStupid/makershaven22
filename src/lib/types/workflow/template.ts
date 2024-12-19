import { Json } from '../core/json';
import { WorkflowStage, parseWorkflowStage } from './stage';

export interface WorkflowTemplate {
  id: string;
  name: string;
  description?: string | null;
  steps: WorkflowStage[];
  is_active?: boolean | null;
  created_by?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  profile?: {
    id: string;
    username: string;
    display_name: string;
    avatar_url: string;
  };
}

export const parseWorkflowTemplate = (data: Json): WorkflowTemplate => {
  if (typeof data !== 'object' || !data) {
    throw new Error('Invalid workflow template data');
  }

  const template = data as Record<string, Json>;
  const steps = Array.isArray(template.steps) 
    ? template.steps.map(step => parseWorkflowStage(step))
    : [];

  return {
    id: String(template.id || ''),
    name: String(template.name || ''),
    description: template.description ? String(template.description) : null,
    steps,
    is_active: Boolean(template.is_active),
    created_by: template.created_by ? String(template.created_by) : null,
    created_at: template.created_at ? String(template.created_at) : null,
    updated_at: template.updated_at ? String(template.updated_at) : null,
    profile: template.profile as WorkflowTemplate['profile']
  };
};

export const serializeWorkflowTemplate = (template: WorkflowTemplate): Json => {
  return {
    ...template,
    steps: template.steps.map(step => serializeWorkflowStage(step))
  } as unknown as Json;
};