import type { Json } from '../core/json';
import type { WorkflowStageType } from '../core/enums';
import type { BaseRow, BaseTable } from '../core/base';

export interface WorkflowStage extends BaseRow {
  name: string;
  type: WorkflowStageType;
  order: number;
  config: WorkflowStageConfig;
  description?: string;
}

export interface WorkflowTemplate extends BaseRow {
  name: string;
  description?: string;
  steps: WorkflowStage[];
  stages: WorkflowStage[];
  is_active: boolean;
  created_by?: string;
}

export interface WorkflowStageConfig {
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
      value: Json;
    }>;
  };
  requiredApprovers?: number;
  customFields?: Array<{
    name: string;
    type: 'text' | 'number' | 'date' | 'select';
    required: boolean;
    options?: string[];
  }>;
}

export interface WorkflowTables {
  workflow_templates: BaseTable<WorkflowTemplate>;
  workflow_stages: BaseTable<WorkflowStage>;
}