
import { create } from 'zustand';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

// Define types for our printer builds
export interface PrinterBuild {
  id: string;
  title: string;
  description?: string;
  status: string;
  difficulty_level: string;
  user_id: string;
  estimated_time?: string;
  likes_count?: number;
  views_count?: number;
  build_specs?: {
    category?: string;
    buildVolume?: {
      x: number;
      y: number;
      z: number;
    };
    features?: string[];
  };
  parts_list?: any[];
  media_links?: {
    gallery?: string[];
    videos?: string[];
    main_image?: string;
  };
  created_at?: string;
  updated_at?: string;
}

// Define props for fetching builds
interface FetchBuildsProps {
  limit?: number;
  page?: number;
  status?: string;
  category?: string;
  difficulty?: string;
  searchTerm?: string;
}

// Define our store state
interface PrinterBuildsState {
  builds: PrinterBuild[];
  filteredBuilds: PrinterBuild[];
  currentBuild: PrinterBuild | null;
  isLoading: boolean;
  error: Error | null;
  totalCount: number;
  hasMore: boolean;
  currentPage: number;
  
  // Actions
  fetchBuilds: (props?: FetchBuildsProps) => Promise<void>;
  getBuildById: (id: string) => Promise<PrinterBuild | null>;
  filterBuilds: (filters: Partial<FetchBuildsProps>) => void;
  setCurrentBuild: (build: PrinterBuild | null) => void;
  clearError: () => void;
}

export const usePrinterBuildsStore = create<PrinterBuildsState>((set, get) => ({
  builds: [],
  filteredBuilds: [],
  currentBuild: null,
  isLoading: false,
  error: null,
  totalCount: 0,
  hasMore: false,
  currentPage: 1,
  
  fetchBuilds: async (props = {}) => {
    const { limit = 10, page = 1, status = 'approved', category, difficulty, searchTerm } = props;
    
    set({ isLoading: true, error: null });
    
    try {
      console.log('Fetching printer builds with params:', props);
      
      // Start building our query
      let query = supabase
        .from('printer_builds')
        .select('*', { count: 'exact' });
      
      // Apply status filter - always filter by approved for public access
      query = query.eq('status', status);
      
      // Apply optional filters
      if (category) {
        query = query.contains('build_specs', { category: category });
      }
      
      if (difficulty) {
        query = query.eq('difficulty_level', difficulty);
      }
      
      if (searchTerm) {
        query = query.or(`title.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`);
      }
      
      // Apply pagination
      const from = (page - 1) * limit;
      const to = from + limit - 1;
      
      // Execute the query
      const { data, error, count } = await query
        .order('created_at', { ascending: false })
        .range(from, to);
      
      if (error) throw error;
      
      // Handle the results
      const totalCount = count || 0;
      const hasMore = totalCount > from + data.length;
      
      set({
        builds: data as PrinterBuild[],
        filteredBuilds: data as PrinterBuild[],
        totalCount,
        hasMore,
        currentPage: page,
        isLoading: false
      });
      
      console.log(`Fetched ${data.length} printer builds. Total count: ${totalCount}`);
    } catch (error) {
      console.error('Error fetching printer builds:', error);
      set({ error: error as Error, isLoading: false });
      toast.error('Failed to load printer builds', {
        description: 'There was a problem fetching printer builds. Please try again.'
      });
    }
  },
  
  getBuildById: async (id: string) => {
    try {
      const { data, error } = await supabase
        .from('printer_builds')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      
      if (data) {
        set({ currentBuild: data as PrinterBuild });
        return data as PrinterBuild;
      }
      
      return null;
    } catch (error) {
      console.error('Error fetching printer build by ID:', error);
      set({ error: error as Error });
      toast.error('Failed to load printer build', {
        description: 'The requested build could not be loaded.'
      });
      return null;
    }
  },
  
  filterBuilds: (filters) => {
    const { builds } = get();
    let filtered = [...builds];
    
    // Apply filters based on the provided criteria
    if (filters.category) {
      filtered = filtered.filter(build => 
        build.build_specs?.category === filters.category
      );
    }
    
    if (filters.difficulty) {
      filtered = filtered.filter(build =>
        build.difficulty_level === filters.difficulty
      );
    }
    
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(build =>
        build.title.toLowerCase().includes(searchLower) ||
        (build.description?.toLowerCase().includes(searchLower) || false)
      );
    }
    
    set({ filteredBuilds: filtered });
  },
  
  setCurrentBuild: (build) => set({ currentBuild: build }),
  
  clearError: () => set({ error: null })
}));

// Helper function to format build data for display
export const formatBuildsForDisplay = (builds: PrinterBuild[]) => {
  return builds.map(build => ({
    ...build,
    category: build.build_specs?.category || 'Uncategorized',
    parts_count: build.parts_list?.length || 0,
    // Format any other fields as needed for display
  }));
};
