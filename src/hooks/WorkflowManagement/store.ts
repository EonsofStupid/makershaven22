```typescript
import create from 'zustand';

interface WorkflowState {
  activeWorkflow: any;
  setActiveWorkflow: (id: string, workflow: any) => void;
  addToHistory: (id: string, event: any) => void;
}

export const useWorkflowStore = create<WorkflowState>((set) => ({
  activeWorkflow: null,
  setActiveWorkflow: (id, workflow) =>
    set((state) => ({ ...state, activeWorkflow: { id, ...workflow } })),
  addToHistory: (id, event) => {
    console.log('History updated:', { id, event });
  },
}));
