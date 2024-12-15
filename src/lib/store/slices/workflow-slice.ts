import { StateCreator } from 'zustand';
import { WorkflowState, WorkflowTemplate } from '../types/store/workflow';
import { GlobalState } from '../types';

export const createWorkflowSlice: StateCreator<
  GlobalState,
  [],
  [],
  WorkflowState
> = (set) => ({
  activeWorkflows: {},
  workflowHistory: {},
  isLoading: false,
  error: null,
  setActiveWorkflow: (id: string, workflow: WorkflowTemplate) => 
    set((state) => ({
      activeWorkflows: { ...state.activeWorkflows, [id]: workflow }
    })),
  addToHistory: (id: string, entry: any) => 
    set((state) => ({
      workflowHistory: {
        ...state.workflowHistory,
        [id]: [...(state.workflowHistory[id] || []), entry]
      }
    })),
  clearHistory: (id: string) => 
    set((state) => {
      const { [id]: _, ...rest } = state.workflowHistory;
      return { workflowHistory: rest };
    }),
  setLoading: (isLoading: boolean) => set({ isLoading }),
  setError: (error: Error | null) => set({ error }),
  reset: () => set({
    activeWorkflows: {},
    workflowHistory: {},
    isLoading: false,
    error: null
  })
});