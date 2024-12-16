import { Json } from '@/integrations/supabase/types';

export interface WorkflowFormData {
  name: string;
  description: string;
  steps: WorkflowStage[];
  stages: WorkflowStage[];
  is_active: boolean;
}

export interface WorkflowStage {
  id: string;
  type: WorkflowStageType;
  name: string;
  description?: string;
  config: WorkflowStageConfig;
  order: number;
}

export type WorkflowStageType = 'approval' | 'review' | 'task' | 'notification' | 'conditional';

export interface WorkflowStageConfig {
  timeLimit?: number;
  customFields?: Array<{
    name: string;
    type: 'text' | 'number' | 'date' | 'select';
    required: boolean;
  }>;
}