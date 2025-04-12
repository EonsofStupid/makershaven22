
import React from 'react';
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
  // TODO: Implement DnD functionality when integrating DnD libraries
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
    <div className="element-list">
      {elements.map(element => (
        <motion.div key={element.id} layout>{element.content}</motion.div>
      ))}
    </div>
  );
};

export default ElementList;
