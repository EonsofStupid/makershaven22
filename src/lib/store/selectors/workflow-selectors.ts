import { GlobalState } from '../types';
import { WorkflowTemplate } from '../types/store/workflow';

export const selectActiveWorkflows = (state: GlobalState): Record<string, WorkflowTemplate> => 
  state.activeWorkflows;

export const selectWorkflowById = (state: GlobalState, id: string): WorkflowTemplate | null => 
  state.activeWorkflows[id] || null;

export const selectWorkflowHistory = (state: GlobalState) => 
  state.workflowHistory;

export const selectWorkflowIsLoading = (state: GlobalState) => 
  state.isLoading;

export const selectWorkflowError = (state: GlobalState) => 
  state.error;

export const selectActiveWorkflowStages = (state: GlobalState, workflowId: string) => 
  state.activeWorkflows[workflowId]?.stages || [];