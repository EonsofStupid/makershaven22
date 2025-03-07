
import { Json } from '../core/json';
import { WorkflowStageType } from '../core/enums';

export interface WorkflowState {
  activeWorkflows: Record<string, any>;
  workflowHistory: Record<string, any[]>;
  setActiveWorkflow: (id: string, data: any) => void;
  addToHistory: (id: string, data: any) => void;
  clearWorkflowHistory: (id: string) => void;
  reset: () => void;
}

export interface WorkflowTemplate {
  id: string;
  name: string;
  description?: string;
  stages: WorkflowStage[];
  is_active: boolean;
  created_at?: string;
  created_by?: string;
  updated_at?: string;
  updated_by?: string;
}

export interface WorkflowStage {
  id: string;
  name: string;
  type: WorkflowStageType;
  order: number;
  config: Record<string, any>;
  description?: string;
}

export interface WorkflowFormData {
  name: string;
  description: string;
  stages: WorkflowStage[];
  is_active: boolean;
}

export function serializeStages(stages: WorkflowStage[]): Json {
  return stages as unknown as Json;
}

export function parseStages(data: Json): WorkflowStage[] {
  if (!data || !Array.isArray(data)) {
    return [];
  }
  
  return data.map((stage: any) => ({
    id: stage.id,
    name: stage.name,
    type: stage.type as WorkflowStageType,
    order: stage.order,
    config: stage.config || {},
    description: stage.description
  }));
}

export function validateStage(stage: WorkflowStage): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (!stage.name) {
    errors.push('Stage name is required');
  }
  
  if (!stage.type) {
    errors.push('Stage type is required');
  }
  
  // Add specific validations based on stage type
  if (stage.type === 'approval' && !stage.config.approvers) {
    errors.push('Approvers are required for approval stages');
  }
  
  if (stage.type === 'task' && !stage.config.assignee) {
    errors.push('Assignee is required for task stages');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}
