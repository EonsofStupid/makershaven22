
import { useState } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useProfiles, Profile } from './useProfiles';
import { UserRole } from '@/lib/types/enums';

interface UpdateProfileParams {
  id: string;
  role?: UserRole;
  display_name?: string;
  bio?: string;
  avatar_url?: string;
  [key: string]: any;
}

export const useUserManagement = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { data: profiles, refetch } = useProfiles();

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
  
  return {
    isLoading,
    getProfile,
    updateProfile,
    changeRole,
    banUser,
    unbanUser
  };
};
