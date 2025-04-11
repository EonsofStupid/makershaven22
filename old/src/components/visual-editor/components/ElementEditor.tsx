import React, { useState } from 'react';
import { DndContext, useDraggable } from '@dnd-kit/core';
import { Card } from '@/components/ui/card';

const ElementEditor = ({ element, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdate = (key, value) => {
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