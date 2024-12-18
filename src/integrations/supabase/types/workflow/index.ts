import type { Json } from '../base';

export interface WorkflowTemplate {
  id: string;
  name: string;
  description?: string;
  stages: WorkflowStage[];
  is_active: boolean;
  created_by?: string;
  created_at?: string;
  updated_at?: string;
}

export interface WorkflowStage {
  id: string;
  name: string;
  type: string;
  order: number;
  config: Record<string, any>;
  description?: string;
}

export const parseWorkflowJson = (json: Json): WorkflowStage[] => {
  if (!json || !Array.isArray(json)) return [];
  
  return json.map(stage => ({
    id: String(stage.id || ''),
    name: String(stage.name || ''),
    type: String(stage.type || ''),
    order: Number(stage.order || 0),
    config: stage.config || {},
    description: stage.description ? String(stage.description) : undefined
  }));
};