import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface RateLimitRecord {
  user_id: string;
  action: string;
  count: number;
  last_reset: string;
}

const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute in milliseconds

export const checkRateLimit = async (
  userId: string,
  action: string,
  limit: number
): Promise<boolean> => {
  try {
    const now = new Date().toISOString();
    const windowStart = new Date(Date.now() - RATE_LIMIT_WINDOW).toISOString();

    // Get current rate limit record
    const { data: records, error: fetchError } = await supabase
      .from('rate_limits')
      .select('*')
      .eq('user_id', userId)
      .eq('action', action)
      .gte('last_reset', windowStart)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') {
      console.error('Error checking rate limit:', fetchError);
      return true; // Allow action on error to prevent blocking users
    }

    const record = records as RateLimitRecord;

    if (!record) {
      // Create new rate limit record
      const { error: insertError } = await supabase
        .from('rate_limits')
        .insert({
          user_id: userId,
          action,
          count: 1,
          last_reset: now
        });

      if (insertError) {
        console.error('Error creating rate limit record:', insertError);
        return true;
      }

      return true;
    }

    if (record.count >= limit) {
      toast.error(`Rate limit exceeded for ${action}. Please try again later.`);
      return false;
    }

    // Update existing record
    const { error: updateError } = await supabase
      .from('rate_limits')
      .update({
        count: record.count + 1,
        last_reset: now
      })
      .eq('user_id', userId)
      .eq('action', action);

    if (updateError) {
      console.error('Error updating rate limit record:', updateError);
      return true;
    }

    return true;
  } catch (error) {
    console.error('Rate limiting error:', error);
    return true; // Allow action on error to prevent blocking users
  }
};

export const resetRateLimit = async (
  userId: string,
  action: string
): Promise<void> => {
  try {
    const { error } = await supabase
      .from('rate_limits')
      .delete()
      .eq('user_id', userId)
      .eq('action', action);

    if (error) {
      console.error('Error resetting rate limit:', error);
    }
  } catch (error) {
    console.error('Error resetting rate limit:', error);
  }
};

export const getRateLimitStatus = async (
  userId: string,
  action: string
): Promise<number> => {
  try {
    const windowStart = new Date(Date.now() - RATE_LIMIT_WINDOW).toISOString();

    const { data: record, error } = await supabase
      .from('rate_limits')
      .select('count')
      .eq('user_id', userId)
      .eq('action', action)
      .gte('last_reset', windowStart)
      .single();

    if (error) {
      console.error('Error getting rate limit status:', error);
      return 0;
    }

    return record?.count || 0;
  } catch (error) {
    console.error('Error getting rate limit status:', error);
    return 0;
  }
};
