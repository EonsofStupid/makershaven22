
import React from 'react';

interface EditorCoreProps {
  content: string;
  onChange: (content: string) => void;
}

const EditorCore: React.FC<EditorCoreProps> = ({ content, onChange }) => {
  return (
    <div className="min-h-[400px] border border-white/10 rounded-md bg-black/30 p-4">
      <textarea
        value={content}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-full min-h-[400px] bg-transparent text-white resize-none focus:outline-none"
        placeholder="Write your content here..."
      />
    </div>
  );
};

export default EditorCore;
