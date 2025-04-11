
import { create } from 'zustand';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import type { FeatureFlags, KnownFeatureFlag } from '@/lib/types/feature-flags-types';

interface FeatureFlagsState {
  flags: Record<string, boolean>;
  bitmask: number;
  isLoading: boolean;
  error: Error | null;
  
  fetchFeatureFlags: (userId: string) => Promise<void>;
  hasFeature: (flag: KnownFeatureFlag) => boolean;
}

export const useFeatureFlagsStore = create<FeatureFlagsState>((set, get) => ({
  flags: {},
  bitmask: 0,
  isLoading: false,
  error: null,
  
  fetchFeatureFlags: async (userId: string) => {
    if (!userId) return;
    
    set({ isLoading: true, error: null });
    
    try {
      const { data, error } = await supabase
        .from('feature_flags')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle();
      
      if (error) throw error;
      
      if (data) {
        const featureFlags = data as FeatureFlags;
        set({ 
          flags: featureFlags.flags || {},
          isLoading: false 
        });
        
        // Calculate bitmask
        let bitmask = 0;
        Object.entries(featureFlags.flags || {}).forEach(([key, enabled]) => {
          if (enabled && KnownFeatureFlag[key as keyof typeof KnownFeatureFlag]) {
            bitmask |= KnownFeatureFlag[key as keyof typeof KnownFeatureFlag];
          }
        });
        
        set({ bitmask });
      } else {
        set({ 
          flags: {},
          bitmask: 0,
          isLoading: false 
        });
      }
    } catch (error) {
      console.error('Error fetching feature flags:', error);
      set({ 
        error: error as Error, 
        isLoading: false,
        flags: {},
        bitmask: 0
      });
    }
  },
  
  hasFeature: (flag: KnownFeatureFlag) => {
    const { bitmask } = get();
    return (bitmask & flag) !== 0;
  }
}));
