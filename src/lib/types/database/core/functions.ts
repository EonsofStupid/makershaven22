import type { Json } from './json';

export interface DatabaseFunctions {
  check_rate_limit: {
    Args: { 
      p_user_id: string;
      p_action_type: string;
      p_max_count: number;
      p_time_window: string;
    };
    Returns: boolean;
  };
  ban_user: {
    Args: {
      user_id: string;
      reason: string;
      admin_id: string;
    };
    Returns: void;
  };
  verify_2fa_code: {
    Args: {
      p_code: string;
      p_email: string;
    };
    Returns: Json;
  };
  resend_2fa_code: {
    Args: {
      p_email: string;
    };
    Returns: void;
  };
}