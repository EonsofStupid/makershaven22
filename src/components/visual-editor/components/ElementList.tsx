
import React from 'react';
import { DndContext, useDraggable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { motion } from 'framer-motion';

interface Element {
  id: string;
  content: React.ReactNode;
}

interface ElementListProps {
  elements: Element[];
  onReorder: (elements: Element[]) => void;
}

const ElementList: React.FC<ElementListProps> = ({ elements, onReorder }) => {
  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    
    if (active && over && active.id !== over.id) {
      const oldIndex = elements.findIndex(el => el.id === active.id);
      const newIndex = elements.findIndex(el => el.id === over.id);
      const updatedElements = [...elements];
      updatedElements.splice(newIndex, 0, updatedElements.splice(oldIndex, 1)[0]);
      onReorder(updatedElements);
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <SortableContext items={elements.map(el => el.id)} strategy={verticalListSortingStrategy}>
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
