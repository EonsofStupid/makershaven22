import React from 'react';
import { DndContext, useDraggable, SortableContext } from '@dnd-kit/core';
import { motion } from 'framer-motion';

const ElementList = ({ elements, onReorder }) => {
  const handleDragEnd = ({ active, over }) => {
    if (active.id !== over.id) {
      const oldIndex = elements.findIndex(el => el.id === active.id);
      const newIndex = elements.findIndex(el => el.id === over.id);
      const updatedElements = [...elements];
      updatedElements.splice(newIndex, 0, updatedElements.splice(oldIndex, 1)[0]);
      onReorder(updatedElements);
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <SortableContext items={elements.map(el => el.id)}>
        <div className="element-list">
          {elements.map(element => (
            <motion.div key={element.id} layout>{element.content}</motion.div>
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default ElementList;