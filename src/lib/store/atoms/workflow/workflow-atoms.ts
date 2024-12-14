import { atom } from 'jotai';
import { useWorkflowStore } from '../../workflow-store';
import type { WorkflowTemplate } from '@/components/admin/workflows/types';

export const workflowStateAtom = atom(
  (get) => ({
    activeWorkflows: useWorkflowStore.getState().activeWorkflows,
    workflowHistory: useWorkflowStore.getState().workflowHistory
  })
);

export const setActiveWorkflowAtom = atom(
  null,
  (_get, _set, { id, data }: { id: string; data: WorkflowTemplate }) => {
    useWorkflowStore.getState().setActiveWorkflow(id, data);
  }
);

export const addToWorkflowHistoryAtom = atom(
  null,
  (_get, _set, { id, data }: { id: string; data: any }) => {
    useWorkflowStore.getState().addToHistory(id, data);
  }
);

export const clearWorkflowHistoryAtom = atom(
  null,
  (_get, _set, id: string) => {
    useWorkflowStore.getState().clearHistory(id);
  }
);

export const resetWorkflowAtom = atom(
  null,
  (_get, _set) => {
    useWorkflowStore.getState().reset();
  }
);