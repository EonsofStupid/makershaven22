import { WorkflowStageType } from './enums';
import type { Json } from '@supabase/supabase-js';

export interface WorkflowStage {
  id: string;
  name: string;
  type: WorkflowStageType;
  order: number;
  config: WorkflowStageConfig;
  description?: string;
}

export interface WorkflowStageConfig {
  assignees?: string[];
  deadline?: string;
  requirements?: string[];
  notifications?: {
    type: string;
    template: string;
    recipients: string[];
  }[];
  [key: string]: any;
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

export type WorkflowJson = {
  stages: WorkflowStage[];
} & Json;

// Type guard for WorkflowJson
export function isWorkflowJson(json: Json): json is WorkflowJson {
  if (!json || typeof json !== 'object') return false;
  if (!Array.isArray((json as WorkflowJson).stages)) return false;
  return true;
}