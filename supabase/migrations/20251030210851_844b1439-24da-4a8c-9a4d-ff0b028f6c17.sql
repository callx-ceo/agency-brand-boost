-- Create agency notification preferences table for agency-wide defaults
CREATE TABLE IF NOT EXISTS public.agency_notification_preferences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  agency_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  email_enabled boolean DEFAULT false,
  sms_enabled boolean DEFAULT false,
  in_app_enabled boolean DEFAULT true,
  performance_emails_enabled boolean DEFAULT false,
  email_frequency text DEFAULT 'per-call' CHECK (email_frequency IN ('per-call', 'daily', 'weekly')),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  UNIQUE(agency_id)
);

-- Enable RLS
ALTER TABLE public.agency_notification_preferences ENABLE ROW LEVEL SECURITY;

-- Agencies can manage their own defaults
CREATE POLICY "Agencies can view own defaults"
  ON public.agency_notification_preferences
  FOR SELECT
  USING (auth.uid() = agency_id);

CREATE POLICY "Agencies can insert own defaults"
  ON public.agency_notification_preferences
  FOR INSERT
  WITH CHECK (auth.uid() = agency_id);

CREATE POLICY "Agencies can update own defaults"
  ON public.agency_notification_preferences
  FOR UPDATE
  USING (auth.uid() = agency_id);

-- Create trigger for updated_at
CREATE TRIGGER update_agency_notification_preferences_updated_at
  BEFORE UPDATE ON public.agency_notification_preferences
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

COMMENT ON TABLE public.agency_notification_preferences IS 'Agency-level notification preference defaults that apply to all agents unless overridden.';