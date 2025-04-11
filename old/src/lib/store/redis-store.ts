import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '@/integrations/supabase/client';

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
  userId: string | null;
  updateStatus: (status: Partial<RedisStatus>) => void;
  updateConfig: (config: Partial<RedisConfig>) => void;
  toggleFeature: (feature: keyof RedisConfig['features']) => void;
  setUserId: (userId: string | null) => void;
  syncWithDatabase: () => Promise<void>;
}

export const useRedisStore = create<RedisStore>()(
  persist(
    (set, get) => ({
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
      userId: null,
      updateStatus: (status) => set((state) => ({
        status: { ...state.status, ...status }
      })),
      updateConfig: (config) => {
        set((state) => ({
          config: { ...state.config, ...config }
        }));
        // Update connection state in database
        if (get().userId) {
          supabase.from('redis_connection_states')
            .upsert({
              user_id: get().userId,
              connection_id: `${get().config.host}:${get().config.port}`,
              status: get().status.isConnected ? 'connected' : 'disconnected',
              metadata: { config: get().config }
            })
            .then(({ error }) => {
              if (error) console.error('Error updating Redis state:', error);
            });
        }
      },
      toggleFeature: (feature) => set((state) => ({
        config: {
          ...state.config,
          features: {
            ...state.config.features,
            [feature]: !state.config.features[feature]
          }
        }
      })),
      setUserId: (userId) => set({ userId }),
      syncWithDatabase: async () => {
        const userId = get().userId;
        if (!userId) return;

        try {
          // Fetch Redis config from admin_settings
          const { data: settingsData, error: settingsError } = await supabase
            .from('admin_settings')
            .select('setting_value')
            .eq('setting_key', 'redis_config')
            .single();

          if (settingsError) throw settingsError;

          if (settingsData?.setting_value) {
            const config = JSON.parse(settingsData.setting_value);
            set((state) => ({
              config: { ...state.config, ...config }
            }));
          }

          // Fetch connection state
          const { data: stateData, error: stateError } = await supabase
            .from('redis_connection_states')
            .select('*')
            .eq('user_id', userId)
            .single();

          if (stateError && stateError.code !== 'PGRST116') throw stateError;

          if (stateData) {
            set((state) => ({
              status: {
                ...state.status,
                isConnected: stateData.status === 'connected',
                lastChecked: new Date(stateData.last_connected || Date.now())
              }
            }));
          }
        } catch (error) {
          console.error('Error syncing Redis state:', error);
          set((state) => ({
            status: {
              ...state.status,
              error: error instanceof Error ? error.message : 'Unknown error'
            }
          }));
        }
      }
    }),
    {
      name: 'redis-storage',
      partialize: (state) => ({
        config: state.config,
        status: state.status
      })
    }
  )
);

// Subscribe to auth changes to sync Redis state
supabase.auth.onAuthStateChange((event, session) => {
  const userId = session?.user?.id;
  useRedisStore.getState().setUserId(userId);
  if (userId) {
    useRedisStore.getState().syncWithDatabase();
  }
});