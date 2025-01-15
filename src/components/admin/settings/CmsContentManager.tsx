import React, { useState } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { CmsContent } from '@/lib/types';

export const CmsContentManager = () => {
  const [contents, setContents] = useState<CmsContent[]>([]);

  useEffect(() => {
    const fetchContents = async () => {
      try {
        const { data, error } = await supabase
          .from("cms_content")
          .select("*");
        
        if (error) throw error;
        
        // Map the response to include author_id from created_by
        const contentsWithAuthor = (data || []).map(item => ({
          ...item,
          author_id: item.created_by
        }));
        
        setContents(contentsWithAuthor);
        toast.success("Content loaded successfully");
      } catch (err) {
        console.error("Error fetching contents:", err);
        toast.error("Error loading content");
      }
    };

    fetchContents();
  }, []);

  return (
    <div>
      {contents.map((content) => (
        <div key={content.id}>
          <h3>{content.title}</h3>
          <p>Status: {content.status}</p>
        </div>
      ))}
    </div>
  );
};