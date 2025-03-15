
import { useState } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useProfiles, Profile } from './useProfiles';
import { UserRole } from '@/lib/types/enums';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface UpdateProfileParams {
  id: string;
  role?: UserRole;
  display_name?: string;
  bio?: string;
  avatar_url?: string;
  [key: string]: any;
}

interface UpdateRoleParams {
  userId: string;
  newRole: UserRole;
}

export const useUserManagement = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { data: profiles, refetch, isLoading: isProfilesLoading, error } = useProfiles();
  const queryClient = useQueryClient();

  const getProfile = async (userId: string) => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;
      return data as Profile;
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast.error('Failed to fetch user profile');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (params: UpdateProfileParams) => {
    try {
      setIsLoading(true);
      const { id, ...updateData } = params;
      
      const { data, error } = await supabase
        .from('profiles')
        .update(updateData)
        .eq('id', id)
        .select();

      if (error) throw error;
      
      toast.success('Profile updated successfully');
      await refetch();
      return data[0] as Profile;
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const updateRole = useMutation({
    mutationFn: async ({ userId, newRole }: UpdateRoleParams) => {
      const { data, error } = await supabase
        .from('profiles')
        .update({ role: newRole })
        .eq('id', userId)
        .select();

      if (error) throw error;
      return data[0] as Profile;
    },
    onSuccess: () => {
      toast.success('User role updated successfully');
      queryClient.invalidateQueries({ queryKey: ['admin-profiles'] });
    },
    onError: (error) => {
      console.error('Error updating role:', error);
      toast.error('Failed to update user role');
    }
  });

  const changeRole = async (userId: string, newRole: UserRole) => {
    return await updateProfile({ id: userId, role: newRole });
  };

  const banUser = async (userId: string, reason: string) => {
    try {
      setIsLoading(true);
      const { error } = await supabase.rpc('ban_user', {
        p_user_id: userId,
        p_reason: reason
      });

      if (error) throw error;
      
      toast.success('User banned successfully');
      await refetch();
      return true;
    } catch (error) {
      console.error('Error banning user:', error);
      toast.error('Failed to ban user');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const unbanUser = async (userId: string) => {
    return await updateProfile({
      id: userId,
      is_banned: false,
      ban_reason: null,
      banned_at: null,
      banned_by: null
    });
  };

  const getUserActivity = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('user_activity')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching user activity:', error);
      throw error;
    }
  };

  const getUserCMSActivity = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('user_activity_cms')
        .select('*, cms_content:content_id(title, type)')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching user CMS activity:', error);
      throw error;
    }
  };
  
  return {
    users: profiles,
    isLoading: isLoading || isProfilesLoading,
    error,
    refetch,
    getProfile,
    updateProfile,
    updateRole,
    changeRole,
    banUser,
    unbanUser,
    getUserActivity,
    getUserCMSActivity
  };
};
