import { useWorkflowStore } from '@/lib/store/workflow-store';
import type { WorkflowTemplate } from '@/lib/types/database/tables/workflow';

export const useWorkflowManagement = () => {
  const {
    workflows,
    activeWorkflow,
    isLoading,
    error,
    initialize,
    handleWorkflowUpdate,
    setActiveWorkflow,
    setError
  } = useWorkflowStore();

  const handleCreateWorkflow = async (workflow: Partial<WorkflowTemplate>) => {
    try {
      if (!workflow.name) {
        throw new Error('Workflow name is required');
      }

      const newWorkflow: WorkflowTemplate = {
        ...workflow,
        id: crypto.randomUUID(),
        stages: workflow.stages || [],
        steps: workflow.steps || [],
        is_active: workflow.is_active ?? true,
        created_at: new Date().toISOString()
      } as WorkflowTemplate;

      await handleWorkflowUpdate(newWorkflow);
      return newWorkflow;
    } catch (error) {
      setError(error instanceof Error ? error : new Error('Failed to create workflow'));
      throw error;
    }
  };

  return {
    workflows,
    activeWorkflow,
    isLoading,
    error,
    initialize,
    handleCreateWorkflow,
    handleWorkflowUpdate,
    setActiveWorkflow
  };
};
