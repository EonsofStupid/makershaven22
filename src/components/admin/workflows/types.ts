import { Json } from "@/integrations/supabase/types";

export type WorkflowStageType = 'approval' | 'review' | 'task' | 'notification' | 'conditional';

export interface WorkflowStage {
  id: string;
  name: string;
  description?: string;
  type: WorkflowStageType;
  order: number;
  config: Record<string, any>;
}

export interface WorkflowTemplate {
  id?: string;
  name: string;
  description: string | null;
  steps: WorkflowStage[];
  is_active: boolean;
  created_at?: string;
  created_by?: string;
  updated_at?: string;
}

export interface WorkflowFormData {
  name: string;
  description: string;
  steps: WorkflowStage[];
  is_active: boolean;
}

export interface SecurityLog {
  id: string;
  user_id: string | null;
  event_type: string;
  severity: string;
  details: Json;
  ip_address: string | null;
  user_agent: string | null;
  created_at: string | null;
  profiles?: {
    username: string | null;
    display_name: string | null;
  } | null;
}

// Helper functions
export const convertStepsToJson = (steps: WorkflowStage[]): Json => {
  return JSON.parse(JSON.stringify(steps)) as Json;
};

export const parseJsonToSteps = (json: Json): WorkflowStage[] => {
  if (!Array.isArray(json)) return [];
  return json.map((stage: any) => ({
    id: stage.id || crypto.randomUUID(),
    name: stage.name || '',
    description: stage.description || '',
    type: stage.type || 'task',
    order: stage.order || 0,
    config: stage.config || {}
  }));
};