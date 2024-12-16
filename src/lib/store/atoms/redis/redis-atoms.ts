import { atom } from 'jotai';
import type { RedisConfig } from '@/components/admin/cache/types';

const initialRedisConfig: RedisConfig = {
  enabled: false,
  host: '',
  port: '',
  password: '',
  ttl: 3600,
  maxMemory: 128,
  restrictedMode: false,
  features: {
    sessionManagement: false,
    caching: false,
    realTimeUpdates: false
  }
};

export const redisConfigAtom = atom<RedisConfig>(initialRedisConfig);

export const redisStatusAtom = atom({
  isConnected: false,
  lastChecked: null as Date | null,
  error: null as string | null
});

export const updateRedisConfigAtom = atom(
  null,
  (get, set, update: Partial<RedisConfig>) => {
    const current = get(redisConfigAtom);
    set(redisConfigAtom, { ...current, ...update });
  }
);

export const updateRedisStatusAtom = atom(
  null,
  (get, set, status: { isConnected: boolean; lastChecked?: Date; error?: string | null }) => {
    set(redisStatusAtom, {
      ...get(redisStatusAtom),
      isConnected: status.isConnected,
      lastChecked: status.lastChecked || new Date(),
      error: status.error || null
    });
  }
);