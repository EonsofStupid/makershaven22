import { create } from 'zustand';

interface RedisConfig {
  enabled: boolean;
  host: string;
  port: number;
  password?: string;
  features: {
    sessionManagement: boolean;
    caching: boolean;
    rateLimit: boolean;
  };
}

interface RedisStatus {
  isConnected: boolean;
  error: string | null;
  lastChecked: Date | null;
}

interface RedisState {
  config: RedisConfig;
  status: RedisStatus;
  updateConfig: (config: Partial<RedisConfig>) => void;
  updateStatus: (status: Partial<RedisStatus>) => void;
  reset: () => void;
}

const initialConfig: RedisConfig = {
  enabled: false,
  host: 'localhost',
  port: 6379,
  features: {
    sessionManagement: false,
    caching: false,
    rateLimit: false
  }
};

const initialStatus: RedisStatus = {
  isConnected: false,
  error: null,
  lastChecked: null
};

export const useRedisStore = create<RedisState>((set) => ({
  config: initialConfig,
  status: initialStatus,
  updateConfig: (newConfig) => 
    set((state) => ({ 
      config: { ...state.config, ...newConfig }
    })),
  updateStatus: (newStatus) =>
    set((state) => ({
      status: { ...state.status, ...newStatus }
    })),
  reset: () => set({ config: initialConfig, status: initialStatus })
}));