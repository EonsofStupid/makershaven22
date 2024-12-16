import { create } from 'zustand';
import type { RedisConfig } from '@/components/admin/cache/types';

interface RedisState {
  config: RedisConfig;
  status: {
    isConnected: boolean;
    error: string | null;
  };
  setConfig: (config: Partial<RedisConfig>) => void;
  setStatus: (status: { isConnected: boolean; error: string | null }) => void;
}

export const useRedisStore = create<RedisState>((set) => ({
  config: {
    enabled: false,
    host: 'localhost',
    port: '6379',
    ttl: 3600,
    maxMemory: 128,
    restrictedMode: false,
    features: {
      sessionManagement: false,
      caching: false,
      realTimeUpdates: false
    }
  },
  status: {
    isConnected: false,
    error: null
  },
  setConfig: (config) => set((state) => ({
    config: { ...state.config, ...config }
  })),
  setStatus: (status) => set({ status })
}));