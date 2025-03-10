
-- Policy for admins to update any profile
-- Uses the security definer function to prevent recursion
CREATE POLICY "Admins can update all profiles" ON public.profiles
FOR UPDATE USING (
  public.is_admin(auth.uid())
);
