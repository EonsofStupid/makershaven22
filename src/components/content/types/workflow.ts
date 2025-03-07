
import { WorkflowStageType } from '@/lib/types/core/enums';
import { UserRole } from '@/lib/types/core/enums';
import { Json } from '@/lib/types/core/json';

export interface WorkflowTemplate {
  id: string;
  name: string;
  description?: string;
  stages: WorkflowStage[];
  is_active: boolean;
  created_at?: string;
  created_by?: string;
  updated_at?: string;
  updated_by?: string;
}

export interface WorkflowStage {
  id: string;
  name: string;
  type: WorkflowStageType;
  order: number;
  config: Record<string, any>;
  description?: string;
}

export interface WorkflowFormData {
  name: string;
  description: string;
  stages: WorkflowStage[];
  is_active: boolean;
}

export interface WorkflowInstance {
  id: string;
  template_id: string;
  content_id: string;
  current_stage: number;
  status: 'active' | 'completed' | 'canceled';
  stages_data: Json;
  created_at: string;
  created_by: string;
  updated_at?: string;
  updated_by?: string;
  completed_at?: string;
}

export interface StageConfig {
  approvers?: string[];
  reviewers?: string[];
  assignee?: string;
  required_roles?: UserRole[];
  conditions?: Record<string, any>;
  notification_targets?: string[];
  notification_message?: string;
}
