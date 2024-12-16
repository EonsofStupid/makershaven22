import { create } from 'zustand';

interface WorkflowState {
  activeWorkflowId: string | null;
  workflows: Record<string, any>;
  history: Record<string, { type: string; timestamp: string }[]>;
  setActiveWorkflow: (id: string, data: any) => void;
  addToHistory: (workflowId: string, entry: { type: string; timestamp: string }) => void;
}

export const useWorkflowStore = create<WorkflowState>((set) => ({
  activeWorkflowId: null,
  workflows: {},
  history: {},
  setActiveWorkflow: (id, data) => set((state) => ({
    activeWorkflowId: id,
    workflows: {
      ...state.workflows,
      [id]: data
    }
  })),
  addToHistory: (workflowId, entry) => set((state) => ({
    history: {
      ...state.history,
      [workflowId]: [...(state.history[workflowId] || []), entry]
    }
  }))
}));