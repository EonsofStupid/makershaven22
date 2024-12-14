import { useAtom } from 'jotai';
import { useCoreStore } from '../core-store';
import { useWorkflowStore } from '../workflow-store';
import { appReadyAtom, maintenanceModeAtom, globalErrorAtom, globalLoadingAtom } from '../atoms/core/core-atoms';
import { workflowStateAtom, setActiveWorkflowAtom } from '../atoms/workflow/workflow-atoms';

export const useStore = () => {
  // Core state
  const [isReady] = useAtom(appReadyAtom);
  const [isMaintenanceMode] = useAtom(maintenanceModeAtom);
  const [error] = useAtom(globalErrorAtom);
  const [isLoading] = useAtom(globalLoadingAtom);

  // Workflow state
  const [workflowState] = useAtom(workflowStateAtom);
  const [, setActiveWorkflow] = useAtom(setActiveWorkflowAtom);

  return {
    // Core state and actions
    isReady,
    isMaintenanceMode,
    error,
    isLoading,
    setReady: useCoreStore.getState().setReady,
    setMaintenanceMode: useCoreStore.getState().setMaintenanceMode,
    setError: useCoreStore.getState().setError,
    setLoading: useCoreStore.getState().setLoading,
    resetCore: useCoreStore.getState().reset,

    // Workflow state and actions
    workflowState,
    setActiveWorkflow,
    addToHistory: useWorkflowStore.getState().addToHistory,
    clearHistory: useWorkflowStore.getState().clearHistory,
    resetWorkflow: useWorkflowStore.getState().reset,
  };
};