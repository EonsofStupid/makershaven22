import type { Json } from "../../base";

export interface PinSetupFunction {
  Args: {
    p_user_id: string;
    p_pin: string;
    p_ip_address?: string | null;
    p_user_agent?: string | null;
  };
  Returns: Json;
}

export interface VerifyPinFunction {
  Args: {
    p_user_id: string;
    p_pin: string;
    p_ip_address?: string | null;
    p_user_agent?: string | null;
  };
  Returns: Json;
}

export interface Verify2FAFunction {
  Args: {
    p_code: string;
    p_email: string;
  };
  Returns: Json;
}

export interface BanUserFunction {
  Args: {
    user_id: string;
    reason: string;
    admin_id: string;
  };
  Returns: void;
}

export interface ResetPinLockoutFunction {
  Args: {
    p_user_id: string;
  };
  Returns: void;
}