import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useWorkflowStore } from '@/lib/store/workflow-store';
import { toast } from 'sonner';
import { UserRole } from '@/lib/types/auth';
import { UserProfile, UserActivity } from '@/components/admin/users/types';

export const useUserManagement = () => {
  const queryClient = useQueryClient();
  const { setActiveWorkflow, addToHistory } = useWorkflowStore();

  const { data: users, isLoading, error, refetch } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as UserProfile[];
    }
  });

  const updateRole = useMutation({
    mutationFn: async ({ userId, newRole }: { userId: string; newRole: UserRole }) => {
      const { data, error } = await supabase
        .from('profiles')
        .update({ role: newRole })
        .eq('id', userId)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success('User role updated successfully');
    },
    onError: (error) => {
      console.error('Error updating role:', error);
      toast.error('Failed to update user role');
    }
  });

  const getUserActivity = async (userId: string) => {
    const { data, error } = await supabase
      .from('user_activity')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as UserActivity[];
  };

  const getUserCMSActivity = async (userId: string) => {
    const { data, error } = await supabase
      .from('user_activity_cms')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  };

  return {
    users,
    isLoading,
    error,
    refetch,
    updateRole,
    getUserActivity,
    getUserCMSActivity
  };
};