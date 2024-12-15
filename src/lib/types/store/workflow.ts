export type WorkflowStageType = 'TASK' | 'APPROVAL' | 'REVIEW' | 'NOTIFICATION' | 'CONDITIONAL';

export interface WorkflowStageConfig {
  [key: string]: any;
}

export interface WorkflowStage {
  id: string;
  type: WorkflowStageType;
  name: string;
  order: number;
  config?: WorkflowStageConfig;
}

export interface WorkflowTemplate {
  id: string;
  name: string;
  description?: string;
  stages: WorkflowStage[];
  is_active: boolean;
  created_by?: string;
  created_at?: string;
  updated_at?: string;
}

export type StageUpdateFunction = (stageId: string, updates: Partial<WorkflowStage>) => void;