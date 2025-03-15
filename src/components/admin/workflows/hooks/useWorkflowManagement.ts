
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { 
  WorkflowTemplate, 
  WorkflowStage, 
  parseWorkflowStages, 
  serializeWorkflowStages 
} from '@/lib/types/workflow/types';

export const useWorkflowManagement = () => {
  const queryClient = useQueryClient();

  const workflowsQuery = useQuery({
    queryKey: ['workflows'],
    queryFn: async () => {
      console.log('Fetching workflows...');
      const { data, error } = await supabase
        .from('cms_workflows')
        .select('*');

      if (error) throw error;
      
      // Convert data from database to typed WorkflowTemplate objects
      return (data || []).map(item => ({
        id: item.id,
        name: item.name,
        description: item.description,
        // Parse JSON steps/stages to proper typed arrays
        steps: parseWorkflowStages(item.steps),
        stages: parseWorkflowStages(item.stages || []),
        is_active: item.is_active,
        created_by: item.created_by,
        // Ensure we properly handle these fields that might not exist
        created_at: item?.updated_at || null, // Use a fallback if the field doesn't exist
        updated_at: item.updated_at
      } as WorkflowTemplate));
    }
  });

  const createWorkflow = useMutation({
    mutationFn: async (workflow: Partial<WorkflowTemplate>) => {
      // Prepare data for Supabase by serializing arrays to JSON
      const workflowData = {
        name: workflow.name || '',
        description: workflow.description,
        stages: workflow.stages ? serializeWorkflowStages(workflow.stages) : [],
        steps: workflow.steps ? serializeWorkflowStages(workflow.steps) : [],
        is_active: workflow.is_active ?? true
      };

      const { data, error } = await supabase
        .from('cms_workflows')
        .insert(workflowData)
        .select()
        .single();

      if (error) throw error;
      
      // Return parsed data with proper types
      return {
        ...data,
        stages: parseWorkflowStages(data.stages || []),
        steps: parseWorkflowStages(data.steps)
      } as WorkflowTemplate;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workflows'] });
      toast.success('Workflow created successfully!');
    },
    onError: (error) => {
      console.error('Error creating workflow:', error);
      toast.error('Failed to create workflow.');
    },
  });

  return { workflowsQuery, createWorkflow };
};
