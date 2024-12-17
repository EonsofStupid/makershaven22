import { Json, JsonObject, isJsonObject, assertJsonObject } from "./json";

export type WorkflowStageType = 'APPROVAL' | 'REVIEW' | 'TASK' | 'NOTIFICATION' | 'CONDITIONAL';

export interface WorkflowStage {
  id: string;
  name: string;
  type: WorkflowStageType;
  order: number;
  config: WorkflowStageConfig;
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

export interface WorkflowStageConfig {
  assignees?: string[];
  timeLimit?: number;
  autoAssignment?: {
    type: 'user' | 'role' | 'group';
    value: string;
  };
  priority?: 'low' | 'medium' | 'high';
  notifications?: {
    email?: boolean;
    inApp?: boolean;
    onStart?: boolean;
    onComplete?: boolean;
    reminderInterval?: number;
  };
  conditions?: {
    type: 'AND' | 'OR';
    rules: Array<{
      field: string;
      operator: string;
      value: any;
    }>;
  };
  requiredApprovers?: number;
  customFields?: Array<{
    name: string;
    type: 'text' | 'number' | 'date' | 'select';
    required: boolean;
    options?: string[];
  }>;
}

export const parseWorkflowStage = (data: Json): WorkflowStage => {
  const obj = assertJsonObject(data);
  return {
    id: String(obj.id || crypto.randomUUID()),
    name: String(obj.name || ''),
    type: (obj.type as WorkflowStageType) || 'TASK',
    order: Number(obj.order || 0),
    config: parseWorkflowConfig(obj.config),
    description: obj.description ? String(obj.description) : undefined
  };
};

export const parseWorkflowConfig = (data: Json | undefined): WorkflowStageConfig => {
  if (!data || !isJsonObject(data)) {
    return {};
  }
  return data as WorkflowStageConfig;
};

export const parseWorkflowStages = (data: Json): WorkflowStage[] => {
  if (!Array.isArray(data)) return [];
  return data.map(parseWorkflowStage);
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

export const serializeWorkflowStages = (stages: WorkflowStage[]): Json => {
  return stages.map(serializeWorkflowStage);
};