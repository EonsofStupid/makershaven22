import { Json } from '../core/json';

export type WorkflowStageType = 'approval' | 'review' | 'task' | 'notification' | 'conditional';

export interface WorkflowStage {
  id: string;
  name: string;
  type: WorkflowStageType;
  order: number;
  config: {
    timeLimit?: number;
    requiredApprovers?: number;
    customFields?: {
      name: string;
      type: 'text' | 'number' | 'date' | 'select';
      options?: string[];
      required?: boolean;
    }[];
    [key: string]: any;
  };
  description?: string;
}

export interface WorkflowTemplate {
  id: string;
  name: string;
  description: string | null;
  stages: WorkflowStage[];
  is_active: boolean;
  created_at: string;
  created_by: string;
  updated_at?: string;
  steps: Json;
  triggers?: Json;
}

export interface WorkflowFormData {
  name: string;
  description: string;
  stages: WorkflowStage[];
  is_active: boolean;
  steps: Json;
}