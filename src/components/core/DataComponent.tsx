import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { FeatureComponent } from './FeatureComponent';
import { dataService } from '@/lib/services/data/DataService';

interface DataComponentProps<T> {
  tableName: string;
  columns?: string;
  filters?: Record<string, any>;
  enableRealtime?: boolean;
  enableCache?: boolean;
  children: (data: T[]) => React.ReactNode;
  title?: string;
  description?: string;
}

export function DataComponent<T>({
  tableName,
  columns,
  filters,
  enableRealtime = false,
  enableCache = true,
  children,
  title,
  description,
}: DataComponentProps<T>) {
  const { data, isLoading, error } = useQuery({
    queryKey: [tableName, columns, filters],
    queryFn: () => dataService.fetchData<T>(tableName, {
      columns,
      filters,
      cache: enableCache,
      realtime: enableRealtime,
    }),
  });

  return (
    <FeatureComponent
      title={title}
      description={description}
      loading={isLoading}
      error={error as Error}
    >
      {data && children(data)}
    </FeatureComponent>
  );
}