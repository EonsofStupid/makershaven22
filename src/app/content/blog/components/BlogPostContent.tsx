
import React from 'react';
import AnimatedTextReveal from './AnimatedTextReveal';
import { Button } from '../../../../shared/ui/button';

interface BlogPostContentProps {
  title: string;
  content: string;
  hasMoreContent?: boolean;
  onReadMore?: () => void;
  images?: string[];
}

export const BlogPostContent: React.FC<BlogPostContentProps> = ({
  title,
  content,
  hasMoreContent,
  onReadMore,
  images
}) => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl md:text-3xl font-bold text-white">{title}</h2>
      
      <div className="text-white/80 text-sm md:text-base">
        {content.length > 500 ? (
          <AnimatedTextReveal content={content} />
        ) : (
          <div dangerouslySetInnerHTML={{ __html: content }} />
        )}
      </div>
      
      {hasMoreContent && onReadMore && (
        <Button
          onClick={(e) => {
            e.stopPropagation();
            onReadMore();
          }}
          className="bg-[#ff0abe]/20 text-white border border-[#ff0abe]/30 hover:bg-[#ff0abe]/30"
          variant="outline"
        >
          Read More
        </Button>
      )}
    </div>
  );
};
