
-- Policy for users to update their own basic profile
CREATE POLICY "Users can update their own profile" ON public.profiles
FOR UPDATE USING (
  auth.uid() = id
)
WITH CHECK (
  auth.uid() = id AND
  -- Prevent updating security/system fields
  NEW.role IS NOT DISTINCT FROM OLD.role AND
  NEW.is_banned IS NOT DISTINCT FROM OLD.is_banned AND
  NEW.banned_at IS NOT DISTINCT FROM OLD.banned_at AND
  NEW.banned_by IS NOT DISTINCT FROM OLD.banned_by AND
  NEW.ban_reason IS NOT DISTINCT FROM OLD.ban_reason AND
  NEW.last_login_at IS NOT DISTINCT FROM OLD.last_login_at
);
