import type { Json } from '../base/json';
import type { Profile } from '../auth/types';
import { WorkflowStageType } from '../enums';

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

export interface StageConfigUpdateProps {
  stage: WorkflowStage;
  onUpdate: (updates: Partial<WorkflowStage>) => void;
}

export const parseStages = (data: Json): WorkflowStage[] => {
  if (!Array.isArray(data)) return [];
  
  return data.map(stage => ({
    id: typeof stage === 'object' && stage ? (stage.id as string || crypto.randomUUID()) : crypto.randomUUID(),
    name: typeof stage === 'object' && stage ? (stage.name as string || '') : '',
    type: typeof stage === 'object' && stage ? ((stage.type as WorkflowStageType) || 'TASK') : 'TASK',
    order: typeof stage === 'object' && stage ? (stage.order as number || 0) : 0,
    config: typeof stage === 'object' && stage ? (stage.config as WorkflowStageConfig || {}) : {},
    description: typeof stage === 'object' && stage ? (stage.description as string) : undefined
  }));
};

export const serializeStages = (stages: WorkflowStage[]): Json => {
  return stages as unknown as Json;
};