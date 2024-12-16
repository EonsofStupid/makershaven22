// Refactored `useRedisConnection` hook to use Zustand and align with `auth-store.ts`

import { useCallback } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useRedisStore } from '@/zustand/stores/redisStore';

export const useRedisConnection = () => {
  const {
    config,
    status,
    updateStatus
  } = useRedisStore();

  const testConnection = useCallback(async () => {
    if (!config.enabled) {
      updateStatus({
        isConnected: false,
        error: null,
        lastChecked: new Date()
      });
      return;
    }

    try {
      const { data, error } = await supabase.functions.invoke('test-redis-connection', {
        body: { config }
      });

      if (error) throw error;

      updateStatus({
        isConnected: data.connected,
        error: null,
        lastChecked: new Date()
      });

      toast.success('Redis connection successful');
    } catch (error) {
      console.error('Redis connection error:', error);
      updateStatus({
        isConnected: false,
        error: error instanceof Error ? error.message : 'Failed to connect to Redis',
        lastChecked: new Date()
      });
      toast.error('Redis connection failed', {
        description: error instanceof Error ? error.message : 'Failed to connect to Redis'
      });
    }
  }, [config, updateStatus]);

  return {
    status,
    testConnection
  };
};
