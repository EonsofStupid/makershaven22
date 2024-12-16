import { create } from 'zustand';

interface RedisStatus {
  isConnected: boolean;
  error: string | null;
  lastChecked?: Date;
}

interface RedisConfig {
  enabled: boolean;
  host: string;
  port: number;
  password?: string;
  ttl: number;
  maxMemory: number;
  restrictedMode: boolean;
  features: {
    sessionManagement: boolean;
    caching: boolean;
    realTimeUpdates: boolean;
    rateLimit: boolean;
  };
}

interface RedisStore {
  status: RedisStatus;
  config: RedisConfig;
  updateStatus: (status: Partial<RedisStatus>) => void;
  updateConfig: (config: Partial<RedisConfig>) => void;
  toggleFeature: (feature: keyof RedisConfig['features']) => void;
}

export const useRedisStore = create<RedisStore>((set) => ({
  status: {
    isConnected: false,
    error: null
  },
  config: {
    enabled: false,
    host: 'localhost',
    port: 6379,
    ttl: 3600,
    maxMemory: 512,
    restrictedMode: false,
    features: {
      sessionManagement: true,
      caching: true,
      realTimeUpdates: true,
      rateLimit: true
    }
  },
  updateStatus: (status) => set((state) => ({
    status: { ...state.status, ...status }
  })),
  updateConfig: (config) => set((state) => ({
    config: { ...state.config, ...config }
  })),
  toggleFeature: (feature) => set((state) => ({
    config: {
      ...state.config,
      features: {
        ...state.config.features,
        [feature]: !state.config.features[feature]
      }
    }
  }))
}));