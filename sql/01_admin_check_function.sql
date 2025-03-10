
-- Create a security definer function to check admin role
-- This prevents infinite recursion in policies
CREATE OR REPLACE FUNCTION public.is_admin(user_id uuid)
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1 FROM profiles
    WHERE id = user_id 
    AND role IN ('admin'::user_role, 'super_admin'::user_role)
  );
$$;
