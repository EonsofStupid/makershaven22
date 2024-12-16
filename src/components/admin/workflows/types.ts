import { Json } from "@/integrations/supabase/types";

export type WorkflowStageType = 'APPROVAL' | 'REVIEW' | 'TASK' | 'NOTIFICATION' | 'CONDITIONAL';

export interface WorkflowStage {
  id: string;
  name: string;
  type: WorkflowStageType;
  order: number;
  config: WorkflowStageConfig;
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

export interface WorkflowStageConfig {
  assignees?: string[];
  dueDate?: string;
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
  requiredApprovers?: number;
  customFields?: Array<{
    name: string;
    type: 'text' | 'number' | 'date' | 'select';
    required: boolean;
    options?: string[];
  }>;
}

export type StageUpdateFunction = (stageId: string, updates: Partial<WorkflowStage>) => void;

export const createStageUpdate = (stageId: string, updates: Partial<WorkflowStage>) => ({
  stageId,
  updates
});

export const isValidStageUpdate = (update: any): update is { stageId: string; updates: Partial<WorkflowStage> } => {
  return update && typeof update.stageId === 'string' && typeof update.updates === 'object';
};

export interface StageConfigUpdateProps {
  stage: WorkflowStage;
  onUpdate: (updates: Partial<WorkflowStage>) => void;
}

export const validateStage = (stage: WorkflowStage): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!stage.name.trim()) {
    errors.push('Stage name is required');
  }

  if (!stage.type) {
    errors.push('Stage type is required');
  }

  switch (stage.type) {
    case 'APPROVAL':
      if (!stage.config.requiredApprovers || stage.config.requiredApprovers < 1) {
        errors.push('At least one approver is required for approval stages');
      }
      break;
    case 'TASK':
      if (stage.config.customFields?.some(field => !field.name)) {
        errors.push('All custom fields must have a name');
      }
      break;
    case 'CONDITIONAL':
      if (!stage.config.conditions?.rules?.length) {
        errors.push('Conditional stages must have at least one rule');
      }
      break;
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

export const parseStages = (data: Json): WorkflowStage[] => {
  if (!Array.isArray(data)) return [];
  
  return data.map(stage => ({
    id: stage.id || crypto.randomUUID(),
    name: stage.name || '',
    type: (stage.type as WorkflowStageType) || 'TASK',
    order: stage.order || 0,
    config: stage.config || {},
    description: stage.description
  }));
};

export const serializeStages = (stages: WorkflowStage[]): Json => {
  return stages.map(stage => ({
    ...stage,
    config: stage.config || {}
  })) as Json;
};