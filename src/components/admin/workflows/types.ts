import { Json } from '@/integrations/supabase/types';

export interface WorkflowStage {
  id: string;
  name: string;
  type: 'approval' | 'review' | 'task' | 'notification' | 'conditional';
  order: number;
  config: WorkflowStageConfig;
  description?: string;
}

export interface WorkflowTemplate {
  id: string;
  name: string;
  description?: string | null;
  steps: Json;
  stages?: WorkflowStage[];
  is_active: boolean;
  created_by?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface WorkflowStageConfig {
  timeLimit?: number;
  requiredApprovers?: number;
  customFields?: {
    name: string;
    type: 'text' | 'number' | 'date' | 'select';
    options?: string[];
    required?: boolean;
  }[];
  autoAssignment?: {
    type: 'user' | 'role' | 'group';
    value: string;
  };
  notifications?: {
    onStart?: boolean;
    onComplete?: boolean;
    reminderInterval?: number;
  };
}

export interface ImportWizardProps {
  type: 'page' | 'theme' | 'template' | 'csv';
  acceptedTypes?: string[];
  onImport: (files: File[]) => void;
}

export interface ImportConfig {
  type: string;
  schema: {
    type: string;
    required: string[];
    properties: Record<string, any>;
  };
  validator: (data: any) => boolean;
}

export interface ImportValidationResult {
  isValid: boolean;
  errors?: string[];
}

export const validateStage = (stage: WorkflowStage): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!stage.name.trim()) {
    errors.push('Stage name is required');
  }

  switch (stage.type) {
    case 'approval':
      if (!stage.config.requiredApprovers || stage.config.requiredApprovers < 1) {
        errors.push('At least one approver is required');
      }
      break;
    case 'task':
      if (stage.config.customFields?.some(field => !field.name)) {
        errors.push('All custom fields must have a name');
      }
      break;
    case 'conditional':
      if (!stage.config.conditions?.rules?.length) {
        errors.push('Conditional stages must have at least one rule');
      }
      break;
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

export const parseStages = (data: Json): WorkflowStage[] => {
  if (!Array.isArray(data)) return [];
  
  return data.map(stage => ({
    id: stage.id || crypto.randomUUID(),
    name: stage.name || '',
    type: stage.type || 'task',
    order: stage.order || 0,
    config: stage.config || {},
    description: stage.description
  }));
};

export const serializeStages = (stages: WorkflowStage[]): Json => {
  return stages as unknown as Json;
};