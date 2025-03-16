
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

// This function will re-apply RLS policies in smaller batches to avoid deadlocks
export const reApplyRlsPolicies = async () => {
  try {
    // First, enable RLS if not already enabled
    await supabase.rpc('enable_rls_on_printer_builds');
    console.log('RLS enabled on printer_builds table');
    
    // Apply the public read policy
    await supabase.rpc('create_public_read_policy');
    console.log('Public read policy created');
    
    // Apply the user update policy
    await supabase.rpc('create_user_update_policy');
    console.log('User update policy created');
    
    // Apply the user insert policy
    await supabase.rpc('create_user_insert_policy');
    console.log('User insert policy created');
    
    // Apply the user delete policy
    await supabase.rpc('create_user_delete_policy');
    console.log('User delete policy created');
    
    // Apply the admin policy
    await supabase.rpc('create_admin_policy');
    console.log('Admin policy created');
    
    toast.success('RLS policies applied successfully');
    return true;
  } catch (error) {
    console.error('Error applying RLS policies:', error);
    toast.error('Failed to apply RLS policies');
    return false;
  }
};
