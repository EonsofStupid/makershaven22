export type WorkflowStageType = 'APPROVAL' | 'REVIEW' | 'TASK' | 'NOTIFICATION' | 'CONDITIONAL';

export interface WorkflowStageConfig {
  timeLimit?: number;
  autoAssignment?: {
    type: 'user' | 'role' | 'group';
    value: string;
  };
  notifications?: {
    onStart?: boolean;
    onComplete?: boolean;
    reminderInterval?: number;
  };
}

export interface WorkflowStage {
  id: string;
  type: WorkflowStageType;
  name: string;
  order: number;
  config: WorkflowStageConfig;
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

export interface WorkflowState {
  activeWorkflows: Record<string, WorkflowTemplate>;
  workflowHistory: Record<string, any[]>;
  isLoading: boolean;
  error: Error | null;
}