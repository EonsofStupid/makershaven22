
import { create } from 'zustand';
import { supabase, withRetry } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import type { PrinterBuild, ProjectSummary } from '@/lib/types/content/printer-build';

interface PrinterBuildsState {
  // Build state
  builds: PrinterBuild[];
  currentBuild: PrinterBuild | null;
  featuredBuilds: PrinterBuild[];
  isLoading: boolean;
  error: Error | null;
  
  // Filtering state
  filterDifficulty: string | null;
  filterCategory: string | null;
  searchQuery: string;
  
  // Actions
  fetchBuilds: (limit?: number) => Promise<void>;
  fetchFeaturedBuilds: () => Promise<void>;
  fetchBuildById: (id: string) => Promise<PrinterBuild | null>;
  
  // Filter actions
  setFilterDifficulty: (difficulty: string | null) => void;
  setFilterCategory: (category: string | null) => void;
  setSearchQuery: (query: string) => void;
  clearFilters: () => void;
}

export const usePrinterBuildsStore = create<PrinterBuildsState>((set, get) => ({
  // Initial state
  builds: [],
  currentBuild: null,
  featuredBuilds: [],
  isLoading: false,
  error: null,
  
  filterDifficulty: null,
  filterCategory: null,
  searchQuery: '',
  
  // Fetch all builds with basic filtering
  fetchBuilds: async (limit = 10) => {
    set({ isLoading: true, error: null });
    
    try {
      const { filterDifficulty, filterCategory, searchQuery } = get();
      
      let query = supabase
        .from('printer_builds')
        .select('*')
        .eq('status', 'approved')
        .order('created_at', { ascending: false });
      
      if (filterDifficulty) {
        query = query.eq('difficulty_level', filterDifficulty);
      }
      
      if (filterCategory && filterCategory !== 'All') {
        query = query.ilike('title', `%${filterCategory}%`);
      }
      
      if (searchQuery) {
        query = query.or(`title.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%`);
      }
      
      if (limit) {
        query = query.limit(limit);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      
      set({ builds: data as PrinterBuild[], isLoading: false });
    } catch (error) {
      console.error('Error fetching printer builds:', error);
      set({ error: error as Error, isLoading: false });
      toast.error('Failed to load builds', {
        description: 'Please try again later'
      });
    }
  },
  
  // Fetch featured builds
  fetchFeaturedBuilds: async () => {
    set({ isLoading: true, error: null });
    
    try {
      const { data, error } = await supabase
        .from('printer_builds')
        .select('*')
        .eq('status', 'approved')
        .order('views_count', { ascending: false })
        .limit(5);
      
      if (error) throw error;
      
      set({ featuredBuilds: data as PrinterBuild[], isLoading: false });
    } catch (error) {
      console.error('Error fetching featured builds:', error);
      set({ error: error as Error, isLoading: false });
    }
  },
  
  // Fetch a single build by ID
  fetchBuildById: async (id: string) => {
    set({ isLoading: true, error: null });
    
    try {
      const { data, error } = await supabase
        .from('printer_builds')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      
      set({ currentBuild: data as PrinterBuild, isLoading: false });
      return data as PrinterBuild;
    } catch (error) {
      console.error('Error fetching build details:', error);
      set({ error: error as Error, isLoading: false });
      toast.error('Failed to load build details');
      return null;
    }
  },
  
  // Filter actions
  setFilterDifficulty: (difficulty) => set({ filterDifficulty: difficulty }),
  setFilterCategory: (category) => set({ filterCategory: category }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  clearFilters: () => set({ 
    filterDifficulty: null, 
    filterCategory: null,
    searchQuery: '' 
  }),
}));

// Helper function to prepare data for the landing page table
export const formatBuildsForTable = (builds: PrinterBuild[]): ProjectSummary[] => {
  return builds.map(build => ({
    id: build.id,
    title: build.title,
    category: build.build_specs?.category || 'General',
    difficulty_level: build.difficulty_level,
    estimated_time: build.estimated_time,
    parts_count: Array.isArray(build.parts_list) ? build.parts_list.length : 0,
    likes_count: build.likes_count,
    views_count: build.views_count
  }));
};
