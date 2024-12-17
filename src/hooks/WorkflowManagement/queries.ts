```typescript
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { WORKFLOWS_QUERY_KEY } from './constants';

export const useFetchWorkflows = () => {
  return useQuery({
    queryKey: WORKFLOWS_QUERY_KEY,
    queryFn: async () => {
      console.log('Fetching workflows...');
      const { data, error } = await supabase
        .from('cms_workflows')
        .select(`
          *,
          created_by (
            username,
            display_name
          )
        `)
        .order('updated_at', { ascending: false });

      if (error) throw error;
      return data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
