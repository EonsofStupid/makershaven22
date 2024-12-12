import React from 'react';
import { Button } from "@/components/ui/button";
import { 
  Type, 
  Image, 
  Box,
  Plus,
  Save
} from 'lucide-react';
import { ToolbarProps } from '../types/editor';
import { motion } from 'framer-motion';

const presets = [
  {
    id: 'text',
    name: 'Text Block',
    category: 'content',
    icon: Type,
    preview: 'Add text content',
    defaultProps: { text: 'New text block' }
  },
  {
    id: 'image',
    name: 'Image',
    category: 'media',
    icon: Image,
    preview: 'Add an image',
    defaultProps: { url: '', alt: '' }
  }
];

export const ElementToolbar: React.FC<ToolbarProps> = ({ 
  onAddElement, 
  onSave,
  isSaving 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-2 p-2 bg-background/50 backdrop-blur-sm border rounded-lg"
    >
      {presets.map((preset) => {
        const Icon = preset.icon;
        return (
          <Button
            key={preset.id}
            variant="ghost"
            size="sm"
            onClick={() => onAddElement(preset)}
            className="flex items-center gap-2"
          >
            <Icon className="h-4 w-4" />
            <span className="hidden md:inline">{preset.name}</span>
          </Button>
        );
      })}

      <Button
        onClick={onSave}
        disabled={isSaving}
        variant="default"
        size="sm"
        className="ml-auto"
      >
        <Save className="h-4 w-4 mr-2" />
        {isSaving ? 'Saving...' : 'Save'}
      </Button>
    </motion.div>
  );
};