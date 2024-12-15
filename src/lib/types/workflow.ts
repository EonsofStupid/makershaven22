import { BaseEntity, Json } from './base';

export interface WorkflowTemplate extends BaseEntity {
  name: string;
  description?: string;
  steps: Json;
  is_active?: boolean;
  created_by?: string;
  stages: WorkflowStage[];
}

export interface WorkflowStage {
  id: string;
  type: 'APPROVAL' | 'REVIEW' | 'TASK' | 'NOTIFICATION' | 'CONDITIONAL';
  config: Json;
  order: number;
}