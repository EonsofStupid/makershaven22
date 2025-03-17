
export type ThemeMode = 'light' | 'dark' | 'system';
export type TransitionType = 'fade' | 'slide' | 'scale' | 'blur';
export type GlassEffectLevel = 'none' | 'light' | 'medium' | 'heavy';

export enum BuildDifficulty {
  Beginner = 'beginner',
  Intermediate = 'intermediate',
  Advanced = 'advanced',
  Expert = 'expert'
}

export enum BuildStatus {
  Draft = 'draft',
  Pending = 'pending',
  Approved = 'approved',
  Rejected = 'rejected'
}

export enum ContentType {
  Page = 'page',
  Component = 'component',
  Template = 'template',
  Workflow = 'workflow',
  Hero = 'hero',
  Feature = 'feature'
}

export enum ContentStatus {
  Draft = 'draft',
  Published = 'published',
  Archived = 'archived'
}

export enum UserRole {
  Subscriber = 'subscriber',
  Maker = 'maker',
  Admin = 'admin',
  SuperAdmin = 'super_admin',
  Moderator = 'moderator'
}

// Settings types
export enum SettingCategory {
  Theme = 'theme',
  Security = 'security',
  Site = 'site',
  User = 'user'
}

export enum SettingType {
  Theme = 'theme',
  Security = 'security',
  Site = 'site',
  User = 'user'
}

export enum ThemeInheritanceStrategy {
  Merge = 'merge',
  Override = 'override'
}

export enum ComponentType {
  Card = 'card',
  Button = 'button',
  Input = 'input',
  Typography = 'typography',
  Layout = 'layout'
}

export enum ThemeAvailabilityStatus {
  Enabled = 'enabled',
  Disabled = 'disabled',
  Preview = 'preview'
}
