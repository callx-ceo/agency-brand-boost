-- Create agent notification preferences table
CREATE TABLE IF NOT EXISTS public.agent_notification_preferences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  email_enabled boolean DEFAULT NULL,
  sms_enabled boolean DEFAULT NULL,
  in_app_enabled boolean DEFAULT NULL,
  performance_emails_enabled boolean DEFAULT NULL,
  email_frequency text DEFAULT NULL CHECK (email_frequency IN ('per-call', 'daily', 'weekly')),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  UNIQUE(agent_id)
);

-- Enable RLS
ALTER TABLE public.agent_notification_preferences ENABLE ROW LEVEL SECURITY;

-- Agents can view and manage their own preferences
CREATE POLICY "Agents can view own preferences"
  ON public.agent_notification_preferences
  FOR SELECT
  USING (auth.uid() = agent_id);

CREATE POLICY "Agents can insert own preferences"
  ON public.agent_notification_preferences
  FOR INSERT
  WITH CHECK (auth.uid() = agent_id);

CREATE POLICY "Agents can update own preferences"
  ON public.agent_notification_preferences
  FOR UPDATE
  USING (auth.uid() = agent_id);

-- Create trigger for updated_at
CREATE TRIGGER update_agent_notification_preferences_updated_at
  BEFORE UPDATE ON public.agent_notification_preferences
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Add comments for documentation
COMMENT ON TABLE public.agent_notification_preferences IS 'Agent-level notification preferences that override agency defaults. NULL values mean use agency default.';
COMMENT ON COLUMN public.agent_notification_preferences.email_enabled IS 'NULL = use agency default, true/false = agent override';
COMMENT ON COLUMN public.agent_notification_preferences.email_frequency IS 'NULL = use agency default, otherwise agent override';