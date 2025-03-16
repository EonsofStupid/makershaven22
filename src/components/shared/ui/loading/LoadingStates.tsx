
import React from 'react';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';

export const TableRowSkeleton = ({ columns = 4 }: { columns?: number }) => {
  return (
    <div className="px-4 py-3 animate-pulse">
      <div className="flex items-center space-x-4">
        {Array(columns)
          .fill(null)
          .map((_, index) => (
            <div
              key={index}
              className={`h-4 bg-white/10 rounded ${
                index === 0 ? 'w-1/4' : 'w-1/6'
              }`}
            />
          ))}
      </div>
    </div>
  );
};

export const CardSkeleton = () => {
  return (
    <div className="rounded-xl bg-white/5 backdrop-blur-xl p-6 border border-white/10 animate-pulse">
      <div className="h-6 bg-white/10 rounded w-3/4 mb-4" />
      <div className="space-y-3">
        <div className="h-4 bg-white/10 rounded w-full" />
        <div className="h-4 bg-white/10 rounded w-5/6" />
        <div className="h-4 bg-white/10 rounded w-4/6" />
      </div>
    </div>
  );
};

export const ListItemSkeleton = () => {
  return (
    <div className="flex items-center space-x-4 py-3 animate-pulse">
      <div className="h-10 w-10 rounded-full bg-white/10" />
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-white/10 rounded w-3/4" />
        <div className="h-3 bg-white/10 rounded w-1/2" />
      </div>
    </div>
  );
};

export const FullPageLoader = ({ message }: { message?: string }) => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm z-50">
      <LoadingSpinner size="lg" color="neon-cyan" className="mb-4" />
      {message && <p className="text-white text-lg">{message}</p>}
    </div>
  );
};

export const ContentLoader = ({ className = '' }: { className?: string }) => {
  return (
    <div className={`flex items-center justify-center p-8 ${className}`}>
      <LoadingSpinner color="neon-cyan" />
    </div>
  );
};
