import { supabase } from '@/integrations/supabase/client';
import { cacheService } from '../cache/CacheService';
import { toast } from 'sonner';

class DataService {
  private static instance: DataService;
  private realtimeSubscriptions: Map<string, () => void> = new Map();

  private constructor() {}

  static getInstance(): DataService {
    if (!this.instance) {
      this.instance = new DataService();
    }
    return this.instance;
  }

  async fetchData<T>(
    tableName: string,
    options: {
      columns?: string;
      filters?: Record<string, any>;
      cache?: boolean;
      realtime?: boolean;
    } = {}
  ) {
    const cacheKey = `${tableName}-${JSON.stringify(options)}`;

    try {
      if (options.cache) {
        const cachedData = await cacheService.getCachedData<T[]>(cacheKey);
        if (cachedData) return cachedData;
      }

      let query = supabase.from(tableName).select(options.columns || '*');

      if (options.filters) {
        Object.entries(options.filters).forEach(([key, value]) => {
          query = query.eq(key, value);
        });
      }

      const { data, error } = await query;

      if (error) throw error;

      if (options.cache) {
        await cacheService.setCachedData(cacheKey, data);
      }

      if (options.realtime) {
        this.setupRealtimeSubscription(tableName, options);
      }

      return data as T[];
    } catch (error) {
      console.error(`Error fetching data from ${tableName}:`, error);
      toast.error(`Failed to fetch ${tableName} data`);
      throw error;
    }
  }

  private setupRealtimeSubscription(
    tableName: string,
    options: { filters?: Record<string, any> } = {}
  ) {
    // Clean up existing subscription if any
    this.cleanupSubscription(tableName);

    const channel = supabase.channel(`table_changes_${tableName}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: tableName },
        async (payload) => {
          console.log(`Realtime update for ${tableName}:`, payload);
          await this.invalidateCache(tableName);
        }
      )
      .subscribe();

    this.realtimeSubscriptions.set(tableName, () => {
      channel.unsubscribe();
    });
  }

  private cleanupSubscription(tableName: string) {
    const cleanup = this.realtimeSubscriptions.get(tableName);
    if (cleanup) {
      cleanup();
      this.realtimeSubscriptions.delete(tableName);
    }
  }

  async invalidateCache(tableName: string) {
    await cacheService.invalidateCache(tableName);
  }

  cleanup() {
    this.realtimeSubscriptions.forEach(cleanup => cleanup());
    this.realtimeSubscriptions.clear();
  }
}

export const dataService = DataService.getInstance();