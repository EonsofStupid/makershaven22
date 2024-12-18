import { WorkflowStage } from './stage';

export interface WorkflowTemplate {
  id: string;
  name: string;
  description?: string;
  stages: WorkflowStage[];
  steps: WorkflowStage[];
  is_active?: boolean;
  created_by?: string;
  created_at?: string;
  updated_at?: string;
}