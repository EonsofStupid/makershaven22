
import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';

interface TagsManagerProps {
  tags: string[];
  onTagsChange: (tags: string[]) => void;
}

const TagsManager: React.FC<TagsManagerProps> = ({ tags, onTagsChange }) => {
  const [inputValue, setInputValue] = useState('');
  
  const handleAddTag = () => {
    if (inputValue.trim() && !tags.includes(inputValue.trim())) {
      onTagsChange([...tags, inputValue.trim()]);
      setInputValue('');
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };
  
  const handleRemoveTag = (tagToRemove: string) => {
    onTagsChange(tags.filter(tag => tag !== tagToRemove));
  };
  
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-white">Tags</h3>
      
      <div className="flex items-center space-x-2">
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-black/30 border border-white/10 rounded-md px-3 py-2 text-white focus:outline-none focus:border-[#ff0abe]/50"
          placeholder="Add a tag"
        />
        <button
          onClick={handleAddTag}
          disabled={!inputValue.trim()}
          className="p-2 rounded-md bg-[#ff0abe]/20 text-white border border-[#ff0abe]/30 hover:bg-[#ff0abe]/30 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <div
            key={index}
            className="flex items-center gap-1 bg-[#ff0abe]/10 text-white border border-[#ff0abe]/20 px-2 py-1 rounded-md text-sm"
          >
            <span>{tag}</span>
            <button
              onClick={() => handleRemoveTag(tag)}
              className="text-white/70 hover:text-white"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ))}
        {tags.length === 0 && (
          <p className="text-sm text-white/50">No tags added yet</p>
        )}
      </div>
    </div>
  );
};

export default TagsManager;
