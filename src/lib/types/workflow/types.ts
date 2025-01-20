import { Json } from '../core/json';

export interface WorkflowStep {
  id: string;
  name: string;
  type: string;
  order: number;
  config: Json;
  description?: string;
}

export interface WorkflowTemplate {
  id: string;
  name: string;
  description?: string;
  steps: WorkflowStep[];
  triggers?: Json;
  created_by?: string;
  created_at?: string;
  updated_at?: string;
  email?: string;
  stages?: Json;
  is_active?: boolean;
}

export interface WorkflowFormData extends WorkflowTemplate {}