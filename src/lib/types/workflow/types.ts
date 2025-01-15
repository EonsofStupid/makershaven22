import { Json } from "../core/json";

export interface WorkflowTemplate {
  id: string;
  name: string;
  description?: string;
  steps: WorkflowStep[];
  triggers?: WorkflowTrigger[];
  is_active: boolean;
  created_by?: string;
  created_at?: string;
  updated_at?: string;
  stages?: WorkflowStage[];
}

export interface WorkflowStep {
  id: string;
  name: string;
  type: WorkflowStepType;
  config: Json;
  order: number;
  metadata?: Json;
}

export type WorkflowStepType = 
  | "APPROVAL" 
  | "REVIEW" 
  | "TASK" 
  | "NOTIFICATION" 
  | "CONDITIONAL";

export interface WorkflowTrigger {
  event: string;
  conditions?: Json;
  metadata?: Json;
}

export interface WorkflowStage {
  id: string;
  name: string;
  type: WorkflowStepType;
  order: number;
  config: Json;
  description?: string;
}