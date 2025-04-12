
import React from 'react';

interface SEOSectionProps {
  title: string;
  onTitleChange: (value: string) => void;
  description: string;
  onDescriptionChange: (value: string) => void;
}

const SEOSection: React.FC<SEOSectionProps> = ({
  title,
  onTitleChange,
  description,
  onDescriptionChange
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-white">SEO Settings</h3>
      
      <div className="space-y-2">
        <label htmlFor="seo-title" className="text-sm text-white/70">Meta Title</label>
        <input
          id="seo-title"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          className="w-full bg-black/30 border border-white/10 rounded-md px-3 py-2 text-white focus:outline-none focus:border-[#ff0abe]/50"
          placeholder="SEO Title"
        />
        <p className="text-xs text-white/50">
          {title.length}/60 characters (recommended: 50-60)
        </p>
      </div>
      
      <div className="space-y-2">
        <label htmlFor="seo-description" className="text-sm text-white/70">Meta Description</label>
        <textarea
          id="seo-description"
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
          className="w-full bg-black/30 border border-white/10 rounded-md px-3 py-2 text-white h-24 resize-none focus:outline-none focus:border-[#ff0abe]/50"
          placeholder="SEO Description"
        />
        <p className="text-xs text-white/50">
          {description.length}/160 characters (recommended: 150-160)
        </p>
      </div>
    </div>
  );
};

export default SEOSection;
