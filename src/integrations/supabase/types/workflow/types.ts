import { Json } from '../core/json';
import { WorkflowStageType } from '../core/enums';
import type { Profile } from '../auth/types';

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
  profile?: Profile;
}

export interface StageConfigUpdateProps {
  stage: WorkflowStage;
  onUpdate: (updates: Partial<WorkflowStage>) => void;
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
  if (typeof data !== 'object' || !data) {
    throw new Error('Invalid workflow stage data');
  }

  const stage = data as Record<string, Json>;
  
  return {
    id: String(stage.id || ''),
    name: String(stage.name || ''),
    type: (stage.type as WorkflowStageType) || 'TASK',
    order: Number(stage.order || 0),
    config: stage.config as WorkflowStageConfig || {},
    description: stage.description ? String(stage.description) : undefined
  };
};

export const serializeWorkflowStage = (stage: WorkflowStage): Json => {
  return stage as unknown as Json;
};