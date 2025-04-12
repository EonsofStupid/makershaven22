
import React, { useState } from 'react';
import { Card } from '../../../shared/ui/card';

// TODO: Import DndContext when migrating DnD functionality
const DndContext = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

// TODO: Import useDraggable when migrating DnD functionality
const useDraggable = () => {
  return {};
};

interface ElementEditorProps {
  element: {
    id: string;
    content: {
      text?: string;
      [key: string]: any;
    };
  };
  onUpdate: (id: string, content: any) => void;
}

const ElementEditor = ({ element, onUpdate }: ElementEditorProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdate = (key: string, value: any) => {
    onUpdate(element.id, { ...element.content, [key]: value });
  };

  return (
    <DndContext>
      <Card>
        <div onClick={() => setIsEditing(!isEditing)}>{element.content.text || 'Edit Me'}</div>
      </Card>
    </DndContext>
  );
};

export default ElementEditor;
