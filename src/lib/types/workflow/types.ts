import { Json } from "../core/json";
import { WorkflowStageType } from "../core/enums";

export interface WorkflowStep {
  id: string;
  name: string;
  type: WorkflowStageType;
  order: number;
  config: {
    assignees?: string[];
    timeLimit?: number;
    autoAssignment?: {
      type: 'user' | 'role' | 'group';
      value: string;
    };
    priority?: 'low' | 'medium' | 'high';
    notifications?: {
      email?: boolean;
      inApp?: boolean;
      onStart?: boolean;
      onComplete?: boolean;
      reminderInterval?: number;
    };
    conditions?: {
      type: 'AND' | 'OR';
      rules: Array<{
        field: string;
        operator: string;
        value: any;
      }>;
    };
  };
  description?: string;
}

export interface WorkflowTemplate {
  id: string;
  name: string;
  description?: string;
  steps: WorkflowStep[];
  triggers?: Json;
  created_by?: string;
  updated_at?: string;
  email?: string;
  stages?: WorkflowStep[];
  is_active?: boolean;
}

export interface WorkflowFormData extends WorkflowTemplate {}