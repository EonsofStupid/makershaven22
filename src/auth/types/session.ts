
import { User } from './auth';

export interface Session {
  user: User;
  expires_at?: number;
  access_token?: string;
  refresh_token?: string;
}

export type AuthSession = {
  user: User;
  expires_at?: number;
  access_token?: string;
};
