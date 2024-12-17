```typescript
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { WORKFLOWS_QUERY_KEY } from './constants';
import { toast } from 'sonner';

export const useCreateWorkflow = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ name, description, steps, triggers }: {
      name: string;
      description?: string;
      steps: any[];
      triggers?: any[];
    }) => {
      const { data, error } = await supabase
        .from('cms_workflows')
        .insert({
          name,
          description,
          steps,
          triggers: triggers || [],
          created_by: (await supabase.auth.getUser()).data.user?.id,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(WORKFLOWS_QUERY_KEY);
      toast.success('Workflow created successfully');
    },
    onError: () => {
      toast.error('Failed to create workflow');
    },
  });
};

export const useUpdateWorkflow = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: {
      id: string;
      name?: string;
      description?: string;
      steps?: any[];
      triggers?: any[];
    }) => {
      const { data, error } = await supabase
        .from('cms_workflows')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(WORKFLOWS_QUERY_KEY);
      toast.success('Workflow updated successfully');
    },
    onError: () => {
      toast.error('Failed to update workflow');
    },
  });
};

export const useDeleteWorkflow = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('cms_workflows')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(WORKFLOWS_QUERY_KEY);
      toast.success('Workflow deleted successfully');
    },
    onError: () => {
      toast.error('Failed to delete workflow');
    },
  });
};
