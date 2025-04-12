
import React, { useEffect, useState } from 'react';

interface ImageValidationProps {
  images: string[];
  onValidImagesChange: (validImages: string[]) => void;
  onLoadingChange: (isLoading: boolean) => void;
}

export const ImageValidation: React.FC<ImageValidationProps> = ({
  images,
  onValidImagesChange,
  onLoadingChange
}) => {
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (!images || images.length === 0) {
      onValidImagesChange([]);
      onLoadingChange(false);
      return;
    }

    setIsProcessing(true);
    onLoadingChange(true);

    const validImages: string[] = [];
    let loadedCount = 0;

    images.forEach((imageSrc) => {
      const img = new Image();
      
      img.onload = () => {
        validImages.push(imageSrc);
        loadedCount++;
        
        if (loadedCount === images.length) {
          onValidImagesChange(validImages);
          setIsProcessing(false);
          onLoadingChange(false);
        }
      };
      
      img.onerror = () => {
        console.warn(`Failed to load image: ${imageSrc}`);
        loadedCount++;
        
        if (loadedCount === images.length) {
          onValidImagesChange(validImages);
          setIsProcessing(false);
          onLoadingChange(false);
        }
      };
      
      img.src = imageSrc;
    });

    return () => {
      // Cleanup - cancel image loading if component unmounts
      images.forEach((_, index) => {
        const img = new Image();
        img.onload = null;
        img.onerror = null;
      });
    };
  }, [images, onValidImagesChange, onLoadingChange]);

  // This is a utility component that doesn't render anything visible
  return null;
};

export default ImageValidation;
