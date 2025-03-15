
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { pageContentSchema } from '../types/contentTypeSchema';
import { PageContent } from '../types/contentTypes';

interface PageContentFormProps {
  initialData?: PageContent;
  onSubmit: (data: PageContent) => void;
}

export const PageContentForm: React.FC<PageContentFormProps> = ({
  initialData,
  onSubmit
}) => {
  const { register, handleSubmit, formState: { errors } } = useForm<PageContent>({
    resolver: zodResolver(pageContentSchema),
    defaultValues: initialData || {
      type: 'page',
      title: '',
      status: 'draft',
      content: {
        body: '',
        seo: {
          title: '',
          description: '',
          keywords: []
        }
      }
    }
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block mb-1">Title</label>
        <input
          {...register('title')}
          className="w-full border p-2 rounded"
        />
        {errors.title && <span className="text-red-500 text-sm">{errors.title.message}</span>}
      </div>

      <div>
        <label className="block mb-1">Content</label>
        <textarea
          {...register('content.body')}
          className="w-full border p-2 rounded h-32"
        />
      </div>

      <div>
        <label className="block mb-1">SEO Title</label>
        <input
          {...register('content.seo.title')}
          className="w-full border p-2 rounded"
        />
      </div>

      <div>
        <label className="block mb-1">SEO Description</label>
        <textarea
          {...register('content.seo.description')}
          className="w-full border p-2 rounded h-20"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Save Page
      </button>
    </form>
  );
};
