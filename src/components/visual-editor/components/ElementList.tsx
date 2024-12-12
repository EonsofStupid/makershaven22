import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GripVertical, Settings, X } from 'lucide-react';
import { VisualElement } from '../types/editor';

interface ElementListProps {
  elements: VisualElement[];
  selectedElement: string | null;
  onSelectElement: (id: string) => void;
  onDeleteElement: (id: string) => void;
  onEditElement: (id: string) => void;
}

export const ElementList: React.FC<ElementListProps> = ({
  elements,
  selectedElement,
  onSelectElement,
  onDeleteElement,
  onEditElement
}) => {
  return (
    <Droppable droppableId="editor">
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className="space-y-2 min-h-[200px]"
        >
          <AnimatePresence>
            {elements.map((element, index) => (
              <Draggable 
                key={element.id} 
                draggableId={element.id} 
                index={index}
              >
                {(provided) => (
                  <motion.div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <Card
                      className={`p-3 ${
                        selectedElement === element.id ? 'ring-2 ring-primary' : ''
                      } relative group`}
                      onClick={() => onSelectElement(element.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div
                          {...provided.dragHandleProps}
                          className="flex items-center gap-2"
                        >
                          <GripVertical className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium capitalize">
                            {element.type}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onEditElement(element.id)}
                          >
                            <Settings className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onDeleteElement(element.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                )}
              </Draggable>
            ))}
          </AnimatePresence>
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};