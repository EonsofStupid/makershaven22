import { atom } from 'jotai';

interface WorkflowState {
  activeWorkflows: Record<string, any>;
  workflowHistory: Record<string, any[]>;
}

const initialWorkflowState: WorkflowState = {
  activeWorkflows: {},
  workflowHistory: {},
};

export const workflowStateAtom = atom<WorkflowState>(initialWorkflowState);

export const setActiveWorkflowAtom = atom(
  null,
  (get, set, { id, data }: { id: string; data: any }) => {
    const currentState = get(workflowStateAtom);
    set(workflowStateAtom, {
      ...currentState,
      activeWorkflows: { ...currentState.activeWorkflows, [id]: data },
    });
  }
);

export const addToWorkflowHistoryAtom = atom(
  null,
  (get, set, { id, data }: { id: string; data: any }) => {
    const currentState = get(workflowStateAtom);
    set(workflowStateAtom, {
      ...currentState,
      workflowHistory: {
        ...currentState.workflowHistory,
        [id]: [...(currentState.workflowHistory[id] || []), data],
      },
    });
  }
);

export const clearWorkflowHistoryAtom = atom(
  null,
  (get, set, id: string) => {
    const currentState = get(workflowStateAtom);
    const { [id]: _, ...restHistory } = currentState.workflowHistory;
    set(workflowStateAtom, {
      ...currentState,
      workflowHistory: restHistory,
    });
  }
);

export const resetWorkflowAtom = atom(
  null,
  (_get, set) => {
    set(workflowStateAtom, initialWorkflowState);
  }
);