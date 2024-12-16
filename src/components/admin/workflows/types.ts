import { Json } from "@/integrations/supabase/types";

export type WorkflowStageType = 'APPROVAL' | 'REVIEW' | 'TASK' | 'NOTIFICATION' | 'CONDITIONAL';

export interface WorkflowStage {
  id: string;
  name: string;
  type: WorkflowStageType;
  order: number;
  config: Record<string, any>;
  description?: string;
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
  description?: string;
  stages: WorkflowStage[];
  is_active: boolean;
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

export interface StageConfigUpdateProps {
  stage: WorkflowStage;
  onUpdate: (updates: Partial<WorkflowStage>) => void;
}

export type StageUpdateFunction = (stageId: string, updates: Partial<WorkflowStage>) => void;

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

export const isValidStageUpdate = (update: Partial<WorkflowStage>): boolean => {
  return true; // Add validation logic as needed
};

export const createStageUpdate = (stageId: string, updates: Partial<WorkflowStage>) => {
  return updates;
};

export const serializeStages = (stages: WorkflowStage[]): Json => {
  return stages as unknown as Json;
};

export const parseStages = (data: Json): WorkflowStage[] => {
  if (!Array.isArray(data)) return [];
  return data.map(stage => ({
    id: stage.id || crypto.randomUUID(),
    name: stage.name || '',
    type: stage.type || 'TASK',
    order: stage.order || 0,
    config: stage.config || {},
    description: stage.description
  }));
};