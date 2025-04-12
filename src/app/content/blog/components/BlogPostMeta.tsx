
import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Eye, Calendar } from 'lucide-react';

interface BlogPostMetaProps {
  publishedAt?: string | null;
  viewsCount?: number | null;
}

export const BlogPostMeta: React.FC<BlogPostMetaProps> = ({
  publishedAt,
  viewsCount
}) => {
  return (
    <div className="flex items-center gap-4 text-white/60 text-sm">
      {publishedAt && (
        <div className="flex items-center gap-1">
          <Calendar className="w-4 h-4" />
          <span>{formatDistanceToNow(new Date(publishedAt), { addSuffix: true })}</span>
        </div>
      )}
      
      {viewsCount !== undefined && viewsCount !== null && (
        <div className="flex items-center gap-1">
          <Eye className="w-4 h-4" />
          <span>{viewsCount.toLocaleString()} {viewsCount === 1 ? 'view' : 'views'}</span>
        </div>
      )}
    </div>
  );
};
