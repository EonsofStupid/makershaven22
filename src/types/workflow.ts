import { WorkflowStageType } from './enums';
import type { Json } from './json';

export interface WorkflowStage {
  id: string;
  name: string;
  type: WorkflowStageType;
  order: number;
  config: Record<string, any>;
  description?: string;
}

export interface WorkflowTemplate {
  id: string;
  name: string;
  description?: string;
  stages: WorkflowStage[];
  steps: WorkflowStage[];
  is_active: boolean;
  created_by?: string;
  created_at?: string;
  updated_at?: string;
  profile?: {
    id: string;
    username: string;
    display_name: string;
    avatar_url: string;
  };
}

export interface WorkflowState {
  activeWorkflow?: string;
  history: string[];
  setActiveWorkflow: (id: string | undefined) => void;
  addToHistory: (id: string) => void;
}

export function parseWorkflowStages(json: Json): WorkflowStage[] {
  if (!json || !Array.isArray(json)) return [];
  return json.map(stage => ({
    id: stage.id as string,
    name: stage.name as string,
    type: stage.type as WorkflowStageType,
    order: stage.order as number,
    config: stage.config as Record<string, any>,
    description: stage.description as string | undefined
  }));
}