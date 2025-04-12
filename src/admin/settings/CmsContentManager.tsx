
import React, { useEffect, useState } from 'react';
import { supabase } from '../../integrations/supabase/client';
import { toast } from '../../hooks/use-toast';

interface Content {
  id: string;
  title: string;
  type: string;
  created_at: string;
  updated_at: string;
  status: string;
}

export const CmsContentManager = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [content, setContent] = useState<Content[]>([]);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setIsLoading(true);
        
        // Modified to use proper Supabase query
        const { data, error } = await supabase
          .from('cms_content')
          .select('*')
          .order('updated_at', { ascending: false });

        if (error) {
          throw error;
        }

        setContent(data || []);
      } catch (error) {
        console.error('Error fetching content:', error);
        toast.error('Failed to load content');
      } finally {
        setIsLoading(false);
      }
    };

    fetchContent();
  }, []);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Content Management</h2>
      
      {isLoading ? (
        <div>Loading content...</div>
      ) : content.length === 0 ? (
        <div className="text-muted-foreground">No content found</div>
      ) : (
        <div className="grid gap-4">
          {content.map((item) => (
            <div 
              key={item.id} 
              className="p-4 border rounded-lg flex justify-between items-center"
            >
              <div>
                <h3 className="font-medium">{item.title}</h3>
                <div className="text-sm text-muted-foreground">
                  {item.type} · {new Date(item.updated_at).toLocaleDateString()}
                </div>
              </div>
              <div className="flex gap-2">
                {/* Actions will go here */}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
