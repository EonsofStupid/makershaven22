import React, { useState } from 'react';
import { useContentQuery } from '../hooks/useContentQuery';
import { ContentType } from '@/lib/types/enums';

interface ContentManagerProps {
  // Your props here
}

export const ContentManager: React.FC<ContentManagerProps> = () => {
  const [selectedType, setSelectedType] = useState<ContentType>('page');
  const { data: content, isLoading, error } = useContentQuery(selectedType);

  const handleTypeChange = (type: string) => {
    // Make sure the type is a valid ContentType
    const validContentType = isValidContentType(type);
    if (validContentType) {
      setSelectedType(validContentType);
    } else {
      console.error(`Invalid content type: ${type}`);
    }
  };

  // Type guard to ensure type is a valid ContentType
  const isValidContentType = (type: string): ContentType | null => {
    const validTypes: ContentType[] = [
      'template', 
      'page', 
      'build', 
      'guide', 
      'part', 
      'component',
      'workflow',
      'hero',
      'feature'
    ];
    
    return validTypes.includes(type as ContentType) ? (type as ContentType) : null;
  };

  return (
    <div>
      {/* Content Manager UI */}
      <div className="content-type-selector">
        {/* Render buttons for each content type */}
      </div>
      
      {isLoading && <div>Loading...</div>}
      {error && <div>Error loading content: {JSON.stringify(error)}</div>}
      
      {content && (
        <div className="content-list">
          {/* Render content items */}
        </div>
      )}
    </div>
  );
};
