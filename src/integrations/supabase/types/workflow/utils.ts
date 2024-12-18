import { Json } from '../core/json';
import { WorkflowStage } from './stage';
import { WorkflowTemplate } from './template';

export const parseWorkflowStages = (data: Json): WorkflowStage[] => {
  if (!Array.isArray(data)) return [];
  
  return data.map(stage => ({
    id: typeof stage === 'object' && stage !== null ? String(stage.id || crypto.randomUUID()) : crypto.randomUUID(),
    name: typeof stage === 'object' && stage !== null ? String(stage.name || '') : '',
    type: typeof stage === 'object' && stage !== null ? (stage.type as WorkflowStage['type'] || 'TASK') : 'TASK',
    order: typeof stage === 'object' && stage !== null ? Number(stage.order || 0) : 0,
    config: typeof stage === 'object' && stage !== null ? (stage.config as WorkflowStage['config'] || {}) : {},
    description: typeof stage === 'object' && stage !== null ? String(stage.description || '') : undefined
  }));
};

export const serializeWorkflowTemplate = (template: WorkflowTemplate): Json => {
  return {
    ...template,
    stages: template.stages.map(stage => ({
      ...stage,
      id: stage.id.toString(),
      type: stage.type.toString(),
      order: Number(stage.order),
      config: stage.config || {}
    }))
  };
};