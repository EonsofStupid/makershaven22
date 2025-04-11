
import React from 'react';
import { ContentCard } from './ContentCard';
import { BaseContent } from '@/lib/types/core';
import { Skeleton } from '@/components/ui/skeleton';

interface ContentGridProps {
  items: BaseContent[];
  isLoading?: boolean;
  emptyMessage?: string;
  onSelect?: (content: BaseContent) => void;
  className?: string;
}

// Create a GridSkeleton component for loading state
export const GridSkeleton: React.FC<{ count?: number; className?: string }> = ({ 
  count = 6, 
  className = "" 
}) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex flex-col space-y-3 border border-white/10 rounded-lg p-4 bg-black/20">
          <Skeleton className="h-[200px] w-full rounded-md" />
          <Skeleton className="h-6 w-3/4 rounded-md" />
          <Skeleton className="h-4 w-1/2 rounded-md" />
        </div>
      ))}
    </div>
  );
};

export const ContentGrid: React.FC<ContentGridProps> = ({
  items,
  isLoading = false,
  emptyMessage = "No content found",
  onSelect,
  className
}) => {
  if (isLoading) {
    return <GridSkeleton count={6} className={className} />;
  }

  if (items.length === 0) {
    return (
      <div className="flex justify-center items-center py-12 text-gray-400">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
      {items.map((item) => (
        <ContentCard 
          key={item.id} 
          content={item} 
          onClick={() => onSelect?.(item)} 
        />
      ))}
    </div>
  );
};
