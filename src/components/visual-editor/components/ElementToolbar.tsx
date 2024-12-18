import React from 'react';
import { useEditorStore } from '@/lib/store/editor-store';

const ElementToolbar = ({ onSave }) => {
  const { isSaving } = useEditorStore();

  return (
    <div className="toolbar">
      <button onClick={onSave} disabled={isSaving}>
        {isSaving ? 'Saving...' : 'Save'}
      </button>
    </div>
  );
};

export default ElementToolbar;