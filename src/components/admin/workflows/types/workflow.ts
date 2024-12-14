import { Json } from '@/integrations/supabase/types';

export enum WorkflowStageType {
  APPROVAL = 'approval',
  REVIEW = 'review',
  TASK = 'task',
  NOTIFICATION = 'notification',
  CONDITIONAL = 'conditional'
}

export interface WorkflowStage {
  id: string;
  name: string;
  description?: string;
  type: WorkflowStageType;
  order: number;
  config: WorkflowStageConfig;
}

export interface WorkflowStageConfig {
  timeLimit?: number;
  customFields?: Array<{
    name: string;
    type: 'text' | 'number' | 'date' | 'select';
    required?: boolean;
  }>;
  autoAssignment?: {
    type: 'user' | 'role' | 'group';
    value: string;
  };
  notifications?: {
    onStart?: boolean;
    onComplete?: boolean;
    reminderInterval?: number;
  };
  [key: string]: any;
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

export type StageUpdateFunction = (stageId: string, updates: Partial<WorkflowStage>) => void;

export interface StageConfigUpdateProps {
  stage: WorkflowStage;
  onUpdate: (updates: Partial<WorkflowStage>) => void;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export const validateStage = (stage: WorkflowStage): ValidationResult => {
  const errors: string[] = [];
  
  if (!stage.id) errors.push('Stage ID is required');
  if (!stage.name) errors.push('Stage name is required');
  if (!stage.type) errors.push('Stage type is required');
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

export const serializeStages = (stages: WorkflowStage[]): Json => {
  return JSON.stringify(stages) as Json;
};

export const parseStages = (stepsJson: Json): WorkflowStage[] => {
  try {
    if (typeof stepsJson === 'string') {
      const parsed = JSON.parse(stepsJson);
      if (Array.isArray(parsed)) {
        return parsed.map(stage => ({
          id: stage.id,
          name: stage.name,
          type: stage.type,
          order: stage.order,
          config: stage.config,
          description: stage.description
        }));
      }
    }
    return [];
  } catch {
    return [];
  }
};