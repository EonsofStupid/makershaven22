import { Json, WorkflowStage, WorkflowTemplate } from "@/integrations/supabase/types";

export type { WorkflowStage, WorkflowTemplate };

export interface WorkflowFormData {
  name: string;
  description: string;
  steps: WorkflowStage[];
}

export interface WorkflowData {
  id: string;
  name: string;
  description: string | null;
  steps: Json;
  triggers?: Json;
  created_by?: string;
  updated_at?: string;
}

export interface ParsedWorkflowData extends Omit<WorkflowData, 'steps'> {
  steps: WorkflowStage[];
}

// Helper functions
export const parseWorkflowSteps = (steps: Json): WorkflowStage[] => {
  if (!Array.isArray(steps)) return [];
  return steps.map((step: any) => ({
    id: step.id || '',
    name: step.name || '',
    type: step.type || '',
    config: step.config || {},
    ...step
  }));
};

export const serializeWorkflowSteps = (steps: WorkflowStage[]): Json => {
  return steps as Json;
};