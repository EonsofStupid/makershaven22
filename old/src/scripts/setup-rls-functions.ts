
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const setupRlsFunctions = async () => {
  const loadingToast = toast.loading('Setting up RLS functions...');
  
  try {
    // Function to enable RLS
    await supabase.rpc('create_enable_rls_function');
    
    // Function to create public read policy
    await supabase.rpc('create_public_read_policy_function');
    
    // Function to create user update policy
    await supabase.rpc('create_user_update_policy_function');
    
    // Function to create user insert policy
    await supabase.rpc('create_user_insert_policy_function');
    
    // Function to create user delete policy
    await supabase.rpc('create_user_delete_policy_function');
    
    // Function to create admin policy
    await supabase.rpc('create_admin_policy_function');
    
    toast.success('RLS functions set up successfully', {
      id: loadingToast
    });
    return true;
  } catch (error) {
    console.error('Error setting up RLS functions:', error);
    toast.error('Failed to set up RLS functions', {
      id: loadingToast
    });
    return false;
  }
};
