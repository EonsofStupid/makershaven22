import { WorkflowStage, WorkflowTemplate } from './types';

export const validateStage = (stage: WorkflowStage): boolean => {
  return !!(stage.name && stage.type && typeof stage.order === 'number');
};

export const validateWorkflow = (workflow: WorkflowTemplate): boolean => {
  return !!(
    workflow.name &&
    Array.isArray(workflow.stages) &&
    workflow.stages.every(validateStage)
  );
};