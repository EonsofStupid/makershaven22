import type { BaseEntity } from '../core/base-types';
import type { UserRole } from '../core/enums';

export interface Profile extends BaseEntity {
  username?: string;
  display_name?: string;
  avatar_url?: string;
  role?: UserRole;
  bio?: string;
  website?: string;
  location?: string;
  last_seen?: string;
}