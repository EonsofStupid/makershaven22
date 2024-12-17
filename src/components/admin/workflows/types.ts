import type { Json, WorkflowStage, WorkflowTemplate, WorkflowStageConfig, WorkflowStageType } from "@/integrations/supabase/types";
import type { Profile } from "@/integrations/supabase/types";

export type { WorkflowStage, WorkflowTemplate, WorkflowStageConfig, WorkflowStageType };

export type StageUpdateFunction = (stageId: string, updates: Partial<WorkflowStage>) => void;

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

export const isValidStageUpdate = (update: Partial<WorkflowStage>): boolean => {
  if (update.name !== undefined && !update.name.trim()) return false;
  if (update.type && !['APPROVAL', 'REVIEW', 'TASK', 'NOTIFICATION', 'CONDITIONAL'].includes(update.type)) return false;
  return true;
};

export const createStageUpdate = (stageId: string, updates: Partial<WorkflowStage>): Partial<WorkflowStage> => {
  return {
    ...updates,
    id: stageId
  };
};