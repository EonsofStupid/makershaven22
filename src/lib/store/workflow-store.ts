import { atom } from 'jotai';

interface WorkflowState {
  activeWorkflowId: string | null;
  workflows: Record<string, any>;
  history: Record<string, { type: string; timestamp: string }[]>;
}

const initialState: WorkflowState = {
  activeWorkflowId: null,
  workflows: {},
  history: {}
};

export const workflowStateAtom = atom<WorkflowState>(initialState);

export const useWorkflowStore = () => {
  const setActiveWorkflow = (id: string, data: any) => {
    workflowStateAtom.write((prev) => ({
      ...prev,
      activeWorkflowId: id,
      workflows: {
        ...prev.workflows,
        [id]: data
      }
    }));
  };

  const addToHistory = (workflowId: string, entry: { type: string; timestamp: string }) => {
    workflowStateAtom.write((prev) => ({
      ...prev,
      history: {
        ...prev.history,
        [workflowId]: [...(prev.history[workflowId] || []), entry]
      }
    }));
  };

  return {
    setActiveWorkflow,
    addToHistory
  };
};