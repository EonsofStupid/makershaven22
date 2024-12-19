import React from 'react';
import { BuilderElement } from '@/lib/types/builder';

const ElementEditor: React.FC<{ element: BuilderElement; onChange: (updatedElement: BuilderElement) => void }> = ({ element, onChange }) => {
  const handleChange = (field: keyof BuilderElement, value: any) => {
    onChange({ ...element, [field]: value });
  };

  return (
    <div>
      <h2>Edit Element</h2>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={element.name}
          onChange={(e) => handleChange('name', e.target.value)}
        />
      </div>
      <div>
        <label>Type:</label>
        <select
          value={element.type}
          onChange={(e) => handleChange('type', e.target.value)}
        >
          <option value="text">Text</option>
          <option value="image">Image</option>
          <option value="video">Video</option>
        </select>
      </div>
      <div>
        <label>Content:</label>
        <textarea
          value={element.content}
          onChange={(e) => handleChange('content', e.target.value)}
        />
      </div>
    </div>
  );
};

export default ElementEditor;
