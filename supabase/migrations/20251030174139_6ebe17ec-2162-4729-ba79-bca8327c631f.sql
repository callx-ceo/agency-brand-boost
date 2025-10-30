-- Create notification templates table
CREATE TABLE IF NOT EXISTS public.notification_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  notification_type TEXT NOT NULL CHECK (notification_type IN ('email', 'sms')),
  trigger_event TEXT NOT NULL,
  subject TEXT,
  body_html TEXT NOT NULL,
  body_sms TEXT,
  customizable BOOLEAN DEFAULT true,
  active BOOLEAN DEFAULT true,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create agency branding table
CREATE TABLE IF NOT EXISTS public.agency_branding (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agency_id UUID NOT NULL,
  logo_url TEXT,
  primary_color TEXT DEFAULT '#3B82F6',
  secondary_color TEXT DEFAULT '#10B981',
  footer_text TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create agency notification settings table
CREATE TABLE IF NOT EXISTS public.agency_notification_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agency_id UUID NOT NULL,
  template_id UUID REFERENCES public.notification_templates(id) ON DELETE CASCADE,
  enabled BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(agency_id, template_id)
);

-- Enable RLS
ALTER TABLE public.notification_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agency_branding ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agency_notification_settings ENABLE ROW LEVEL SECURITY;

-- RLS Policies for notification_templates (SuperAdmin only for write, everyone can read active ones)
CREATE POLICY "Anyone can view active templates"
  ON public.notification_templates
  FOR SELECT
  USING (active = true);

CREATE POLICY "SuperAdmins can manage templates"
  ON public.notification_templates
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- RLS Policies for agency_branding (agencies can only manage their own)
CREATE POLICY "Agencies can view own branding"
  ON public.agency_branding
  FOR SELECT
  USING (true);

CREATE POLICY "Agencies can manage own branding"
  ON public.agency_branding
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- RLS Policies for agency_notification_settings
CREATE POLICY "Agencies can view own notification settings"
  ON public.agency_notification_settings
  FOR SELECT
  USING (true);

CREATE POLICY "Agencies can manage own notification settings"
  ON public.agency_notification_settings
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Create updated_at trigger function if it doesn't exist
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers for updated_at
CREATE TRIGGER update_notification_templates_updated_at
  BEFORE UPDATE ON public.notification_templates
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_agency_branding_updated_at
  BEFORE UPDATE ON public.agency_branding
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_agency_notification_settings_updated_at
  BEFORE UPDATE ON public.agency_notification_settings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default notification templates
INSERT INTO public.notification_templates (name, notification_type, trigger_event, subject, body_html, body_sms, customizable, active) VALUES
('Performance Report - After Call', 'email', 'call_completed', 'Great Call, {{agent_name}}! Here''s Your Performance Summary', 
'<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h2 style="color: {{primary_color}};">Performance Summary</h2>
  <p>Hi {{agent_name}},</p>
  <p>You just completed a call! Here''s how you did:</p>
  <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
    <p><strong>Score:</strong> {{score}}/100</p>
    <p><strong>Duration:</strong> {{duration}} minutes</p>
    <p><strong>Outcome:</strong> {{outcome}}</p>
  </div>
  <p><strong>Recommended Action:</strong> {{recommended_action}}</p>
  <p>Keep up the great work!</p>
  {{footer}}
</div>', 
'Call complete! Score: {{score}}/100. {{recommended_action}}', 
true, true),

('Low Balance Alert', 'email', 'low_balance', 'Action Required: Low Account Balance', 
'<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h2 style="color: {{primary_color}};">Low Balance Alert</h2>
  <p>Hi {{agent_name}},</p>
  <p>Your account balance is running low.</p>
  <div style="background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0;">
    <p><strong>Current Balance:</strong> ${{balance}}</p>
    <p><strong>Threshold:</strong> ${{threshold}}</p>
  </div>
  <p>Please add funds to continue using our services without interruption.</p>
  <a href="{{billing_url}}" style="display: inline-block; background: {{primary_color}}; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; margin: 10px 0;">Add Funds Now</a>
  {{footer}}
</div>', 
'Low balance alert! Current: ${{balance}}. Add funds to continue service.', 
true, true),

('Payment Success', 'email', 'payment_success', 'Payment Received - Thank You!', 
'<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h2 style="color: {{primary_color}};">Payment Successful</h2>
  <p>Hi {{agent_name}},</p>
  <p>We''ve successfully received your payment.</p>
  <div style="background: #d4edda; border-left: 4px solid #28a745; padding: 15px; margin: 20px 0;">
    <p><strong>Amount:</strong> ${{amount}}</p>
    <p><strong>Transaction ID:</strong> {{transaction_id}}</p>
    <p><strong>Date:</strong> {{date}}</p>
  </div>
  <p>Your new balance: ${{new_balance}}</p>
  {{footer}}
</div>', 
'Payment received: ${{amount}}. New balance: ${{new_balance}}', 
false, true),

('Daily Performance Summary', 'email', 'daily_summary', 'Your Daily Performance Report - {{date}}', 
'<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h2 style="color: {{primary_color}};">Daily Performance Report</h2>
  <p>Hi {{agent_name}},</p>
  <p>Here''s your performance summary for {{date}}:</p>
  <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
    <p><strong>Total Calls:</strong> {{total_calls}}</p>
    <p><strong>Average Score:</strong> {{avg_score}}/100</p>
    <p><strong>Total Duration:</strong> {{total_duration}} minutes</p>
    <p><strong>Success Rate:</strong> {{success_rate}}%</p>
  </div>
  <p>{{motivational_message}}</p>
  {{footer}}
</div>', 
'Daily summary: {{total_calls}} calls, avg score {{avg_score}}/100', 
true, true),

('Weekly Performance Summary', 'email', 'weekly_summary', 'Your Weekly Performance Report', 
'<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h2 style="color: {{primary_color}};">Weekly Performance Report</h2>
  <p>Hi {{agent_name}},</p>
  <p>Here''s your performance summary for the past week:</p>
  <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
    <p><strong>Total Calls:</strong> {{total_calls}}</p>
    <p><strong>Average Score:</strong> {{avg_score}}/100</p>
    <p><strong>Best Day:</strong> {{best_day}}</p>
    <p><strong>Improvement:</strong> {{improvement}}%</p>
  </div>
  <p>{{weekly_insights}}</p>
  {{footer}}
</div>', 
'Weekly summary: {{total_calls}} calls, avg score {{avg_score}}/100', 
true, true);