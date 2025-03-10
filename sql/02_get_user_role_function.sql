
-- Create a security definer function to get the current user's role
-- This prevents infinite recursion when checking role in policies
CREATE OR REPLACE FUNCTION public.get_user_role()
RETURNS text
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT role::text FROM profiles WHERE id = auth.uid();
$$;
