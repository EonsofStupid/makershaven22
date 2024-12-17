export type UserRole = 'subscriber' | 'maker' | 'admin' | 'super_admin';

export interface RoleHierarchy {
  [key: string]: number;
}

export const ROLE_HIERARCHY: RoleHierarchy = {
  subscriber: 0,
  maker: 1,
  admin: 2,
  super_admin: 3
};