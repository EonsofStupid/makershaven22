
import { UserRole } from "../shared/types/enums";

export interface User {
  id: string;
  email: string;
  name?: string;
  role: UserRole;
  avatar?: string;
  metadata?: Record<string, any>;
}

export interface Session {
  id: string;
  userId: string;
  expiresAt: string;
  token: string;
}

export interface AuthState {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isTransitioning: boolean;
  hasAccess: boolean;
  error: string | null;
}
