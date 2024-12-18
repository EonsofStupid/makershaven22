import type { WorkflowStage } from './stage';

export interface WorkflowTemplate {
  id: string;
  name: string;
  description?: string;
  steps: WorkflowStage[];
  stages: WorkflowStage[];
  is_active?: boolean;
  created_by?: string;
  created_at?: string;
  updated_at?: string;
}

export const serializeWorkflowTemplate = (template: WorkflowTemplate) => {
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