import { create } from 'zustand';
import type { RedisState } from '@/lib/types/store-types';

export const useRedisStore = create<RedisState>((set) => ({
  config: {
    enabled: false,
    host: 'localhost',
    port: 6379,
    password: '',
    ttl: 3600,
    maxMemory: 128,
    restrictedMode: false,
    features: {
      sessionManagement: false,
      caching: false,
      realTimeUpdates: false,
      rateLimit: false
    }
  },
  updateConfig: (updates) => 
    set((state) => ({
      config: { ...state.config, ...updates }
    })),
  toggleFeature: (feature) =>
    set((state) => ({
      config: {
        ...state.config,
        features: {
          ...state.config.features,
          [feature]: !state.config.features[feature]
        }
      }
    }))
}));