import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { dataSyncService } from '@/lib/services/data/DataSyncService';
import { cacheService } from '@/lib/services/cache/CacheService';
import { toast } from 'sonner';

interface DataLayerOptions {
  realtime?: boolean;
  cacheTTL?: number;
}

export function useDataLayer<T>(
  tableName: string,
  options: DataLayerOptions = {}
) {
  const queryClient = useQueryClient();

  // Setup realtime sync if enabled
  React.useEffect(() => {
    if (options.realtime) {
      dataSyncService.syncTable(tableName, { realtime: true });
      return () => dataSyncService.cleanup();
    }
  }, [tableName, options.realtime]);

  // Query hook
  const query = useQuery({
    queryKey: [tableName],
    queryFn: async () => {
      return cacheService.getCachedData<T[]>(
        tableName,
        async () => {
          const { data, error } = await supabase
            .from(tableName)
            .select('*');
          
          if (error) throw error;
          return data as T[];
        },
        { ttl: options.cacheTTL }
      );
    }
  });

  // Create mutation
  const create = useMutation({
    mutationFn: async (newData: Partial<T>) => {
      const { data, error } = await supabase
        .from(tableName)
        .insert(newData)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [tableName] });
      toast.success('Created successfully');
    },
    onError: (error) => {
      console.error('Creation error:', error);
      toast.error('Failed to create');
    }
  });

  // Update mutation
  const update = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<T> }) => {
      const { data: updated, error } = await supabase
        .from(tableName)
        .update(data)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return updated;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [tableName] });
      toast.success('Updated successfully');
    },
    onError: (error) => {
      console.error('Update error:', error);
      toast.error('Failed to update');
    }
  });

  // Delete mutation
  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from(tableName)
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [tableName] });
      toast.success('Deleted successfully');
    },
    onError: (error) => {
      console.error('Delete error:', error);
      toast.error('Failed to delete');
    }
  });

  return {
    data: query.data,
    isLoading: query.isLoading,
    error: query.error,
    create: create.mutate,
    update: update.mutate,
    remove: remove.mutate,
    invalidateCache: () => cacheService.invalidateCache(tableName)
  };
}