import { Json } from '@/integrations/supabase/types';

export type WorkflowStageType = 'approval' | 'review' | 'task' | 'notification' | 'conditional';

export interface WorkflowStage {
  id: string;
  name: string;
  type: WorkflowStageType;
  order: number;
  config: WorkflowStageConfig;
  description?: string;
}

export interface WorkflowStageConfig {
  timeLimit?: number;
  requiredApprovers?: number;
  autoAssignment?: {
    type: 'user' | 'role' | 'group';
    value: string;
  };
  notifications?: {
    onStart?: boolean;
    onComplete?: boolean;
    reminderInterval?: number;
  };
  customFields?: Array<{
    name: string;
    type: 'text' | 'number' | 'date' | 'select';
    required?: boolean;
  }>;
}

export interface WorkflowTemplate {
  id?: string;
  name: string;
  description: string | null;
  stages: WorkflowStage[];
  steps: Json;
  is_active: boolean;
  created_at?: string;
  created_by?: string;
  updated_at?: string;
}

export type StageUpdateFunction = (stageId: string, updates: Partial<WorkflowStage>) => void;

export const parseStages = (stepsJson: Json): WorkflowStage[] => {
  if (!Array.isArray(stepsJson)) return [];
  return stepsJson.map(step => ({
    id: step.id || crypto.randomUUID(),
    name: step.name || '',
    type: step.type || 'task',
    order: step.order || 0,
    config: step.config || {},
    description: step.description
  }));
};