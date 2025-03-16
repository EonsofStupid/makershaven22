
/**
 * Known feature flags for the application
 */
export enum KnownFeatureFlag {
  // User privileges
  HAS_SUBSITE = 1 << 0,         // Can have their own subsite
  CAN_ADD_UPDATES = 1 << 1,      // Can add updates to their builds
  CAN_UPLOAD_MODELS = 1 << 2,    // Can upload 3D models
  IS_FEATURED = 1 << 3,          // User is featured on homepage
  
  // Content privileges
  CAN_BULK_UPLOAD = 1 << 4,      // Can bulk upload content
  CAN_CREATE_COLLECTIONS = 1 << 5, // Can create collections
  
  // Admin privileges
  CAN_MODERATE = 1 << 6,         // Can moderate content
  CAN_APPROVE_BUILDS = 1 << 7,   // Can approve printer builds
  CAN_MANAGE_USERS = 1 << 8      // Can manage user accounts
}

/**
 * Feature flags object from database
 */
export interface FeatureFlags {
  id: string;
  user_id: string;
  flags: {
    [key: string]: boolean;
  };
  updated_at: string;
  created_at: string;
}

/**
 * Helper to check if a specific feature flag is enabled
 */
export function hasFeature(flags: number, flag: KnownFeatureFlag): boolean {
  return (flags & flag) !== 0;
}

/**
 * Helper to calculate the bitmask from a feature flags object
 */
export function calculateBitmask(flags: { [key: string]: boolean }): number {
  let bitmask = 0;
  
  Object.entries(flags).forEach(([key, enabled]) => {
    if (enabled && KnownFeatureFlag[key as keyof typeof KnownFeatureFlag]) {
      bitmask |= KnownFeatureFlag[key as keyof typeof KnownFeatureFlag];
    }
  });
  
  return bitmask;
}
