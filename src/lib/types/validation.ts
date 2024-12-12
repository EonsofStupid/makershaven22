import { AuthUser, AuthSession } from '@/lib/auth/types/auth';

export function isValidAuthUser(user: unknown): user is AuthUser {
  if (!user || typeof user !== 'object') return false;
  
  const typedUser = user as AuthUser;
  return (
    typeof typedUser.id === 'string' &&
    (typedUser.email === undefined || typeof typedUser.email === 'string' || typedUser.email === null) &&
    (typedUser.role === undefined || typeof typedUser.role === 'string') &&
    (typedUser.username === undefined || typeof typedUser.username === 'string')
  );
}

export function isValidAuthSession(session: unknown): session is AuthSession {
  if (!session || typeof session !== 'object') return false;
  
  const typedSession = session as AuthSession;
  return (
    isValidAuthUser(typedSession.user) &&
    (typedSession.expires_at === undefined || typeof typedSession.expires_at === 'number')
  );
}

export function assertType<T>(value: unknown, validator: (val: unknown) => val is T): T {
  if (!validator(value)) {
    throw new Error(`Type assertion failed: ${JSON.stringify(value)}`);
  }
  return value;
}