
import { Json } from '../core/json';
import { WorkflowStage, serializeWorkflowStage } from './stage';

export interface WorkflowTemplate {
  id?: string;
  name: string;
  description: string | null;
  stages: WorkflowStage[];
  is_active: boolean;
  created_at?: string;
  created_by?: string;
  updated_at?: string;
}

export interface WorkflowFormData {
  name: string;
  description: string;
  stages: WorkflowStage[];
  is_active: boolean;
}

// Functions to help with serialization/deserialization for DB
export const serializeWorkflowTemplate = (template: WorkflowTemplate): { 
  id?: string;
  name: string; 
  description: string | null;
  stages: Json;
  is_active: boolean;
  created_at?: string;
  created_by?: string;
  updated_at?: string;
} => {
  return {
    ...template,
    stages: JSON.parse(JSON.stringify(template.stages))
  };
};

export const parseWorkflowTemplate = (data: any): WorkflowTemplate => {
  if (!data) return {
    name: '',
    description: '',
    stages: [],
    is_active: true
  };

  let stages: WorkflowStage[] = [];
  if (data.stages && Array.isArray(data.stages)) {
    stages = data.stages.map((stage: any) => ({
      id: stage.id || crypto.randomUUID(),
      name: stage.name || '',
      description: stage.description || '',
      type: stage.type || 'task',
      order: stage.order || 0,
      config: stage.config || {},
      validationRules: stage.validationRules || []
    }));
  }

  return {
    id: data.id,
    name: data.name || '',
    description: data.description || '',
    stages,
    is_active: data.is_active ?? true,
    created_at: data.created_at,
    created_by: data.created_by,
    updated_at: data.updated_at
  };
};
