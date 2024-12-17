export * from '@/integrations/supabase/types/workflow/types';

export interface WorkflowFormData {
  name: string;
  description: string;
  steps: WorkflowStage[];
}

export interface StageUpdateFunction {
  (stageId: string, updates: Partial<WorkflowStage>): void;
}

export interface StageConfigUpdateProps {
  stage: WorkflowStage;
  onUpdate: (updates: Partial<WorkflowStage>) => void;
}

export const createStageUpdate = (stageId: string, updates: Partial<WorkflowStage>) => {
  return updates;
};

export const isValidStageUpdate = (update: Partial<WorkflowStage>): boolean => {
  if (update.name !== undefined && !update.name.trim()) return false;
  if (update.type !== undefined && !Object.values(['APPROVAL', 'REVIEW', 'TASK', 'NOTIFICATION', 'CONDITIONAL']).includes(update.type)) return false;
  return true;
};

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