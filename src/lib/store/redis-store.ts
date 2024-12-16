import { create } from 'zustand';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface RedisConfig {
  host: string;
  port: string | number;
  password?: string;
  status?: 'connected' | 'disconnected' | 'error';
  features?: {
    sessionManagement: boolean;
    caching: boolean;
    realTimeUpdates: boolean;
  };
}

interface RedisState {
  config: RedisConfig;
  isLoading: boolean;
  error: Error | null;
  updateConfig: (config: Partial<RedisConfig>) => Promise<void>;
  testConnection: () => Promise<void>;
  toggleFeature: (feature: keyof RedisConfig['features']) => void;
}

export const useRedisStore = create<RedisState>((set, get) => ({
  config: {
    host: 'localhost',
    port: 6379,
    features: {
      sessionManagement: false,
      caching: false,
      realTimeUpdates: false
    }
  },
  isLoading: false,
  error: null,

  updateConfig: async (newConfig) => {
    set({ isLoading: true });
    try {
      const { error } = await supabase.functions.invoke('test-redis-connection', {
        body: { ...get().config, ...newConfig }
      });

      if (error) throw error;

      set(state => ({
        config: { ...state.config, ...newConfig },
        error: null
      }));
      toast.success('Redis configuration updated');
    } catch (error) {
      console.error('Error updating Redis config:', error);
      set({ error: error as Error });
      toast.error('Failed to update Redis configuration');
    } finally {
      set({ isLoading: false });
    }
  },

  testConnection: async () => {
    set({ isLoading: true });
    try {
      const { error } = await supabase.functions.invoke('test-redis-connection', {
        body: get().config
      });

      if (error) throw error;

      set(state => ({
        config: { ...state.config, status: 'connected' },
        error: null
      }));
      toast.success('Redis connection successful');
    } catch (error) {
      console.error('Error testing Redis connection:', error);
      set(state => ({
        config: { ...state.config, status: 'error' },
        error: error as Error
      }));
      toast.error('Redis connection failed');
    } finally {
      set({ isLoading: false });
    }
  },

  toggleFeature: (feature) => {
    set(state => ({
      config: {
        ...state.config,
        features: {
          ...state.config.features,
          [feature]: !state.config.features?.[feature]
        }
      }
    }));
  }
}));