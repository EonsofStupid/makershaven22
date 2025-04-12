
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../../ui/button';

interface ImageCarouselProps {
  images: string[];
  currentIndex?: number;
  onIndexChange?: (index: number) => void;
  className?: string;
}

export const ImageCarousel: React.FC<ImageCarouselProps> = ({
  images,
  currentIndex = 0,
  onIndexChange,
  className = ''
}) => {
  const [internalIndex, setInternalIndex] = useState(currentIndex);
  
  // Use either the controlled or internal index
  const activeIndex = onIndexChange ? currentIndex : internalIndex;
  
  if (!images.length) {
    return <div className={`flex items-center justify-center ${className}`}>No images</div>;
  }
  
  const handlePrev = () => {
    const newIndex = activeIndex === 0 ? images.length - 1 : activeIndex - 1;
    if (onIndexChange) {
      onIndexChange(newIndex);
    } else {
      setInternalIndex(newIndex);
    }
  };
  
  const handleNext = () => {
    const newIndex = activeIndex === images.length - 1 ? 0 : activeIndex + 1;
    if (onIndexChange) {
      onIndexChange(newIndex);
    } else {
      setInternalIndex(newIndex);
    }
  };
  
  return (
    <div className={`relative ${className}`}>
      <div className="relative h-full w-full">
        <img 
          src={images[activeIndex]} 
          alt={`Image ${activeIndex + 1}`}
          className="w-full h-full object-contain"
        />
      </div>
      
      <Button
        className="absolute left-4 top-1/2 transform -translate-y-1/2 rounded-full p-2"
        size="icon"
        onClick={handlePrev}
      >
        <ChevronLeft className="w-6 h-6" />
      </Button>
      
      <Button
        className="absolute right-4 top-1/2 transform -translate-y-1/2 rounded-full p-2"
        size="icon"
        onClick={handleNext}
      >
        <ChevronRight className="w-6 h-6" />
      </Button>
      
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, idx) => (
          <button
            key={idx}
            className={`w-2 h-2 rounded-full ${
              idx === activeIndex ? 'bg-white' : 'bg-white/30'
            }`}
            onClick={() => {
              if (onIndexChange) {
                onIndexChange(idx);
              } else {
                setInternalIndex(idx);
              }
            }}
          />
        ))}
      </div>
    </div>
  );
};
