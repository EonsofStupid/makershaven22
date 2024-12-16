import { atom } from 'jotai';

export interface RedisConfig {
  enabled: boolean;
  features: {
    sessionManagement: boolean;
    caching: boolean;
    rateLimit: boolean;
  };
}

const initialRedisConfig: RedisConfig = {
  enabled: false,
  features: {
    sessionManagement: false,
    caching: false,
    rateLimit: false
  }
};

export const redisConfigAtom = atom<RedisConfig>(initialRedisConfig);

export const updateRedisConfigAtom = atom(
  null,
  (get, set, update: Partial<RedisConfig>) => {
    const current = get(redisConfigAtom);
    set(redisConfigAtom, { ...current, ...update });
  }
);