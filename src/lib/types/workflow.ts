import { BaseEntity, Json } from './base';

export interface WorkflowStage {
  id: string;
  type: 'approval' | 'review' | 'task' | 'notification' | 'conditional';
  title: string;
  description?: string;
  config: Json;
  order: number;
}

export interface WorkflowTemplate extends BaseEntity {
  name: string;
  description?: string;
  stages: WorkflowStage[];
  is_active: boolean;
}

export interface StageConfigUpdateProps {
  stage: WorkflowStage;
  onUpdate: (updates: Partial<WorkflowStage>) => void;
}