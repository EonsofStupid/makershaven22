import { Json, JsonObject } from './json';

export enum WorkflowStageType {
  TASK = 'TASK',
  APPROVAL = 'APPROVAL',
  NOTIFICATION = 'NOTIFICATION',
  REVIEW = 'REVIEW'
}

export interface WorkflowStage {
  id: string;
  name: string;
  type: WorkflowStageType;
  order: number;
  config: JsonObject;
  description?: string;
}

export interface WorkflowTemplate {
  id: string;
  name: string;
  description?: string;
  steps: WorkflowStage[];
  is_active: boolean;
  created_by?: string;
  created_at?: string;
  updated_at?: string;
}

export interface WorkflowState {
  templates: WorkflowTemplate[];
  activeWorkflow: WorkflowTemplate | null;
  history: WorkflowTemplate[];
  isLoading: boolean;
  error: Error | null;
  setTemplates: (templates: WorkflowTemplate[]) => void;
  setActiveWorkflow: (workflow: WorkflowTemplate | null) => void;
  addToHistory: (workflow: WorkflowTemplate) => void;
  clearHistory: () => void;
}

export const isWorkflowStage = (value: unknown): value is WorkflowStage => {
  if (!isJsonObject(value)) return false;
  
  return (
    typeof value.id === 'string' &&
    typeof value.name === 'string' &&
    typeof value.type === 'string' &&
    typeof value.order === 'number' &&
    isJsonObject(value.config)
  );
};

export const isWorkflowTemplate = (value: unknown): value is WorkflowTemplate => {
  if (!isJsonObject(value)) return false;
  
  return (
    typeof value.id === 'string' &&
    typeof value.name === 'string' &&
    Array.isArray(value.steps) &&
    value.steps.every(isWorkflowStage) &&
    typeof value.is_active === 'boolean'
  );
};

export const parseWorkflowJson = (json: Json): WorkflowStage[] => {
  if (!Array.isArray(json)) {
    throw new Error('Invalid workflow JSON format');
  }
  
  return json.map((stage): WorkflowStage => ({
    id: stage.id as string,
    name: stage.name as string,
    type: stage.type as WorkflowStageType,
    order: stage.order as number,
    config: stage.config as JsonObject,
    description: stage.description as string | undefined
  }));
};