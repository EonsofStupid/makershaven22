import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase/client';
import type { ImportSession } from '@/lib/types/import';

export const ImportManager = () => {
  const { data: sessions } = useQuery<ImportSession[]>({
    queryKey: ['import-sessions'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('import_sessions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as ImportSession[];
    }
  });

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Import Sessions</h2>
      <div className="grid gap-4">
        {sessions?.map((session) => (
          <div key={session.id} className="p-4 border rounded-lg">
            <div className="flex justify-between">
              <span>{session.file_name}</span>
              <span className="capitalize">{session.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};