import { supabase } from '@/integrations/supabase/client';
import { useCacheStore } from '@/lib/store/cache-store';
import { toast } from 'sonner';

class DataSyncService {
  private static instance: DataSyncService;
  private subscriptions: Map<string, () => void> = new Map();

  private constructor() {}

  static getInstance(): DataSyncService {
    if (!this.instance) {
      this.instance = new DataSyncService();
    }
    return this.instance;
  }

  async syncTable(tableName: string, options = { realtime: true }) {
    console.log(`Starting sync for table: ${tableName}`);
    
    try {
      // Initial data fetch
      const { data, error } = await supabase
        .from(tableName)
        .select('*');

      if (error) throw error;

      // Cache the data
      useCacheStore.getState().setCache(tableName, data);

      if (options.realtime) {
        this.setupRealtimeSync(tableName);
      }

      console.log(`Successfully synced ${tableName}`);
      return data;
    } catch (error) {
      console.error(`Error syncing ${tableName}:`, error);
      toast.error(`Failed to sync ${tableName}`);
      throw error;
    }
  }

  private setupRealtimeSync(tableName: string) {
    // Clean up existing subscription if any
    this.cleanupSubscription(tableName);

    const channel = supabase.channel(`table_changes_${tableName}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: tableName },
        async (payload) => {
          console.log(`Realtime update for ${tableName}:`, payload);
          
          // Fetch fresh data and update cache
          const { data } = await supabase
            .from(tableName)
            .select('*');
            
          if (data) {
            useCacheStore.getState().setCache(tableName, data);
          }
        }
      )
      .subscribe();

    // Store cleanup function
    this.subscriptions.set(tableName, () => {
      channel.unsubscribe();
    });
  }

  private cleanupSubscription(tableName: string) {
    const cleanup = this.subscriptions.get(tableName);
    if (cleanup) {
      cleanup();
      this.subscriptions.delete(tableName);
    }
  }

  cleanup() {
    this.subscriptions.forEach(cleanup => cleanup());
    this.subscriptions.clear();
  }
}

export const dataSyncService = DataSyncService.getInstance();