
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { motion } from 'framer-motion';

interface ImageCarouselProps {
  images: string[];
  currentIndex: number;
  onIndexChange: (index: number) => void;
  className?: string;
}

export const ImageCarousel: React.FC<ImageCarouselProps> = ({
  images,
  currentIndex,
  onIndexChange,
  className = ''
}) => {
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    setLoaded(false);
  }, [currentIndex]);

  const next = () => {
    onIndexChange((currentIndex + 1) % images.length);
  };

  const prev = () => {
    onIndexChange((currentIndex - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        next();
      } else if (e.key === 'ArrowLeft') {
        prev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, images.length]);

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Main image */}
      <div className="relative w-full h-full flex items-center justify-center">
        {!loaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-[#ff0abe]/50 border-t-[#ff0abe] rounded-full animate-spin" />
          </div>
        )}
        
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt={`Image ${currentIndex + 1}`}
          className={`max-h-full max-w-full object-contain ${!loaded ? 'opacity-0' : 'opacity-100'}`}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: loaded ? 1 : 0, scale: loaded ? 1 : 0.9 }}
          transition={{ duration: 0.3 }}
          onLoad={() => setLoaded(true)}
        />
      </div>

      {/* Navigation buttons */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          prev();
        }}
        className="absolute left-4 z-10 p-2 rounded-full bg-black/50 border border-white/10 text-white hover:bg-black/70 transition-colors"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      
      <button
        onClick={(e) => {
          e.stopPropagation();
          next();
        }}
        className="absolute right-4 z-10 p-2 rounded-full bg-black/50 border border-white/10 text-white hover:bg-black/70 transition-colors"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Image counter */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-3 py-1 rounded-full text-sm border border-white/10">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
};
