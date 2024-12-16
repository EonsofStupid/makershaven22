import { atom } from 'jotai';

export interface RedisConfig {
  enabled: boolean;
  host?: string;
  port?: number;
  password?: string;
  features: {
    sessionManagement: boolean;
    caching: boolean;
    rateLimit: boolean;
  };
}

export interface RedisStatus {
  isConnected: boolean;
  lastChecked: Date | null;
  error: string | null;
}

const defaultConfig: RedisConfig = {
  enabled: false,
  features: {
    sessionManagement: false,
    caching: false,
    rateLimit: false
  }
};

export const redisConfigAtom = atom<RedisConfig>(defaultConfig);
export const redisStatusAtom = atom<RedisStatus>({
  isConnected: false,
  lastChecked: null,
  error: null
});

// Derived atoms
export const isRedisEnabledAtom = atom(
  (get) => get(redisConfigAtom).enabled
);

// Action atoms
export const updateRedisConfigAtom = atom(
  null,
  (get, set, update: Partial<RedisConfig>) => {
    const current = get(redisConfigAtom);
    set(redisConfigAtom, { ...current, ...update });
  }
);

export const updateRedisStatusAtom = atom(
  null,
  (get, set, update: Partial<RedisStatus>) => {
    const current = get(redisStatusAtom);
    set(redisStatusAtom, { ...current, ...update });
  }
);