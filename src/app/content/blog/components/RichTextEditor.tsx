
import React, { useState } from 'react';
import { Tabs, TabsContent } from '../../../../shared/ui/tabs';
import EditorCore from './editor/EditorCore';
import EditorTabs from './editor/EditorTabs';
import SEOSection from './editor/SEOSection';
import TagsManager from './editor/TagsManager';

interface RichTextEditorProps {
  content: string;
  onContentChange: (content: string) => void;
  title: string;
  onTitleChange: (title: string) => void;
  description: string;
  onDescriptionChange: (description: string) => void;
  tags: string[];
  onTagsChange: (tags: string[]) => void;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  content,
  onContentChange,
  title,
  onTitleChange,
  description,
  onDescriptionChange,
  tags,
  onTagsChange
}) => {
  const [activeTab, setActiveTab] = useState('editor');

  return (
    <div className="space-y-4">
      <input
        type="text"
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
        className="w-full bg-black/30 border border-white/10 rounded-md px-4 py-3 text-white text-2xl focus:outline-none focus:border-[#ff0abe]/50"
        placeholder="Enter title..."
      />

      <EditorTabs activeTab={activeTab} onTabChange={setActiveTab}>
        <TabsContent value="editor" className="space-y-4">
          <EditorCore 
            content={content} 
            onChange={onContentChange} 
          />
        </TabsContent>
        
        <TabsContent value="media" className="space-y-4">
          <div className="min-h-[400px] border border-white/10 rounded-md bg-black/30 p-4">
            <p className="text-white/70">Media management coming soon...</p>
          </div>
        </TabsContent>
        
        <TabsContent value="settings" className="space-y-8">
          <SEOSection
            title={title}
            onTitleChange={onTitleChange}
            description={description}
            onDescriptionChange={onDescriptionChange}
          />
          
          <TagsManager
            tags={tags}
            onTagsChange={onTagsChange}
          />
        </TabsContent>
      </EditorTabs>
    </div>
  );
};

export default RichTextEditor;
