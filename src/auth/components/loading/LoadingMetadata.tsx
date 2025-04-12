
import React from 'react';

export interface LoadingMetadata {
  progress?: number;
  stage?: string;
  details?: string;
  estimatedTimeRemaining?: number;
}

interface LoadingMetadataProps {
  metadata: LoadingMetadata;
  className?: string;
}

export const LoadingMetadata = ({ metadata, className = "" }: LoadingMetadataProps) => {
  const formatTime = (ms: number) => {
    if (ms < 1000) return 'Less than a second';
    const seconds = Math.floor(ms / 1000);
    if (seconds < 60) return `${seconds} seconds`;
    const minutes = Math.floor(seconds / 60);
    return `${minutes} minute${minutes > 1 ? 's' : ''}`;
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {metadata.stage && (
        <p className="text-white/70 text-sm">
          Stage: {metadata.stage}
        </p>
      )}
      {metadata.progress !== undefined && (
        <div className="space-y-1">
          <div className="w-full bg-white/10 rounded-full h-1.5">
            <div 
              className="bg-[#41f0db] h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${metadata.progress}%` }}
            />
          </div>
          <p className="text-white/60 text-xs text-right">
            {Math.round(metadata.progress)}%
          </p>
        </div>
      )}
      {metadata.details && (
        <p className="text-white/60 text-xs">
          {metadata.details}
        </p>
      )}
      {metadata.estimatedTimeRemaining && (
        <p className="text-white/60 text-xs">
          Estimated time remaining: {formatTime(metadata.estimatedTimeRemaining)}
        </p>
      )}
    </div>
  );
};
