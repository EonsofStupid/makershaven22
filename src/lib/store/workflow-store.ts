import { create } from 'zustand';

interface WorkflowState {
  activeWorkflows: Record<string, any>;
  workflowHistory: Record<string, any[]>;
  setActiveWorkflow: (id: string, data: any) => void;
  addToHistory: (id: string, data: any) => void;
  clearHistory: (id: string) => void;
  reset: () => void;
}

const initialState = {
  activeWorkflows: {},
  workflowHistory: {}
};

export const useWorkflowStore = create<WorkflowState>((set) => ({
  ...initialState,
  setActiveWorkflow: (id, data) => 
    set((state) => ({
      activeWorkflows: { 
        ...state.activeWorkflows, 
        [id]: data 
      }
    })),
  addToHistory: (id, data) =>
    set((state) => ({
      workflowHistory: {
        ...state.workflowHistory,
        [id]: [...(state.workflowHistory[id] || []), data]
      }
    })),
  clearHistory: (id) =>
    set((state) => {
      const { [id]: _, ...rest } = state.workflowHistory;
      return { workflowHistory: rest };
    }),
  reset: () => set(initialState)
}));