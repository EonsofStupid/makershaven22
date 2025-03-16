
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { atom, useAtom } from "jotai";

export interface Post {
  id: string;
  title: string;
  content: string;
  status: string | null;
  updated_at: string | null;
  views_count: number | null;
  author_id: string | null;
}

export interface PostWithAuthor extends Post {
  profiles: {
    display_name: string;
    username: string;
  };
}

// Create Jotai atoms for post state management
export const postsAtom = atom<PostWithAuthor[]>([]);
export const postsLoadingAtom = atom(false);
export const postsErrorAtom = atom<Error | null>(null);

export const usePostsQuery = () => {
  const [, setPosts] = useAtom(postsAtom);
  const [, setLoading] = useAtom(postsLoadingAtom);
  const [, setError] = useAtom(postsErrorAtom);

  return useQuery({
    queryKey: ['admin-posts'],
    queryFn: async () => {
      console.log('Starting posts fetch operation...');
      setLoading(true);
      
      try {
        console.log('Executing Supabase query with profiles join...');
        const { data: rawData, error: rawError } = await supabase
          .from('blog_posts')
          .select(`
            *,
            profiles:author_id(
              display_name,
              username
            )
          `)
          .order('updated_at', { ascending: false });

        console.log('Raw Supabase Response:', { data: rawData, error: rawError });

        if (rawError) {
          console.error('Error in Supabase query:', rawError);
          toast.error('Failed to load posts');
          throw rawError;
        }

        if (!rawData) {
          console.warn('No data returned from Supabase');
          return [];
        }

        // Transform the data
        console.log('Transforming posts data...');
        const transformedData: PostWithAuthor[] = rawData.map(post => {
          // Extract profile data or use default empty values
          const profileData = post.profiles && typeof post.profiles === 'object' 
            ? post.profiles 
            : { display_name: '', username: '' };

          return {
            ...post,
            // Ensure we have a properly typed profiles object
            profiles: {
              display_name: profileData.display_name || '',
              username: profileData.username || ''
            }
          };
        });

        // Update atoms
        setPosts(transformedData);
        console.log('Successfully transformed posts:', transformedData);
        return transformedData;
      } catch (error) {
        console.error('Unexpected error in posts query:', error);
        setError(error as Error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
  });
};
