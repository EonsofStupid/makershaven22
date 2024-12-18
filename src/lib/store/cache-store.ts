import { create } from 'zustand';

interface CacheState {
  cache: Record<string, any>;
  getCache: (key: string) => any;
  setCache: (key: string, value: any) => void;
}

export const useCacheStore = create<CacheState>((set, get) => ({
  cache: {},
  getCache: (key) => get().cache[key],
  setCache: (key, value) => set((state) => ({ 
    cache: { ...state.cache, [key]: value } 
  })),
}));