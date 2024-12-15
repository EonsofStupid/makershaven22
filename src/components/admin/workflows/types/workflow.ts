import type { Json } from '@/integrations/supabase/types/base';

export enum WorkflowStageType {
  APPROVAL = 'APPROVAL',
  REVIEW = 'REVIEW',
  TASK = 'TASK',
  NOTIFICATION = 'NOTIFICATION',
  CONDITIONAL = 'CONDITIONAL'
}

export interface WorkflowStage {
  id: string;
  name: string;
  type: WorkflowStageType;
  order: number;
  config: WorkflowStageConfig;
  description?: string;
}

export interface WorkflowStageConfig {
  [key: string]: any;
  notifications?: {
    reminderInterval: number;
  };
  timeLimit?: number;
  customFields?: Array<{
    name: string;
    type: 'text' | 'number' | 'date' | 'select';
    required: boolean;
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

export interface Workflow extends WorkflowTemplate {
  triggers?: Json;
}

export type StageUpdateFunction = (stageId: string, updates: Partial<WorkflowStage>) => void;

export interface StageConfigUpdateProps {
  stage: WorkflowStage;
  onUpdate: (updates: Partial<WorkflowStage>) => void;
}