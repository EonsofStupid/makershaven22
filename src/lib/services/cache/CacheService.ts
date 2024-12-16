import { useCacheStore } from '@/lib/store/cache-store';

interface CacheConfig {
  ttl: number;
  maxSize: number;
}

class CacheService {
  private static instance: CacheService;
  private config: CacheConfig = {
    ttl: 5 * 60 * 1000, // 5 minutes
    maxSize: 100 // Maximum number of cached items
  };

  private constructor() {
    this.setupPeriodicCleanup();
  }

  static getInstance(): CacheService {
    if (!this.instance) {
      this.instance = new CacheService();
    }
    return this.instance;
  }

  setConfig(config: Partial<CacheConfig>) {
    this.config = { ...this.config, ...config };
  }

  async getCachedData<T>(
    key: string,
    fetchFn: () => Promise<T>,
    options?: Partial<CacheConfig>
  ): Promise<T> {
    const { getCache, setCache } = useCacheStore.getState();
    const cachedData = getCache(key);

    if (cachedData) {
      console.log(`Cache hit for ${key}`);
      return cachedData as T;
    }

    console.log(`Cache miss for ${key}, fetching data...`);
    try {
      const data = await fetchFn();
      setCache(key, data, options?.ttl || this.config.ttl);
      return data;
    } catch (error) {
      console.error(`Error fetching data for ${key}:`, error);
      throw error;
    }
  }

  invalidateCache(key: string) {
    const { removeFromCache } = useCacheStore.getState();
    removeFromCache(key);
  }

  private setupPeriodicCleanup() {
    setInterval(() => {
      console.log('Running periodic cache cleanup');
      useCacheStore.getState().pruneExpiredCache();
    }, 60000); // Clean up every minute
  }
}

export const cacheService = CacheService.getInstance();