
import { BaseContent } from '@/lib/types/content/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';

interface ContentCardProps {
  content: BaseContent;
  onClick?: () => void;
}

export const ContentCard: React.FC<ContentCardProps> = ({ content, onClick }) => {
  const extractImageUrl = (content: BaseContent): string | null => {
    // Try to extract featured image from metadata
    if (content.metadata) {
      const metadata = content.metadata as any;
      if (metadata.featuredImage || metadata.featured_image) {
        return metadata.featuredImage || metadata.featured_image;
      }
      
      if (metadata.images && Array.isArray(metadata.images) && metadata.images.length > 0) {
        return metadata.images[0];
      }
    }
    
    // Add fallback logic here based on your content structure
    return null;
  };

  const imageUrl = extractImageUrl(content);
  const createdAt = content.created_at ? new Date(content.created_at) : new Date();
  const timeAgo = formatDistanceToNow(createdAt, { addSuffix: true });

  return (
    <Card 
      className="overflow-hidden border-white/10 bg-black/20 hover:bg-black/30 transition-colors cursor-pointer"
      onClick={onClick}
    >
      {imageUrl && (
        <div className="w-full h-48 overflow-hidden">
          <img 
            src={imageUrl} 
            alt={content.title} 
            className="w-full h-full object-cover transition-transform hover:scale-105"
          />
        </div>
      )}
      
      <CardHeader className={imageUrl ? 'pt-4' : 'pt-6'}>
        <div className="flex justify-between items-start mb-2">
          <Badge>{content.type}</Badge>
          {content.status && <Badge variant="outline">{content.status}</Badge>}
        </div>
        <CardTitle className="line-clamp-2">{content.title}</CardTitle>
      </CardHeader>
      
      <CardContent className="text-sm text-gray-400">
        {/* Extract and display a short description if available */}
        {content.metadata && typeof content.metadata === 'object' && 'description' in content.metadata && (
          <p className="line-clamp-3">
            {String(content.metadata.description)}
          </p>
        )}
      </CardContent>
      
      <CardFooter className="text-xs text-gray-500">
        <div className="flex justify-between w-full">
          <span>{timeAgo}</span>
          <span>v{content.version || '1'}</span>
        </div>
      </CardFooter>
    </Card>
  );
};
