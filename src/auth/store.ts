
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { User, Session, AuthState } from './types';
import { LogCategory } from '../shared/types/enums';
import { createLogger } from '../logging/logger';

// Logger instance for auth operations
const logger = createLogger('authStore');

export interface AuthStoreActions {
  setUser: (user: User | null) => void;
  setSession: (session: Session | null) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  setTransitioning: (isTransitioning: boolean) => void;
  logout: () => void;
  hasRole: (role: string | string[]) => boolean;
}

export type AuthStore = AuthState & AuthStoreActions;

export const useAuthStore = create<AuthStore>()(
  devtools(
    persist(
      (set, get) => ({
        user: null,
        session: null,
        isLoading: true,
        isTransitioning: false,
        hasAccess: false,
        error: null,

        setUser: (user) => {
          logger.log(`Setting user: ${user?.id || 'null'}`);
          set({ user, hasAccess: !!user });
        },

        setSession: (session) => {
          logger.log(`Setting session: ${session?.id || 'null'}`);
          set({ session });
        },

        setLoading: (isLoading) => {
          set({ isLoading });
        },

        setError: (error) => {
          if (error) {
            logger.logError('Auth error', new Error(error));
          }
          set({ error });
        },

        setTransitioning: (isTransitioning) => {
          set({ isTransitioning });
        },

        logout: () => {
          logger.log('Logging out user');
          set({ user: null, session: null, hasAccess: false });
        },

        hasRole: (role) => {
          const { user } = get();
          if (!user) return false;
          
          const roles = Array.isArray(role) ? role : [role];
          return roles.includes(user.role);
        }
      }),
      {
        name: 'auth-store',
        partialize: (state) => ({ 
          user: state.user,
          session: state.session
        }),
      }
    )
  )
);
