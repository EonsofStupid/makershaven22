import { create } from 'zustand';
import type { RedisConfig } from '@/lib/types/store-types';

interface RedisState {
  config: RedisConfig;
  isLoading: boolean;
  error: Error | null;
  setConfig: (config: RedisConfig) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: Error | null) => void;
}

export const useRedisStore = create<RedisState>((set) => ({
  config: {
    enabled: false,
    host: 'localhost',
    port: 6379,
    ttl: 3600,
    maxMemory: 100,
    restrictedMode: false,
    features: {
      sessionManagement: true,
      caching: true,
      realTimeUpdates: false,
      rateLimit: false
    }
  },
  isLoading: false,
  error: null,
  setConfig: (config) => set({ config }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error })
}));