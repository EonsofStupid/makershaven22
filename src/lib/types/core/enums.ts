
/**
 * User roles
 */
export enum UserRole {
  GUEST = 'guest',
  SUBSCRIBER = 'subscriber',
  MAKER = 'maker',
  MODERATOR = 'moderator',
  ADMIN = 'admin',
  SUPER_ADMIN = 'super_admin'
}

/**
 * Theme modes
 */
export enum ThemeMode {
  LIGHT = 'light',
  DARK = 'dark',
  SYSTEM = 'system'
}

/**
 * Transition types for UI elements
 */
export enum TransitionType {
  FADE = 'fade',
  SLIDE = 'slide',
  SCALE = 'scale',
  NONE = 'none'
}

/**
 * Glass effect levels for UI components
 */
export enum GlassEffectLevel {
  NONE = 'none',
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high'
}

/**
 * Content types
 */
export enum ContentType {
  PAGE = 'page',
  POST = 'post',
  PRODUCT = 'product',
  PART = 'part',
  BUILD = 'build',
  GUIDE = 'guide',
  TEMPLATE = 'template'
}

/**
 * Content status
 */
export enum ContentStatus {
  DRAFT = 'draft',
  PENDING = 'pending',
  PUBLISHED = 'published',
  ARCHIVED = 'archived',
  REJECTED = 'rejected'
}
