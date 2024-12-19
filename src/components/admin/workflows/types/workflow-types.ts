import { Json } from '@/integrations/supabase/types/json';

export type WorkflowStageType = 'approval' | 'review' | 'task' | 'notification' | 'conditional';

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
  stages: WorkflowStage[];
  is_active: boolean;
  created_by?: string;
  created_at?: string;
  updated_at?: string;
}

export const parseWorkflowStages = (data: Json): WorkflowStage[] => {
  if (!Array.isArray(data)) return [];
  
  return data.map(stage => {
    if (typeof stage !== 'object' || !stage) {
      return {
        id: crypto.randomUUID(),
        name: '',
        type: 'task' as WorkflowStageType,
        order: 0,
        config: {},
      };
    }

    const stageObj = stage as Record<string, any>;
    return {
      id: String(stageObj.id || crypto.randomUUID()),
      name: String(stageObj.name || ''),
      type: (stageObj.type as WorkflowStageType) || 'task',
      order: Number(stageObj.order || 0),
      config: stageObj.config as WorkflowStageConfig || {},
      description: stageObj.description ? String(stageObj.description) : undefined
    };
  });
};

export const serializeWorkflowStages = (stages: WorkflowStage[]): Json => {
  return stages.map(stage => ({
    id: stage.id,
    type: stage.type,
    order: stage.order,
    config: stage.config || {},
    name: stage.name,
    description: stage.description
  })) as Json;
};