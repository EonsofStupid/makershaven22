
import { Json } from '../core/json';
import { WorkflowStageType } from '../enums';

export interface WorkflowStage {
  id: string;
  name: string;
  type: WorkflowStageType;
  order: number;
  config: Record<string, any>;
  description?: string;
  validationRules?: Record<string, any>;
}

export const parseWorkflowStage = (stageData: Json): WorkflowStage => {
  if (typeof stageData === 'string') {
    try {
      stageData = JSON.parse(stageData);
    } catch (e) {
      console.error('Failed to parse workflow stage string:', e);
      return createEmptyStage();
    }
  }

  if (!stageData || typeof stageData !== 'object' || Array.isArray(stageData)) {
    return createEmptyStage();
  }

  const stage = stageData as Record<string, any>;
  
  return {
    id: stage.id || `stage-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    name: stage.name || 'Untitled Stage',
    type: (stage.type as WorkflowStageType) || 'TASK',
    order: typeof stage.order === 'number' ? stage.order : 0,
    config: stage.config || {},
    description: stage.description || '',
    validationRules: stage.validationRules || {}
  };
};

export const serializeWorkflowStage = (stage: WorkflowStage): Json => {
  return {
    id: stage.id,
    name: stage.name,
    type: stage.type,
    order: stage.order,
    config: stage.config,
    description: stage.description || '',
    validationRules: stage.validationRules || {}
  };
};

export const createEmptyStage = (): WorkflowStage => ({
  id: `stage-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
  name: 'Untitled Stage',
  type: 'TASK',
  order: 0,
  config: {},
  description: '',
  validationRules: {}
});

export const parseWorkflowStages = (stagesData: Json | null): WorkflowStage[] => {
  if (!stagesData) return [];
  
  if (Array.isArray(stagesData)) {
    return stagesData.map(stage => parseWorkflowStage(stage));
  }
  
  try {
    if (typeof stagesData === 'string') {
      const parsed = JSON.parse(stagesData);
      if (Array.isArray(parsed)) {
        return parsed.map(stage => parseWorkflowStage(stage));
      }
    }
    // If it's not an array or can't be parsed to an array, return empty array
    return [];
  } catch (e) {
    console.error('Failed to parse workflow stages:', e);
    return [];
  }
};

export const serializeWorkflowStages = (stages: WorkflowStage[]): Json => {
  return stages.map(stage => serializeWorkflowStage(stage));
};
