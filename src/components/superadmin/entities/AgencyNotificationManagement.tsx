import { useState, useEffect } from "react";
import { ArrowLeft, Bell, Mail, MessageSquare, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface AgencyNotificationManagementProps {
  onBackToDashboard: () => void;
}

const AgencyNotificationManagement = ({ onBackToDashboard }: AgencyNotificationManagementProps) => {
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState({
    email: false,
    sms: false,
    inApp: true,
    performanceEmailsEnabled: false,
    emailFrequency: 'per-call'
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('agency_notification_preferences')
        .select('*')
        .eq('agency_id', user.id)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') throw error;

      if (data) {
        setNotifications({
          email: data.email_enabled,
          sms: data.sms_enabled,
          inApp: data.in_app_enabled,
          performanceEmailsEnabled: data.performance_emails_enabled,
          emailFrequency: data.email_frequency
        });
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
      toast.error('Failed to load notification settings');
    } finally {
      setLoading(false);
    }
  };

  const handleNotificationChange = async (key: string, value: boolean | string) => {
    const newNotifications = { ...notifications, [key]: value };
    setNotifications(newNotifications);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from('agency_notification_preferences')
        .upsert({
          agency_id: user.id,
          email_enabled: newNotifications.email,
          sms_enabled: newNotifications.sms,
          in_app_enabled: newNotifications.inApp,
          performance_emails_enabled: newNotifications.performanceEmailsEnabled,
          email_frequency: newNotifications.emailFrequency
        });

      if (error) throw error;
      toast.success('Agency default updated - will apply to all agents');
    } catch (error) {
      console.error('Error updating settings:', error);
      toast.error('Failed to update settings');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onBackToDashboard}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Agency Notification Management</h1>
          <p className="text-muted-foreground">Configure notification preferences for your agency and agents</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notification Preferences
          </CardTitle>
          <CardDescription>
            Set default notification preferences for all agents in your agency. Agents can override these in their personal settings.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {loading ? (
            <div className="text-center py-8">Loading settings...</div>
          ) : (
            <>
          {/* Email Notifications */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email-notifications" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email Notifications
                </Label>
                <p className="text-sm text-muted-foreground">
                  Receive notifications via email
                </p>
              </div>
              <Switch
                id="email-notifications"
                checked={notifications.email}
                onCheckedChange={(checked) => handleNotificationChange('email', checked)}
              />
            </div>

            {/* Performance Email Reports - Only shown when email notifications are enabled */}
            {notifications.email && (
              <div className="ml-6 space-y-4 border-l-2 border-muted pl-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="performance-emails" className="flex items-center gap-2">
                      <BarChart3 className="h-4 w-4" />
                      Performance Email Reports
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Receive detailed performance reports via email
                    </p>
                  </div>
                  <Switch
                    id="performance-emails"
                    checked={notifications.performanceEmailsEnabled}
                    onCheckedChange={(checked) => handleNotificationChange('performanceEmailsEnabled', checked)}
                  />
                </div>

                {/* Email Frequency - Only shown when performance emails are enabled */}
                {notifications.performanceEmailsEnabled && (
                  <div className="space-y-3">
                    <Label className="text-sm font-medium">Report Frequency</Label>
                    <RadioGroup
                      value={notifications.emailFrequency}
                      onValueChange={(value) => handleNotificationChange('emailFrequency', value)}
                      className="space-y-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="per-call" id="per-call" />
                        <Label htmlFor="per-call" className="font-normal cursor-pointer">
                          After Each Call
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="daily" id="daily" />
                        <Label htmlFor="daily" className="font-normal cursor-pointer">
                          Daily Summary
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="weekly" id="weekly" />
                        <Label htmlFor="weekly" className="font-normal cursor-pointer">
                          Weekly Summary
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                )}
              </div>
            )}
          </div>

          <Separator />

          {/* SMS Notifications */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="sms-notifications" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                SMS Notifications
              </Label>
              <p className="text-sm text-muted-foreground">
                Receive urgent alerts via SMS
              </p>
            </div>
            <Switch
              id="sms-notifications"
              checked={notifications.sms}
              onCheckedChange={(checked) => handleNotificationChange('sms', checked)}
            />
          </div>

          <Separator />

          {/* In-App Notifications */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="inapp-notifications" className="flex items-center gap-2">
                <Bell className="h-4 w-4" />
                In-App Notifications
              </Label>
              <p className="text-sm text-muted-foreground">
                Show notifications within the platform
              </p>
            </div>
            <Switch
              id="inapp-notifications"
              checked={notifications.inApp}
              onCheckedChange={(checked) => handleNotificationChange('inApp', checked)}
            />
          </div>
          </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AgencyNotificationManagement;
