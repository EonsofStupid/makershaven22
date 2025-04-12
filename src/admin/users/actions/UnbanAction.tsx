
import React from 'react';
import { EyeOff } from "lucide-react";
import { DropdownMenuItem } from "../../../shared/ui/dropdown-menu";
import { toast } from "sonner";

interface UnbanActionProps {
  userId: string;
  onSuccess?: () => void;
}

export const UnbanAction = ({ userId, onSuccess }: UnbanActionProps) => {
  const handleUnban = async () => {
    try {
      // TODO: Update this once Supabase client is properly set up
      const supabase = {
        from: (table: string) => ({
          update: (data: any) => ({
            eq: (field: string, value: any) => Promise.resolve({ error: null })
          })
        })
      };
      
      const { error } = await supabase
        .from('profiles')
        .update({ 
          is_banned: false,
          ban_reason: null,
          banned_at: null,
          banned_by: null
        })
        .eq('id', userId);

      if (error) throw error;

      toast.success('User has been unbanned');
      onSuccess?.();
    } catch (error) {
      console.error('Error unbanning user:', error);
      toast.error('Failed to unban user');
    }
  };

  return (
    <DropdownMenuItem onClick={handleUnban}>
      <EyeOff className="mr-2 h-4 w-4" />
      Unban User
    </DropdownMenuItem>
  );
};
