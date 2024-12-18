import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useWorkflowStore } from '@/lib/store/workflow-store';
import { toast } from 'sonner';
import { WorkflowTemplate } from '../types/workflow-types';
import { parseWorkflowStages, serializeWorkflowStages } from '../types/workflow-utils';

export const useWorkflowManagement = () => {
  const queryClient = useQueryClient();
  const { setActiveWorkflow } = useWorkflowStore();

  const workflowsQuery = useQuery({
    queryKey: ['workflows'],
    queryFn: async () => {
      console.log('Fetching workflows...');
      const { data, error } = await supabase
        .from('cms_workflows')
        .select('*');

      if (error) throw error;

      return data.map(workflow => ({
        ...workflow,
        stages: parseWorkflowStages(workflow.stages),
        steps: parseWorkflowStages(workflow.steps)
      })) as WorkflowTemplate[];
    }
  });

  const createWorkflow = useMutation({
    mutationFn: async (workflow: Partial<WorkflowTemplate>) => {
      const { data, error } = await supabase
        .from('cms_workflows')
        .insert({
          ...workflow,
          stages: serializeWorkflowStages(workflow.stages || []),
          steps: serializeWorkflowStages(workflow.steps || [])
        })
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