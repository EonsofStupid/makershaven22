
import { WorkflowStage } from './stage';
import { WorkflowTemplate } from './template';

export interface WorkflowState {
  templates: WorkflowTemplate[];
  activeTemplate: WorkflowTemplate | null;
  isLoading: boolean;
  error: Error | null;
  setTemplates: (templates: WorkflowTemplate[]) => void;
  setActiveTemplate: (template: WorkflowTemplate | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: Error | null) => void;
  createTemplate: (template: WorkflowTemplate) => Promise<WorkflowTemplate>;
  updateTemplate: (template: WorkflowTemplate) => Promise<WorkflowTemplate>;
  deleteTemplate: (id: string) => Promise<void>;
  fetchTemplates: () => Promise<WorkflowTemplate[]>;
  fetchTemplateById: (id: string) => Promise<WorkflowTemplate>;
}

export type StageUpdateFunction = (stageId: string, updates: Partial<WorkflowStage>) => void;

export interface StageConfigUpdateProps {
  stage: WorkflowStage;
  onUpdate: (updates: Partial<WorkflowStage>) => void;
}
