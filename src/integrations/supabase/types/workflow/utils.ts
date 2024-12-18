import { Json } from '../core/json';
import type { WorkflowStage } from './stage';
import type { WorkflowTemplate } from './template';

export const parseWorkflowStages = (data: Json[]): WorkflowStage[] => {
  if (!Array.isArray(data)) return [];
  
  return data.map(stage => {
    if (typeof stage !== 'object' || !stage) {
      return {
        id: crypto.randomUUID(),
        name: '',
        type: 'TASK',
        order: 0,
        config: {},
        description: undefined
      };
    }

    return {
      id: String(stage.id || crypto.randomUUID()),
      name: String(stage.name || ''),
      type: stage.type || 'TASK',
      order: Number(stage.order || 0),
      config: stage.config || {},
      description: stage.description ? String(stage.description) : undefined
    };
  });
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
  } as unknown as Json;
};