import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import type { WorkflowTemplate } from '@/components/admin/workflows/types';

interface WorkflowState {
  activeWorkflows: Record<string, WorkflowTemplate>;
  workflowHistory: Record<string, Array<{ action: string; timestamp: string }>>;
}

const initialState: WorkflowState = {
  activeWorkflows: {},
  workflowHistory: {}
};

export const workflowStateAtom = atomWithStorage<WorkflowState>('workflow-state', initialState);

export const setActiveWorkflowAtom = atom(
  null,
  (get, set, update: { id: string; data: WorkflowTemplate }) => {
    const current = get(workflowStateAtom);
    set(workflowStateAtom, {
      ...current,
      activeWorkflows: {
        ...current.activeWorkflows,
        [update.id]: update.data
      }
    });
  }
);

export const addToWorkflowHistoryAtom = atom(
  null,
  (get, set, update: { id: string; data: { action: string; timestamp: string } }) => {
    const current = get(workflowStateAtom);
    const existingHistory = current.workflowHistory[update.id] || [];
    
    set(workflowStateAtom, {
      ...current,
      workflowHistory: {
        ...current.workflowHistory,
        [update.id]: [...existingHistory, update.data]
      }
    });
  }
);