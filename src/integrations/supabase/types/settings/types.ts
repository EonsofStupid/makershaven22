import { Json } from '../base/json';

export type SettingValueType = 'string' | 'number' | 'boolean' | 'json';

export interface AdminSetting {
  id: string;
  setting_key: string;
  setting_value: string | null;
  setting_type: SettingValueType;
  created_at?: string;
  updated_at?: string | null;
}

// Type guard to check if a value matches our setting type
export const isValidSettingValue = (value: unknown, type: SettingValueType): boolean => {
  switch (type) {
    case 'string':
      return typeof value === 'string';
    case 'number':
      return typeof value === 'number';
    case 'boolean':
      return typeof value === 'boolean';
    case 'json':
      try {
        JSON.parse(String(value));
        return true;
      } catch {
        return false;
      }
    default:
      return false;
  }
};

// Type guard for settings object
export const isAdminSetting = (obj: unknown): obj is AdminSetting => {
  if (!obj || typeof obj !== 'object') return false;
  
  const setting = obj as AdminSetting;
  return (
    typeof setting.setting_key === 'string' &&
    (setting.setting_value === null || typeof setting.setting_value === 'string') &&
    ['string', 'number', 'boolean', 'json'].includes(setting.setting_type)
  );
};

// Utility type for settings with specific value types
export type TypedSetting<T> = Omit<AdminSetting, 'setting_value'> & {
  setting_value: T | null;
};

// Helper function to safely parse setting values
export const parseSettingValue = <T>(
  setting: AdminSetting,
  defaultValue: T
): T => {
  if (!setting.setting_value) return defaultValue;

  try {
    switch (setting.setting_type) {
      case 'number':
        return Number(setting.setting_value) as T;
      case 'boolean':
        return (setting.setting_value.toLowerCase() === 'true') as unknown as T;
      case 'json':
        return JSON.parse(setting.setting_value) as T;
      default:
        return setting.setting_value as unknown as T;
    }
  } catch {
    return defaultValue;
  }
};