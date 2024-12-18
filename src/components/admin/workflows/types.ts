import { Json } from '@/integrations/supabase/types';

export type WorkflowStageType = 'approval' | 'review' | 'task' | 'notification' | 'conditional';

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
  steps: Json;
}

export interface WorkflowFormData {
  name: string;
  description: string;
  stages: WorkflowStage[];
  is_active?: boolean;
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
    case 'approval':
      if (!stage.config.requiredApprovers || stage.config.requiredApprovers < 1) {
        errors.push('At least one approver is required');
      }
      break;
    case 'task':
      if (stage.config.customFields?.some(field => !field.name)) {
        errors.push('All custom fields must have a name');
      }
      break;
    case 'conditional':
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

export const serializeStages = (stages: WorkflowStage[]): Json => {
  return stages as unknown as Json;
};

export const parseStages = (data: Json): WorkflowStage[] => {
  if (!Array.isArray(data)) return [];
  
  return data.map(stage => ({
    id: typeof stage === 'object' && stage !== null ? String(stage.id || crypto.randomUUID()) : crypto.randomUUID(),
    name: typeof stage === 'object' && stage !== null ? String(stage.name || '') : '',
    type: typeof stage === 'object' && stage !== null ? (stage.type as WorkflowStageType || 'task') : 'task',
    order: typeof stage === 'object' && stage !== null ? Number(stage.order || 0) : 0,
    config: typeof stage === 'object' && stage !== null ? (stage.config as Record<string, any> || {}) : {},
    description: typeof stage === 'object' && stage !== null ? String(stage.description || '') : undefined
  }));
};