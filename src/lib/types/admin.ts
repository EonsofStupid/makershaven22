
export interface AdminSetting {
  id: string;
  setting_key: string; 
  setting_value: string;
  setting_type: string;
  created_at?: string;
  updated_at?: string;
}

export interface RedisConfig {
  host: string;
  port: number;
  password?: string;
  enabled: boolean;
}
