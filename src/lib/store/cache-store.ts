
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CacheStoreState {
  cache: Record<string, any>;
  getCache: (key: string) => any;
  setCache: (key: string, data: any, expirationMs?: number) => void;
  clearCache: (key?: string) => void;
  isExpired: (key: string) => boolean;
}

interface CacheItem {
  data: any;
  timestamp: number;
  expirationMs?: number;
}

export const useCacheStore = create<CacheStoreState>()(
  persist(
    (set, get) => ({
      cache: {},
      
      getCache: (key: string) => {
        const cache = get().cache;
        const cacheItem = cache[key] as CacheItem | undefined;
        
        if (!cacheItem) return null;
        
        // Check if expired
        if (get().isExpired(key)) {
          get().clearCache(key);
          return null;
        }
        
        return cacheItem.data;
      },
      
      setCache: (key: string, data: any, expirationMs?: number) => {
        set((state) => ({
          cache: {
            ...state.cache,
            [key]: {
              data,
              timestamp: Date.now(),
              expirationMs
            }
          }
        }));
      },
      
      clearCache: (key?: string) => {
        if (key) {
          set((state) => {
            const newCache = { ...state.cache };
            delete newCache[key];
            return { cache: newCache };
          });
        } else {
          set({ cache: {} });
        }
      },
      
      isExpired: (key: string) => {
        const cache = get().cache;
        const cacheItem = cache[key] as CacheItem | undefined;
        
        if (!cacheItem || !cacheItem.expirationMs) return false;
        
        const now = Date.now();
        const expiration = cacheItem.timestamp + cacheItem.expirationMs;
        
        return now > expiration;
      }
    }),
    {
      name: 'app-cache',
      partialize: (state) => ({ cache: state.cache })
    }
  )
);
