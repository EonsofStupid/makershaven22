import { create } from 'zustand';
import { WorkflowState, WorkflowTemplate } from './types/workflow';

export const useWorkflowStore = create<WorkflowState>((set) => ({
  workflows: [],
  activeWorkflow: null,
  isLoading: false,
  error: null,

  setWorkflows: (workflows) => set({ workflows }),
  setActiveWorkflow: (workflow) => set({ activeWorkflow: workflow }),
  addWorkflow: (workflow) => set((state) => ({ 
    workflows: [...state.workflows, workflow] 
  })),
  updateWorkflow: (id, updates) => set((state) => ({
    workflows: state.workflows.map((w) => 
      w.id === id ? { ...w, ...updates } : w
    )
  })),
  deleteWorkflow: (id) => set((state) => ({
    workflows: state.workflows.filter((w) => w.id !== id)
  })),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error })
}));