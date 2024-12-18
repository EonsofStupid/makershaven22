import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useWorkflowStore } from '@/lib/store/workflow-store';
import { toast } from 'sonner';

export const useWorkflowManagement = () => {
  const queryClient = useQueryClient();
  const { setActiveWorkflow } = useWorkflowStore();

  const workflowsQuery = useQuery(['workflows'], async () => {
    const { data, error } = await supabase.from('cms_workflows').select('*');
    if (error) throw error;
    return data;
  });

  const createWorkflow = useMutation(async (workflow) => {
    const { data, error } = await supabase.from('cms_workflows').insert(workflow).single();
    if (error) throw error;
    return data;
  }, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(['workflows']);
      setActiveWorkflow(data);
      toast.success('Workflow created successfully!');
    },
    onError: (error) => {
      console.error('Error creating workflow:', error);
      toast.error('Failed to create workflow.');
    },
  });

  return { workflowsQuery, createWorkflow };
};