
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../shared/ui/select";
import { ContentType } from '../../../shared/types/enums';

interface ContentTypeSelectorProps {
  value: ContentType;
  onChange: (value: ContentType) => void;
}

const ContentTypeSelector: React.FC<ContentTypeSelectorProps> = ({ value, onChange }) => {
  return (
    <Select value={value} onValueChange={(val) => onChange(val as ContentType)}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select content type" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="page">Page</SelectItem>
        <SelectItem value="component">Component</SelectItem>
        <SelectItem value="template">Template</SelectItem>
        <SelectItem value="workflow">Workflow</SelectItem>
        <SelectItem value="build">Build</SelectItem>
        <SelectItem value="guide">Guide</SelectItem>
        <SelectItem value="part">Part</SelectItem>
        <SelectItem value="hero">Hero</SelectItem>
        <SelectItem value="feature">Feature</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default ContentTypeSelector;
