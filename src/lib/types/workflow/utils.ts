import { Json } from '../core/json';
import { WorkflowStage, WorkflowTemplate, WorkflowStageType } from './base';

export const parseWorkflowStage = (data: Json): WorkflowStage => {
  if (!data || typeof data !== 'object') {
    return {
      id: crypto.randomUUID(),
      name: '',
      type: 'task',
      order: 0,
      config: {},
    };
  }

  const stage = data as Record<string, unknown>;
  
  return {
    id: String(stage.id || crypto.randomUUID()),
    name: String(stage.name || ''),
    type: (stage.type as WorkflowStageType) || 'task',
    order: Number(stage.order || 0),
    config: stage.config as WorkflowStageConfig || {},
    description: stage.description ? String(stage.description) : undefined
  };
};

export const serializeWorkflowStage = (stage: WorkflowStage): Json => {
  return {
    id: stage.id,
    name: stage.name,
    type: stage.type,
    order: stage.order,
    config: stage.config,
    description: stage.description
  } as unknown as Json;
};

export const parseWorkflowStages = (data: Json[]): WorkflowStage[] => {
  if (!Array.isArray(data)) return [];
  return data.map(parseWorkflowStage);
};

export const serializeWorkflowStages = (stages: WorkflowStage[]): Json => {
  return stages.map(serializeWorkflowStage) as unknown as Json;
};

export const validateWorkflowStage = (stage: WorkflowStage): { isValid: boolean; errors: string[] } => {
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