
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';

// TODO: Update these imports once Supabase client is properly set up
const supabase = {
  from: (table: string) => ({
    select: (query: string) => ({
      or: (condition: string) => Promise.resolve({ data: [], error: null })
    })
  })
};

// TODO: Import BaseContent type from the appropriate location
interface BaseContent {
  id: string;
  title: string;
  status: string;
  author_id?: string;
  created_by?: string;
}

export const CmsContentManager = () => {
  const [contents, setContents] = useState<BaseContent[]>([]);

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
        })) as BaseContent[];
        
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
