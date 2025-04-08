
import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { DataTable } from '@/components/ui/data-table';
import { Badge } from '@/components/ui/badge';
import { ColumnDef } from '@tanstack/react-table';

export interface ActivityLog {
  id: string;
  user_id: string;
  activity_type: string;
  details?: string;
  metadata?: Record<string, any>;
  created_at: string;
  user?: {
    username?: string;
    display_name?: string;
  };
}

interface ActivityLogTableProps {
  data: ActivityLog[];
  isLoading?: boolean;
}

export const ActivityLogTable: React.FC<ActivityLogTableProps> = ({ 
  data, 
  isLoading = false 
}) => {
  const columns: ColumnDef<ActivityLog>[] = [
    {
      accessorKey: 'activity_type',
      header: 'Activity',
      cell: ({ row }) => {
        const type = row.getValue('activity_type') as string;
        return (
          <Badge variant="outline" className="capitalize">
            {type.replace('_', ' ')}
          </Badge>
        );
      },
    },
    {
      accessorKey: 'user',
      header: 'User',
      cell: ({ row }) => {
        const user = row.original.user;
        return <span>{user?.display_name || user?.username || 'Unknown user'}</span>;
      },
    },
    {
      accessorKey: 'details',
      header: 'Details',
      cell: ({ row }) => {
        const details = row.original.details;
        return <span className="text-gray-400">{details || 'No details'}</span>;
      },
    },
    {
      accessorKey: 'created_at',
      header: 'Time',
      cell: ({ row }) => {
        const date = new Date(row.getValue('created_at') as string);
        return <span className="text-gray-400">{formatDistanceToNow(date, { addSuffix: true })}</span>;
      },
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={data}
      filterColumn="activity_type"
      filterPlaceholder="Filter activities..."
    />
  );
};
