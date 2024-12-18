import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useWorkflowStore } from '@/lib/store/workflow-store';
import { toast } from 'sonner';
import { WorkflowTemplate } from '@/integrations/supabase/types/workflow/types';

export const useWorkflowManagement = () => {
  const queryClient = useQueryClient();
  const { setActiveWorkflow } = useWorkflowStore();

  const workflowsQuery = useQuery({
    queryKey: ['workflows'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('cms_workflows')
        .select('*') as { data: WorkflowTemplate[]; error: any };
      
      if (error) throw error;
      return data;
    }
  });

  const createWorkflow = useMutation({
    mutationFn: async (workflow: Partial<WorkflowTemplate>) => {
      const { data, error } = await supabase
        .from('cms_workflows')
        .insert({ ...workflow, name: workflow.name || 'New Workflow' })
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['workflows'] });
      setActiveWorkflow(data.id, data as WorkflowTemplate);
      toast.success('Workflow created successfully!');
    },
    onError: (error) => {
      console.error('Error creating workflow:', error);
      toast.error('Failed to create workflow.');
    },
  });

  return { workflowsQuery, createWorkflow };
};