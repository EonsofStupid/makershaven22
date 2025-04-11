
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { componentContentSchema } from '../types/contentTypeSchema';
import { ComponentContent } from '../types/contentTypes';

interface ComponentContentFormProps {
  initialData?: ComponentContent;
  onSubmit: (data: ComponentContent) => void;
}

export const ComponentContentForm: React.FC<ComponentContentFormProps> = ({
  initialData,
  onSubmit
}) => {
  const { register, handleSubmit, formState: { errors } } = useForm<ComponentContent>({
    resolver: zodResolver(componentContentSchema),
    defaultValues: initialData || {
      type: 'component',
      title: '',
      status: 'draft',
      content: {
        template: '',
        props: {},
        styles: {}
      }
    }
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block mb-1">Component Name</label>
        <input
          {...register('title')}
          className="w-full border p-2 rounded"
        />
        {errors.title && <span className="text-red-500 text-sm">{errors.title.message}</span>}
      </div>

      <div>
        <label className="block mb-1">Template</label>
        <textarea
          {...register('content.template')}
          className="w-full border p-2 rounded h-32 font-mono"
          placeholder="<div>Component Template</div>"
        />
      </div>

      <div>
        <label className="block mb-1">Props (JSON)</label>
        <textarea
          {...register('content.props')}
          className="w-full border p-2 rounded h-20 font-mono"
          placeholder='{"prop1": "value1", "prop2": "value2"}'
        />
      </div>

      <div>
        <label className="block mb-1">Styles (JSON)</label>
        <textarea
          {...register('content.styles')}
          className="w-full border p-2 rounded h-20 font-mono"
          placeholder='{"color": "blue", "padding": "1rem"}'
        />
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Save Component
      </button>
    </form>
  );
};
