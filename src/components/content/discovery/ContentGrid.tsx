
import React from 'react';
import { ContentCard } from './ContentCard';
import { GridSkeleton } from '@/components/shared/ui/loading/LoadingStates';
import { BaseContent } from '@/lib/types/content/types';

interface ContentGridProps {
  items: BaseContent[];
  isLoading?: boolean;
  emptyMessage?: string;
  onSelect?: (content: BaseContent) => void;
  className?: string;
}

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
