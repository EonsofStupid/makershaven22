import React from 'react';
import { Card } from '@/components/ui/card';
import type { BaseContent } from '@/lib/types/core/content';

interface ContentGridProps {
  items: BaseContent[];
}

export const ContentGrid: React.FC<ContentGridProps> = ({ items }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => (
        <Card key={item.id} className="p-4">
          <h3>{item.title}</h3>
          {/* Add more content display logic here */}
        </Card>
      ))}
    </div>
  );
};
