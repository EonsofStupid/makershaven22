import { BaseEntity } from './base';
import { Json } from '@/integrations/supabase/types';

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

export interface WorkflowTemplate extends BaseEntity {
  name: string;
  description?: string;
  steps: WorkflowStage[];
  is_active?: boolean;
  created_by?: string;
}

export interface WorkflowInstance extends BaseEntity {
  template_id: string;
  current_stage: number;
  status: 'active' | 'completed' | 'cancelled';
  metadata?: Json;
}