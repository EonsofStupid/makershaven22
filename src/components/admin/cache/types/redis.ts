export interface RedisConfig {
  enabled: boolean;
  host: string;
  port: string;
  password?: string;
  ttl: number;
  maxMemory: number;
  restrictedMode: boolean;
  features: {
    sessionManagement: boolean;
    caching: boolean;
    realTimeUpdates: boolean;
  };
}