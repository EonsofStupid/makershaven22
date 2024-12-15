import { Json } from '@/integrations/supabase/types';

export type WorkflowStageType = 'APPROVAL' | 'REVIEW' | 'TASK' | 'NOTIFICATION' | 'CONDITIONAL';

export interface WorkflowStage {
  id: string;
  type: WorkflowStageType;
  name: string;
  description?: string;
  config: WorkflowStageConfig;
  order: number;
}

export interface WorkflowStageConfig {
  timeLimit?: number;
  autoAssignment?: {
    type: 'user' | 'role' | 'group';
    value: string;
  };
  notifications?: {
    onStart?: boolean;
    onComplete?: boolean;
    reminderInterval?: number;
  };
  customFields?: Array<{
    name: string;
    type: 'text' | 'number' | 'date' | 'select';
    required: boolean;
  }>;
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

export interface WorkflowFormData {
  name: string;
  description: string;
  stages: WorkflowStage[];
}

export const validateStage = (stage: WorkflowStage) => {
  const errors: string[] = [];
  if (!stage.name.trim()) {
    errors.push('Stage name is required');
  }
  if (!stage.type) {
    errors.push('Stage type is required');
  }
  return {
    isValid: errors.length === 0,
    errors
  };
};

export const isValidStageUpdate = (stage: Partial<WorkflowStage>): boolean => {
  return true; // Add validation logic as needed
};

export const createStageUpdate = (id: string, updates: Partial<WorkflowStage>): Partial<WorkflowStage> => {
  return { id, ...updates };
};

export const serializeStages = (stages: WorkflowStage[]) => {
  return JSON.stringify(stages);
};

export const parseStages = (stagesJson: string): WorkflowStage[] => {
  try {
    return JSON.parse(stagesJson);
  } catch {
    return [];
  }
};