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

export interface WorkflowTemplate {
  id?: string;
  name: string;
  description: string | null;
  stages: WorkflowStage[];
  is_active: boolean;
  created_at?: string;
  created_by?: string;
  updated_at?: string;
  steps: Json;
}

export interface WorkflowFormData {
  name: string;
  description: string;
  stages: WorkflowStage[];
  is_active: boolean;
}

export interface WorkflowStageConfig {
  title?: string;
  description?: string;
  assignees?: string[];
  dueDate?: string;
  priority?: 'low' | 'medium' | 'high';
  notifications?: {
    type: string;
    template: string;
    recipients: string[];
  }[];
  conditions?: {
    field: string;
    operator: string;
    value: any;
  }[];
  autoAssignment?: {
    type: 'user' | 'role' | 'group';
    value: string;
  };
  settings?: {
    onStart?: boolean;
    onComplete?: boolean;
    reminderInterval?: number;
  };
  timeLimit?: number;
  requiredApprovers?: number;
  customFields?: Array<{
    name: string;
    type: 'text' | 'number' | 'date' | 'select';
    required: boolean;
  }>;
}

export interface StageConfigUpdateProps {
  stage: WorkflowStage;
  onUpdate: (updates: Partial<WorkflowStage>) => void;
}