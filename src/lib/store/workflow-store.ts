import { create } from 'zustand';
import type { WorkflowTemplate } from '@/lib/types/workflow';

interface WorkflowStore {
  activeWorkflows: Record<string, WorkflowTemplate>;
  workflowHistory: Record<string, Array<{ action: string; timestamp: string }>>;
  setActiveWorkflow: (update: { id: string; data: WorkflowTemplate }) => void;
  addToHistory: (update: { id: string; data: { action: string; timestamp: string } }) => void;
}

export const useWorkflowStore = create<WorkflowStore>((set) => ({
  activeWorkflows: {},
  workflowHistory: {},
  setActiveWorkflow: ({ id, data }) =>
    set((state) => ({
      activeWorkflows: {
        ...state.activeWorkflows,
        [id]: data
      }
    })),
  addToHistory: ({ id, data }) =>
    set((state) => ({
      workflowHistory: {
        ...state.workflowHistory,
        [id]: [...(state.workflowHistory[id] || []), data]
      }
    }))
}));