import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useWorkflowStore } from '@/lib/store/workflow-store';
import { WorkflowTemplate, WorkflowStage } from '@/lib/store/types/workflow';
import { toast } from 'sonner';

export const useWorkflowManagement = () => {
  const queryClient = useQueryClient();
  const { setWorkflows, setActiveWorkflow, setLoading, setError } = useWorkflowStore();

  const workflowsQuery = useQuery({
    queryKey: ['workflows'],
    queryFn: async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('cms_workflows')
          .select('*')
          .order('updated_at', { ascending: false });

        if (error) throw error;

        const workflows = data.map(workflow => ({
          ...workflow,
          stages: Array.isArray(workflow.stages) ? workflow.stages : [],
          steps: Array.isArray(workflow.steps) ? workflow.steps : []
        })) as WorkflowTemplate[];

        setWorkflows(workflows);
        setLoading(false);
        return workflows;
      } catch (error) {
        setError(error as Error);
        throw error;
      }
    }
  });

  const createWorkflow = useMutation({
    mutationFn: async (workflow: Partial<WorkflowTemplate>) => {
      const { data, error } = await supabase
        .from('cms_workflows')
        .insert([{
          name: workflow.name,
          description: workflow.description,
          stages: workflow.stages || [],
          steps: workflow.steps || [],
          is_active: workflow.is_active ?? true
        }])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['workflows'] });
      setActiveWorkflow(data as WorkflowTemplate);
      toast.success('Workflow created successfully');
    },
    onError: (error) => {
      console.error('Error creating workflow:', error);
      toast.error('Failed to create workflow');
      setError(error as Error);
    }
  });

  return {
    workflowsQuery,
    createWorkflow
  };
};