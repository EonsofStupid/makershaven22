import { Json, JsonObject, isJsonObject, safeJsonParse } from '../json';
import { BaseEntity, UserOwnedEntity } from '../core/base';

export type WorkflowStageType = 'approval' | 'review' | 'task' | 'notification' | 'conditional';

export interface WorkflowStage {
  id: string;
  name: string;
  type: WorkflowStageType;
  order: number;
  config: JsonObject;
  description?: string;
}

export interface WorkflowTemplate extends Omit<UserOwnedEntity, 'created_by'> {
  name: string;
  description?: string;
  steps: WorkflowStage[];
  stages: WorkflowStage[];
  is_active: boolean;
  created_by?: string;
  email?: string;
  triggers?: Json;
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

export interface WorkflowFormData {
  name: string;
  description: string;
  stages: WorkflowStage[];
  is_active?: boolean;
}

// Type guard for WorkflowStage
export const isWorkflowStage = (value: unknown): value is WorkflowStage => {
  if (!isJsonObject(value)) return false;
  
  const stage = value as WorkflowStage;
  return (
    typeof stage.id === 'string' &&
    typeof stage.name === 'string' &&
    typeof stage.type === 'string' &&
    typeof stage.order === 'number' &&
    isJsonObject(stage.config)
  );
};

// Parse workflow stages safely
export const parseWorkflowStages = (data: Json): WorkflowStage[] => {
  if (!Array.isArray(data)) return [];
  
  return data
    .filter(isWorkflowStage)
    .map(stage => ({
      id: stage.id,
      name: stage.name,
      type: stage.type as WorkflowStageType,
      order: stage.order,
      config: stage.config,
      description: stage.description
    }));
};

// Serialize workflow template safely
export const serializeWorkflowTemplate = (template: WorkflowTemplate): Json => {
  return {
    ...template,
    stages: template.stages?.map(stage => ({
      ...stage,
      id: stage.id.toString(),
      type: stage.type.toString(),
      order: Number(stage.order),
      config: stage.config || {}
    }))
  } as unknown as Json;
};