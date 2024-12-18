import { Json } from '@/integrations/supabase/types/json';
import { WorkflowStage, WorkflowStageType, WorkflowTemplate } from './workflow-types';

export const parseWorkflowStage = (data: Json): WorkflowStage => {
  if (typeof data !== 'object' || !data) {
    return {
      id: crypto.randomUUID(),
      name: '',
      type: 'task',
      order: 0,
      config: {},
    };
  }

  const stageData = data as Record<string, unknown>;
  
  return {
    id: String(stageData.id || crypto.randomUUID()),
    name: String(stageData.name || ''),
    type: (stageData.type as WorkflowStageType) || 'task',
    order: Number(stageData.order || 0),
    config: stageData.config as WorkflowStage['config'] || {},
    description: stageData.description ? String(stageData.description) : undefined
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
  };
};

export const parseWorkflowStages = (data: Json[]): WorkflowStage[] => {
  if (!Array.isArray(data)) return [];
  return data.map(parseWorkflowStage);
};

export const serializeWorkflowStages = (stages: WorkflowStage[]): Json => {
  return stages.map(serializeWorkflowStage);
};