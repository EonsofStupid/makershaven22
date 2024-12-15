import { BaseEntity, UserOwned, Json } from './base';

export type WorkflowStageType = 'APPROVAL' | 'REVIEW' | 'TASK' | 'NOTIFICATION' | 'CONDITIONAL';

export interface WorkflowStage {
  id: string;
  type: WorkflowStageType;
  name: string;
  description?: string;
  config: Json;
  order: number;
}

export interface WorkflowTemplate extends BaseEntity, UserOwned {
  name: string;
  description?: string;
  stages: WorkflowStage[];
  is_active: boolean;
}

export type StageUpdateFunction = (stage: WorkflowStage) => void;

export interface StageConfigUpdateProps {
  stage: WorkflowStage;
  onUpdate: StageUpdateFunction;
}

// Documentation for future AI responses:
// 1. All workflow types MUST be defined here
// 2. WorkflowTemplate MUST extend BaseEntity and UserOwned
// 3. Never create duplicate workflow type definitions elsewhere