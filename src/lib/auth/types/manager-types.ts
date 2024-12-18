export interface ISessionManager {
  startSession(): Promise<void>;
  destroy(): void;
  isInitialized(): boolean;
}

export interface ISecurityManager {
  initialize(): void;
  clearSecurityData(): void;
  cleanup(): void;
  validateSession(): Promise<boolean>;
}