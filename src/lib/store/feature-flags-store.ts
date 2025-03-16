
import { create } from 'zustand';
import { supabase } from '@/integrations/supabase/client';
import { bitmaskToFlags, flagsToBitmask } from '@/lib/utils/feature-flags';
import { KnownFeatureFlag } from '@/lib/types/feature-flags';

interface FeatureFlagsState {
  // State
  flags: Record<string, boolean>;
  isLoading: boolean;
  error: Error | null;
  
  // Actions
  fetchUserFlags: (userId: string) => Promise<void>;
  hasFeature: (flag: KnownFeatureFlag) => boolean;
  setFeature: (flag: KnownFeatureFlag, enabled: boolean) => void;
  saveFlags: (userId: string) => Promise<void>;
}

export const useFeatureFlagsStore = create<FeatureFlagsState>((set, get) => ({
  // Initial state with all features disabled
  flags: Object.keys(KnownFeatureFlag)
    .filter(key => isNaN(Number(key))) // Filter out numeric keys
    .reduce((acc, key) => ({ ...acc, [key]: false }), {}),
  isLoading: false,
  error: null,
  
  // Fetch user's feature flags
  fetchUserFlags: async (userId: string) => {
    if (!userId) return;
    
    set({ isLoading: true, error: null });
    
    try {
      const { data, error } = await supabase
        .from('feature_flags')
        .select('flags')
        .eq('user_id', userId)
        .single();
      
      if (error) {
        // If no record found, create one with default flags
        if (error.code === 'PGRST116') {
          const defaultFlags = get().flags;
          await supabase
            .from('feature_flags')
            .insert({ user_id: userId, flags: defaultFlags });
          
          set({ flags: defaultFlags, isLoading: false });
          return;
        }
        
        throw error;
      }
      
      set({ flags: data.flags, isLoading: false });
    } catch (error) {
      console.error('Error fetching user feature flags:', error);
      set({ error: error as Error, isLoading: false });
    }
  },
  
  // Check if a feature is enabled
  hasFeature: (flag: KnownFeatureFlag) => {
    const { flags } = get();
    const flagName = KnownFeatureFlag[flag] as string;
    return flags[flagName] || false;
  },
  
  // Set a feature flag
  setFeature: (flag: KnownFeatureFlag, enabled: boolean) => {
    const flagName = KnownFeatureFlag[flag] as string;
    if (!flagName) return;
    
    set(state => ({
      flags: {
        ...state.flags,
        [flagName]: enabled
      }
    }));
  },
  
  // Save flags to database
  saveFlags: async (userId: string) => {
    if (!userId) return;
    
    set({ isLoading: true, error: null });
    
    try {
      const { flags } = get();
      
      const { error } = await supabase
        .from('feature_flags')
        .upsert({ 
          user_id: userId, 
          flags: flags,
          updated_at: new Date().toISOString()
        });
      
      if (error) throw error;
      
      set({ isLoading: false });
    } catch (error) {
      console.error('Error saving feature flags:', error);
      set({ error: error as Error, isLoading: false });
    }
  }
}));
