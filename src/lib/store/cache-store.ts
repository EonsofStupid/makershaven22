import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CacheState {
  cache: Record<string, any>;
  setCacheItem: (key: string, value: any) => void;
  removeCacheItem: (key: string) => void;
  clearCache: () => void;
}

export const useCacheStore = create<CacheState>()(
  persist(
    (set) => ({
      cache: {},
      setCacheItem: (key, value) => set((state) => ({ cache: { ...state.cache, [key]: value } })),
      removeCacheItem: (key) => set((state) => {
        const updatedCache = { ...state.cache };
        delete updatedCache[key];
        return { cache: updatedCache };
      }),
      clearCache: () => set({ cache: {} }),
    }),
    { name: 'cache-store' }
  )
);