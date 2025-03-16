
import { KnownFeatureFlag } from "@/lib/types/feature-flags";

/**
 * Check if a user has a specific feature enabled
 * @param userFlags The numeric bitmask of user flags
 * @param flag The feature flag to check
 * @returns boolean indicating if the feature is enabled
 */
export function hasFeature(userFlags: number, flag: KnownFeatureFlag): boolean {
  return (userFlags & flag) !== 0;
}

/**
 * Convert a flags object to a bitmask
 * @param flags Object with feature flag keys and boolean values
 * @returns number representing the combined bitmask
 */
export function flagsToBitmask(flags: Record<string, boolean>): number {
  let bitmask = 0;
  
  Object.entries(flags).forEach(([key, value]) => {
    if (value && KnownFeatureFlag[key as keyof typeof KnownFeatureFlag]) {
      bitmask |= KnownFeatureFlag[key as keyof typeof KnownFeatureFlag];
    }
  });
  
  return bitmask;
}

/**
 * Convert a bitmask to a flags object
 * @param bitmask Number representing the combined feature flags
 * @returns Object with feature flag keys and boolean values
 */
export function bitmaskToFlags(bitmask: number): Record<string, boolean> {
  const result: Record<string, boolean> = {};
  
  Object.entries(KnownFeatureFlag).forEach(([key, value]) => {
    // Skip numeric keys (the enum has reverse mappings)
    if (!isNaN(Number(key))) return;
    
    // Check if this flag bit is set
    if (typeof value === 'number') {
      result[key] = (bitmask & value) !== 0;
    }
  });
  
  return result;
}
