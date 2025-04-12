
import React, { useState } from 'react';
import { ragClient } from '../lib/ragClient';

export const ContextLoader: React.FC = () => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [context, setContext] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!query.trim()) return;
    
    try {
      setIsLoading(true);
      const contextData = await ragClient.getRagContext(query);
      setContext(contextData);
    } catch (error) {
      console.error('Error loading context:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-4 space-y-2">
      <div className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for context..."
          className="flex-1 px-3 py-2 rounded border"
          disabled={isLoading}
        />
        <button
          onClick={handleSearch}
          disabled={!query.trim() || isLoading}
          className="px-4 py-2 bg-primary text-white rounded disabled:opacity-50"
        >
          {isLoading ? 'Loading...' : 'Search'}
        </button>
      </div>
      
      {context && (
        <div className="p-3 bg-muted/20 rounded border border-border">
          <h4 className="text-sm font-medium mb-1">Context</h4>
          <p className="text-sm">{context}</p>
        </div>
      )}
    </div>
  );
};
