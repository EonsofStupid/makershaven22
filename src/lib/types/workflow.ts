export type WorkflowStageType = 'APPROVAL' | 'REVIEW' | 'TASK' | 'NOTIFICATION' | 'CONDITIONAL';

export interface WorkflowStage {
  id: string;
  name: string;
  type: WorkflowStageType;
  order: number;
  config: WorkflowStageConfig;
  description?: string;
}

export interface WorkflowTemplate {
  id: string;
  name: string;
  description?: string;
  stages: WorkflowStage[];
  is_active: boolean;
  created_by?: string;
  created_at?: string;
  updated_at?: string;
  history?: WorkflowHistory[];
}

export interface WorkflowStageConfig {
  assignees?: string[];
  dueDate?: string;
  priority?: 'low' | 'medium' | 'high';
  notifications?: {
    email?: boolean;
    inApp?: boolean;
    onStart?: boolean;
    onComplete?: boolean;
    reminderInterval?: number;
  };
  conditions?: {
    type: 'AND' | 'OR';
    rules: Array<{
      field: string;
      operator: string;
      value: any;
    }>;
  };
  requiredApprovers?: number;
  timeLimit?: number;
  autoAssignment?: {
    type: 'user' | 'role' | 'group';
    value: string;
  };
  customFields?: Array<{
    name: string;
    type: 'text' | 'number' | 'date' | 'select';
    required: boolean;
    options?: string[]; // For select type fields
  }>;
}

export interface WorkflowHistory {
  type: string;
  timestamp: string;
  metadata?: Record<string, any>;
}

export interface WorkflowState {
  templates: WorkflowTemplate[];
  currentTemplate: WorkflowTemplate | null;
  isLoading: boolean;
  error: Error | null;
  setTemplates: (templates: WorkflowTemplate[]) => void;
  setCurrentTemplate: (template: WorkflowTemplate | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: Error | null) => void;
  fetchTemplates: () => Promise<void>;
  setActiveWorkflow: (id: string, workflow: WorkflowTemplate) => void;
  addToHistory: (id: string, entry: { type: string; timestamp: string }) => void;
}

export const validateStage = (stage: WorkflowStage): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!stage.name.trim()) {
    errors.push('Stage name is required');
  }

  if (!stage.type) {
    errors.push('Stage type is required');
  }

  // Validate config based on stage type
  switch (stage.type) {
    case 'APPROVAL':
      if (!stage.config.requiredApprovers || stage.config.requiredApprovers < 1) {
        errors.push('At least one approver is required for approval stages');
      }
      break;
    case 'TASK':
      if (stage.config.customFields?.some(field => !field.name)) {
        errors.push('All custom fields must have a name');
      }
      break;
    case 'CONDITIONAL':
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

export const serializeStages = (stages: WorkflowStage[]): any => {
  return stages.map(stage => ({
    ...stage,
    config: stage.config || {}
  }));
};

export const parseStages = (data: any): WorkflowStage[] => {
  if (!Array.isArray(data)) return [];
  
  return data.map(stage => ({
    id: stage.id || crypto.randomUUID(),
    name: stage.name || '',
    type: stage.type || 'TASK',
    order: stage.order || 0,
    config: stage.config || {},
    description: stage.description
  }));
};