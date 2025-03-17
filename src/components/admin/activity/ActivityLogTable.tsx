import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import type { ActivityLogWithProfile } from '@/lib/types/activity';
import { DataTable } from '@/components/ui/data-table';
import { formatDistanceToNow } from 'date-fns';

export function ActivityLogTable() {
  const [logs, setLogs] = useState<ActivityLogWithProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchActivityLogs() {
      try {
        const { data, error } = await supabase
          .from('user_activity')
          .select(`
            *,
            profiles:user_id(
              full_name,
              avatar_url
            )
          `)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setLogs(data as ActivityLogWithProfile[]);
      } catch (error) {
        console.error('Error fetching activity logs:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchActivityLogs();
  }, []);

  const columns = [
    {
      header: 'User',
      accessorKey: 'profiles.full_name',
    },
    {
      header: 'Activity',
      accessorKey: 'activity_type',
    },
    {
      header: 'Details',
      accessorKey: 'details',
    },
    {
      header: 'Time',
      accessorKey: 'created_at',
      cell: ({ row }) => formatDistanceToNow(new Date(row.original.created_at), { addSuffix: true }),
    },
  ];

  if (loading) return <div>Loading...</div>;

  return <DataTable data={logs} columns={columns} />;
}