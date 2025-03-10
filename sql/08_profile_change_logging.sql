
-- Log profile changes for audit trail
CREATE OR REPLACE FUNCTION public.log_profile_changes()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO audit_logs (
    category,
    severity,
    event_type,
    action,
    user_id,
    resource_type,
    resource_id,
    previous_state,
    new_state
  ) VALUES (
    'data_access',
    CASE 
      WHEN NEW.is_banned <> OLD.is_banned THEN 'high'
      WHEN NEW.role <> OLD.role THEN 'high'
      ELSE 'info'
    END,
    'profile_update',
    TG_OP,
    auth.uid(),
    'profile',
    NEW.id,
    to_jsonb(OLD),
    to_jsonb(NEW)
  );
  RETURN NEW;
END;
$$;

-- Add trigger for logging profile changes
CREATE TRIGGER log_profile_changes
  AFTER UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.log_profile_changes();
