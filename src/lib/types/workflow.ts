import { BaseEntity } from './base';
import { Json } from '@/integrations/supabase/types';

export interface WorkflowTemplate extends BaseEntity {
  name: string;
  description?: string;
  steps: Json;
  stages: WorkflowStage[];
  is_active: boolean;
}

export interface WorkflowStage {
  id: string;
  type: WorkflowStageType;
  name: string;
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
  [key: string]: any;
}

export interface StageConfigUpdateProps {
  stage: WorkflowStage;
  onUpdate: (updates: Partial<WorkflowStage>) => void;
}