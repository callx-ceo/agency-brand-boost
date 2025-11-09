-- Create platform_settings table for system-wide configuration
CREATE TABLE IF NOT EXISTS public.platform_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  setting_key TEXT NOT NULL UNIQUE,
  setting_value JSONB NOT NULL,
  setting_category TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.platform_settings ENABLE ROW LEVEL SECURITY;

-- Only superadmins can view platform settings
CREATE POLICY "Superadmins can view all platform settings"
  ON public.platform_settings
  FOR SELECT
  USING (has_role(auth.uid(), 'superadmin'));

-- Only superadmins can insert platform settings
CREATE POLICY "Superadmins can insert platform settings"
  ON public.platform_settings
  FOR INSERT
  WITH CHECK (has_role(auth.uid(), 'superadmin'));

-- Only superadmins can update platform settings
CREATE POLICY "Superadmins can update platform settings"
  ON public.platform_settings
  FOR UPDATE
  USING (has_role(auth.uid(), 'superadmin'));

-- Only superadmins can delete platform settings
CREATE POLICY "Superadmins can delete platform settings"
  ON public.platform_settings
  FOR DELETE
  USING (has_role(auth.uid(), 'superadmin'));

-- Create trigger for updated_at
CREATE TRIGGER update_platform_settings_updated_at
  BEFORE UPDATE ON public.platform_settings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default settings
INSERT INTO public.platform_settings (setting_key, setting_value, setting_category, description) VALUES
  ('general', '{"platformName": "CallX Platform", "platformUrl": "https://callx.platform.com", "supportEmail": "support@callx.com", "companyName": "CallX Inc.", "timezone": "America/New_York", "dateFormat": "MM/DD/YYYY", "currency": "USD"}'::jsonb, 'general', 'General platform configuration'),
  ('email', '{"smtpHost": "smtp.sendgrid.net", "smtpPort": "587", "smtpUser": "apikey", "fromEmail": "noreply@callx.com", "fromName": "CallX Platform", "enableSSL": true}'::jsonb, 'email', 'Email/SMTP configuration'),
  ('sms', '{"provider": "twilio", "twilioPhoneNumber": "", "enableSMS": false}'::jsonb, 'sms', 'SMS provider configuration'),
  ('payment', '{"enableStripe": false, "enableInvoicing": true, "paymentTermsDays": "30"}'::jsonb, 'payment', 'Payment gateway settings'),
  ('security', '{"sessionTimeout": "60", "maxLoginAttempts": "5", "passwordMinLength": "8", "requireUppercase": true, "requireNumbers": true, "requireSpecialChars": true, "enable2FA": false, "enableIPWhitelist": false}'::jsonb, 'security', 'Security and authentication settings'),
  ('api', '{"apiRateLimit": "1000", "apiRateLimitWindow": "60", "enableApiLogging": true, "enableWebhooks": true, "webhookRetryAttempts": "3"}'::jsonb, 'api', 'API configuration'),
  ('features', '{"enableReferrals": true, "enableAgentPayments": true, "enableAIRecommendations": true, "enableAdvancedAnalytics": true, "enableAutoScaling": false, "enableBetaFeatures": false}'::jsonb, 'features', 'Feature flags'),
  ('maintenance', '{"maintenanceMode": false, "maintenanceMessage": "System maintenance in progress. We will be back soon!", "allowAdminAccess": true}'::jsonb, 'maintenance', 'Maintenance mode settings'),
  ('notifications', '{"enableEmailNotifications": true, "enableSMSNotifications": false, "enableInAppNotifications": true, "enablePushNotifications": false, "notificationBatchSize": "50", "notificationRetryAttempts": "3"}'::jsonb, 'notifications', 'Notification delivery settings')
ON CONFLICT (setting_key) DO NOTHING;