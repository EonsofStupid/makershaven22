export type UserRole = 'subscriber' | 'maker' | 'admin' | 'super_admin';

export const USER_ROLES: UserRole[] = ['subscriber', 'maker', 'admin', 'super_admin'];

export const isValidRole = (role: string): role is UserRole => {
  return USER_ROLES.includes(role as UserRole);
};