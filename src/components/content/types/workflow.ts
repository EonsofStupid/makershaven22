import type { WorkflowStage, WorkflowTemplate } from '@/integrations/supabase/types/workflow/types';

export interface WorkflowFormData {
  name: string;
  description: string;
  steps: WorkflowStage[];
}

export type { WorkflowStage, WorkflowTemplate };

export const parseWorkflowSteps = (data: any[]): WorkflowStage[] => {
  if (!Array.isArray(data)) return [];
  
  return data.map(step => ({
    id: step.id || crypto.randomUUID(),
    name: step.name || '',
    type: step.type || 'TASK',
    order: step.order || 0,
    config: step.config || {},
    description: step.description
  }));
};

export const serializeWorkflowSteps = (steps: WorkflowStage[]): any[] => {
  return steps.map(step => ({
    ...step,
    id: step.id.toString(),
    type: step.type.toString(),
    order: Number(step.order),
    config: step.config || {}
  }));
};