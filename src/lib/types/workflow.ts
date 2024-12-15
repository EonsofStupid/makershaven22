import { Json } from '@/integrations/supabase/types';

export enum WorkflowStageType {
  APPROVAL = 'approval',
  REVIEW = 'review',
  TASK = 'task',
  NOTIFICATION = 'notification',
  CONDITIONAL = 'conditional'
}

export interface WorkflowStage {
  id: string;
  type: WorkflowStageType;
  title: string;
  description?: string;
  config: Record<string, any>;
  order: number;
}

export interface WorkflowTemplate {
  id?: string;
  name: string;
  description?: string;
  stages: WorkflowStage[];
  is_active: boolean;
  created_by?: string;
  created_at?: string;
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

export interface WorkflowStageConfig {
  title: string;
  description?: string;
  config: Record<string, any>;
}