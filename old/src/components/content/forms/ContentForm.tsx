import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { BaseContent, PageContent, ComponentContent } from '../types/contentTypes';
import { ContentType } from '@/lib/types/enums';

interface ContentFormProps {
  initialData?: BaseContent;
  contentType: ContentType;
  onSubmit: (data: BaseContent) => void;
}

export const ContentForm: React.FC<ContentFormProps> = ({
  initialData,
  contentType,
  onSubmit
}) => {
  // Form implementation will depend on the content type
  // This is a generic base component - specific implementations should extend this
  
  return (
    <div className="content-form">
      <h2>Generic Content Form</h2>
      <p>This form should be extended by specific content type forms</p>
    </div>
  );
};
