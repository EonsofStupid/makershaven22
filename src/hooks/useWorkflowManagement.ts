import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useWorkflowStore } from '@/lib/store/workflow-store';
import { toast } from 'sonner';
import { parseWorkflowSteps, serializeWorkflowSteps } from '@/lib/types/workflow';
import type { WorkflowTemplate } from '@/lib/types/workflow';

export const useWorkflowManagement = () => {
  const queryClient = useQueryClient();
  const { setActiveWorkflow, addToHistory } = useWorkflowStore();

  const { data: workflows, isLoading, error } = useQuery({
    queryKey: ['workflows'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('workflow_templates')
        .select(`
          *,
          created_by (
            username,
            display_name
          )
        `)
        .order('updated_at', { ascending: false });

      if (error) throw error;

      return data.map(workflow => ({
        ...workflow,
        stages: parseWorkflowSteps(workflow.steps)
      })) as WorkflowTemplate[];
    }
  });

  const createWorkflow = useMutation({
    mutationFn: async (data: Partial<WorkflowTemplate>) => {
      const { data: newWorkflow, error } = await supabase
        .from('workflow_templates')
        .insert({
          name: data.name,
          description: data.description,
          steps: serializeWorkflowSteps(data.stages || []),
          is_active: data.is_active ?? true,
          created_by: (await supabase.auth.getUser()).data.user?.id
        })
        .select()
        .single();

      if (error) throw error;
      return newWorkflow;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['workflows'] });
      setActiveWorkflow({ id: data.id, data });
      addToHistory({ 
        id: data.id, 
        data: { action: 'created', timestamp: new Date().toISOString() }
      });
      toast.success('Workflow created successfully');
    },
    onError: (error) => {
      console.error('Error creating workflow:', error);
      toast.error('Failed to create workflow');
    }
  });

  const updateWorkflow = useMutation({
    mutationFn: async ({ id, ...updates }: Partial<WorkflowTemplate> & { id: string }) => {
      const { data, error } = await supabase
        .from('workflow_templates')
        .update({
          ...updates,
          steps: updates.stages ? serializeWorkflowSteps(updates.stages) : undefined
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['workflows'] });
      setActiveWorkflow({ id: data.id, data });
      addToHistory({ 
        id: data.id, 
        data: { action: 'updated', timestamp: new Date().toISOString() }
      });
      toast.success('Workflow updated successfully');
    },
    onError: (error) => {
      console.error('Error updating workflow:', error);
      toast.error('Failed to update workflow');
    }
  });

  const deleteWorkflow = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('workflow_templates')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return id;
    },
    onSuccess: (id) => {
      queryClient.invalidateQueries({ queryKey: ['workflows'] });
      addToHistory({ 
        id, 
        data: { action: 'deleted', timestamp: new Date().toISOString() }
      });
      toast.success('Workflow deleted successfully');
    },
    onError: (error) => {
      console.error('Error deleting workflow:', error);
      toast.error('Failed to delete workflow');
    }
  });

  return {
    workflows,
    isLoading,
    error,
    createWorkflow,
    updateWorkflow,
    deleteWorkflow
  };
};