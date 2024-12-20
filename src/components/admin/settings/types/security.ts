export interface IPSecuritySettings {
  ip_whitelist: string[];
  ip_blacklist: string[];
  enable_ip_filtering: boolean;
  max_login_attempts: number;
  lockout_duration: number; // in minutes
  trusted_proxies?: string[];
}

export interface SecuritySettings extends IPSecuritySettings {
  two_factor_auth: boolean;
  password_expiry_days: number;
  session_timeout: number; // in minutes
  require_strong_passwords: boolean;
  minimum_password_length: number;
}

export const defaultSecuritySettings: SecuritySettings = {
  ip_whitelist: [],
  ip_blacklist: [],
  enable_ip_filtering: false,
  max_login_attempts: 5,
  lockout_duration: 30,
  trusted_proxies: [],
  two_factor_auth: false,
  password_expiry_days: 90,
  session_timeout: 60,
  require_strong_passwords: true,
  minimum_password_length: 12
}; 