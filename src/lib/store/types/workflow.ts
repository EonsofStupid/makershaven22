import { Json } from '@/integrations/supabase/types/core/json';

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

export interface WorkflowState {
  workflows: WorkflowTemplate[];
  activeWorkflow: WorkflowTemplate | null;
  isLoading: boolean;
  error: Error | null;
  setWorkflows: (workflows: WorkflowTemplate[]) => void;
  setActiveWorkflow: (workflow: WorkflowTemplate) => void;
  addWorkflow: (workflow: WorkflowTemplate) => void;
  updateWorkflow: (id: string, updates: Partial<WorkflowTemplate>) => void;
  deleteWorkflow: (id: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: Error | null) => void;
}