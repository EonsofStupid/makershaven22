import { Json } from '@/integrations/supabase/types';

export interface WorkflowTemplate {
  id: string;
  name: string;
  description?: string;
  steps: WorkflowStep[];
  stages: WorkflowStage[];
  is_active: boolean;
  created_by?: string;
  created_at?: string;
  updated_at?: string;
}

export interface WorkflowStep {
  id: string;
  type: WorkflowStepType;
  name: string;
  config: WorkflowStepConfig;
  order: number;
}

export type WorkflowStepType = 'approval' | 'review' | 'task' | 'notification' | 'conditional';

export interface WorkflowStepConfig {
  timeLimit?: number;
  customFields?: Array<{
    name: string;
    type: 'text' | 'number' | 'date' | 'select';
    required: boolean;
  }>;
  approvers?: string[];
  deadline?: string;
  autoAssignment?: {
    type: 'user' | 'role' | 'group';
    value: string;
  };
  notifications?: WorkflowNotification[];
}

export interface WorkflowNotification {
  onStart?: boolean;
  onComplete?: boolean;
  reminderInterval?: number;
  type: string;
  recipients: string[];
  template: string;
}

export interface WorkflowStage {
  id: string;
  type: WorkflowStepType;
  name: string;
  description?: string;
  config: WorkflowStepConfig;
  order: number;
}

export const parseWorkflowSteps = (steps: Json): WorkflowStage[] => {
  if (!Array.isArray(steps)) return [];
  return steps.map(step => ({
    id: step.id || crypto.randomUUID(),
    type: step.type || 'task',
    name: step.name || '',
    description: step.description,
    config: step.config || {},
    order: step.order || 0
  }));
};

export const serializeWorkflowSteps = (stages: WorkflowStage[]): Json => {
  return stages.map(({ id, type, name, description, config, order }) => ({
    id,
    type,
    name,
    description,
    config,
    order
  }));
};