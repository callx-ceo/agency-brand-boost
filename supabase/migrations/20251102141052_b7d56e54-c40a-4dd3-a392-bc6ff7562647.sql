-- Security definer function to initialize agency owner
-- This allows creating the first owner role for a new agency without requiring existing permissions
CREATE OR REPLACE FUNCTION public.initialize_agency_owner(
  _user_id UUID,
  _agency_id UUID
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Insert the owner role for the new agency
  INSERT INTO public.user_roles (user_id, agency_id, role)
  VALUES (_user_id, _agency_id, 'owner')
  ON CONFLICT (user_id, agency_id, role) DO NOTHING;
END;
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION public.initialize_agency_owner TO authenticated;