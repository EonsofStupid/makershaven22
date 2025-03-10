
-- Policy for viewing public profile data
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles
FOR SELECT USING (
  true -- Allow reading public fields
);
