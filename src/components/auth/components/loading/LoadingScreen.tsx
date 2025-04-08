
import React from 'react';
import { motion } from 'framer-motion';

export const LoadingScreen: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col items-center space-y-4"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full"
        />
        <p className="text-white/70">Loading...</p>
      </motion.div>
    </div>
  );
};

export const TableSkeleton: React.FC<{ rows?: number, cols?: number }> = ({ 
  rows = 5, 
  cols = 4 
}) => {
  return (
    <div className="w-full border border-white/10 rounded-lg overflow-hidden">
      <div className="bg-gray-800/50 p-4">
        <div className="h-7 w-1/3 bg-gray-700/50 rounded animate-pulse"></div>
      </div>
      <div className="divide-y divide-white/5">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={rowIndex} className="grid grid-cols-4 p-4 gap-4">
            {Array.from({ length: cols }).map((_, colIndex) => (
              <div key={colIndex} className="h-5 bg-gray-700/50 rounded animate-pulse"></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export const TableRowSkeleton: React.FC<{ cols?: number }> = ({ cols = 4 }) => {
  return (
    <div className="grid grid-cols-4 p-4 gap-4 border-b border-white/5">
      {Array.from({ length: cols }).map((_, colIndex) => (
        <div key={colIndex} className="h-5 bg-gray-700/50 rounded animate-pulse"></div>
      ))}
    </div>
  );
};

export const CardSkeleton: React.FC<{ count?: number }> = ({ count = 1 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="border border-white/10 rounded-lg p-4 bg-black/20">
          <div className="h-40 bg-gray-700/30 rounded-md animate-pulse mb-3"></div>
          <div className="h-6 bg-gray-700/30 rounded w-3/4 animate-pulse mb-2"></div>
          <div className="h-4 bg-gray-700/30 rounded w-1/2 animate-pulse"></div>
        </div>
      ))}
    </div>
  );
};
