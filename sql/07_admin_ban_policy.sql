
-- Policy for admin-only user banning
-- Uses the security definer function to prevent recursion
CREATE POLICY "Only admins can ban users" ON public.profiles
FOR UPDATE USING (
  public.is_admin(auth.uid())
) WITH CHECK (
  public.is_admin(auth.uid()) AND
  (
    NEW.is_banned IS DISTINCT FROM OLD.is_banned OR
    NEW.banned_at IS DISTINCT FROM OLD.banned_at OR
    NEW.banned_by IS DISTINCT FROM OLD.banned_by OR
    NEW.ban_reason IS DISTINCT FROM OLD.ban_reason
  )
);
