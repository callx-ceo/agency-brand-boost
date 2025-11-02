-- Add agency_model enum and column to support the three agency types
CREATE TYPE public.agency_model AS ENUM ('marketplace_buyers', 'bring_your_own_media', 'hybrid');

-- Add agency_model column to agency_branding table (or create agencies table if needed)
-- Assuming we'll extend the agency_branding table for now
ALTER TABLE public.agency_branding 
ADD COLUMN agency_model public.agency_model DEFAULT 'marketplace_buyers';

-- Add description column to store additional info about the agency
ALTER TABLE public.agency_branding 
ADD COLUMN agency_description text;

-- Add created_at if it doesn't exist
ALTER TABLE public.agency_branding 
ADD COLUMN IF NOT EXISTS created_at timestamp with time zone DEFAULT now();