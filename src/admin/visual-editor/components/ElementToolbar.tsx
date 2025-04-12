
import React from 'react';

// TODO: Update this import once the store is migrated
const useEditorStore = () => {
  return {
    isSaving: false
  };
};

const ElementToolbar = ({ onSave }: { onSave: () => void }) => {
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
