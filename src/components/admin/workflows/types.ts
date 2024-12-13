import { Json } from "@/integrations/supabase/types";

export type WorkflowStageType = 'approval' | 'review' | 'task' | 'notification' | 'conditional';

export interface WorkflowStage {
  id: string;
  name: string;
  description?: string;
  type: WorkflowStageType;
  order: number;
  config: WorkflowStageConfig;
}

export interface WorkflowStageConfig {
  timeLimit?: number;
  customFields?: Array<{
    name: string;
    type: 'text' | 'number' | 'date' | 'select';
    required?: boolean;
  }>;
  [key: string]: any;
}

export interface WorkflowTemplate {
  id?: string;
  name: string;
  description: string | null;
  stages: WorkflowStage[];
  is_active: boolean;
  created_at?: string;
  created_by?: string;
  updated_at?: string;
  steps: Json;
}

export type StageUpdateFunction = (stageId: string, updates: Partial<WorkflowStage>) => void;

export interface StageConfigUpdateProps {
  stage: WorkflowStage;
  onUpdate: StageUpdateFunction;
}

export const validateStage = (stage: WorkflowStage): boolean => {
  return !!(stage.id && stage.name && stage.type);
};

export const isValidStageUpdate = (updates: Partial<WorkflowStage>): boolean => {
  return Object.keys(updates).length > 0;
};

export const createStageUpdate = (stage: WorkflowStage, updates: Partial<WorkflowStage>): WorkflowStage => {
  return { ...stage, ...updates };
};

export const serializeStages = (stages: WorkflowStage[]): Json => {
  return stages as unknown as Json;
};

export const parseStages = (json: Json): WorkflowStage[] => {
  if (Array.isArray(json)) {
    return json.map(stage => ({
      id: stage.id || '',
      name: stage.name || '',
      type: stage.type as WorkflowStageType,
      order: stage.order || 0,
      config: stage.config || {},
      description: stage.description
    }));
  }
  return [];
};