import { Json } from '../base/json';
import { WorkflowStage, parseStage, serializeStage } from './stage';
import type { Profile } from '../auth/types';

export interface WorkflowTemplate {
  id: string;
  name: string;
  description?: string;
  steps: WorkflowStage[];
  is_active: boolean;
  created_by?: string;
  created_at?: string;
  updated_at?: string;
  profile?: Profile;
}

export const parseTemplate = (data: Json): WorkflowTemplate => {
  if (typeof data !== 'object' || !data) {
    throw new Error('Invalid template data');
  }

  const steps = Array.isArray(data.steps) 
    ? data.steps.map(step => parseStage(step))
    : [];

  return {
    id: data.id as string,
    name: data.name as string,
    description: data.description as string,
    steps,
    is_active: data.is_active as boolean,
    created_by: data.created_by as string,
    created_at: data.created_at as string,
    updated_at: data.updated_at as string,
    profile: data.profile as Profile
  };
};

export const serializeTemplate = (template: WorkflowTemplate): Json => {
  return {
    ...template,
    steps: template.steps.map(serializeStage)
  } as unknown as Json;
};