import { useState, useEffect } from "react";
import { ArrowLeft, Bell, Mail, MessageSquare, BarChart3, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface AgentNotificationManagementProps {
  onBackToDashboard: () => void;
}

const AgentNotificationManagement = ({ onBackToDashboard }: AgentNotificationManagementProps) => {
  const [loading, setLoading] = useState(true);
  const [agencyDefaults, setAgencyDefaults] = useState({
    email: false,
    sms: false,
    inApp: true,
    performanceEmailsEnabled: false,
    emailFrequency: 'per-call'
  });
  const [agentOverrides, setAgentOverrides] = useState<{
    email: boolean | null;
    sms: boolean | null;
    inApp: boolean | null;
    performanceEmailsEnabled: boolean | null;
    emailFrequency: string | null;
  }>({
    email: null,
    sms: null,
    inApp: null,
    performanceEmailsEnabled: null,
    emailFrequency: null
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Fetch agency defaults (mock for now - would need agency_id relation)
      setAgencyDefaults({
        email: false,
        sms: false,
        inApp: true,
        performanceEmailsEnabled: false,
        emailFrequency: 'per-call'
      });

      // Fetch agent overrides
      const { data, error } = await supabase
        .from('agent_notification_preferences')
        .select('*')
        .eq('agent_id', user.id)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') throw error;

      if (data) {
        setAgentOverrides({
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

  const getCurrentValue = (key: keyof typeof agencyDefaults): boolean | string => {
    const override = agentOverrides[key];
    return override !== null ? override : agencyDefaults[key];
  };

  const isOverridden = (key: keyof typeof agentOverrides): boolean => {
    return agentOverrides[key] !== null;
  };

  const handleNotificationChange = async (key: keyof typeof agentOverrides, value: boolean | string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Map the key to the correct column name
      const columnMap: Record<string, string> = {
        'email': 'email_enabled',
        'sms': 'sms_enabled',
        'inApp': 'in_app_enabled',
        'performanceEmailsEnabled': 'performance_emails_enabled',
        'emailFrequency': 'email_frequency'
      };

      const columnName = columnMap[key];
      
      const { error } = await supabase
        .from('agent_notification_preferences')
        .upsert({
          agent_id: user.id,
          [columnName]: value
        });

      if (error) throw error;

      setAgentOverrides(prev => ({ ...prev, [key]: value }));
      toast.success('Notification preference updated');
    } catch (error) {
      console.error('Error updating preference:', error);
      toast.error('Failed to update preference');
    }
  };

  const handleResetToDefault = async (key: keyof typeof agentOverrides) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const columnName = key === 'emailFrequency' ? 'email_frequency' : `${key}_enabled`;
      
      const { error } = await supabase
        .from('agent_notification_preferences')
        .update({ [columnName]: null })
        .eq('agent_id', user.id);

      if (error) throw error;

      setAgentOverrides(prev => ({ ...prev, [key]: null }));
      toast.success('Reset to agency default');
    } catch (error) {
      console.error('Error resetting preference:', error);
      toast.error('Failed to reset preference');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onBackToDashboard}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Agent Notification Management</h1>
          <p className="text-muted-foreground">Configure notification preferences for agents</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notification Preferences
          </CardTitle>
          <CardDescription>
            Configure your personal notification settings. Settings marked with "Agency Default" use your agency's configuration - you can override them here.
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
              <div className="space-y-0.5 flex-1">
                <Label htmlFor="email-notifications" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email Notifications
                  {isOverridden('email') && <Badge variant="secondary" className="ml-2">Custom</Badge>}
                  {!isOverridden('email') && <Badge variant="outline" className="ml-2">Agency Default</Badge>}
                </Label>
                <p className="text-sm text-muted-foreground">
                  Receive notifications via email
                </p>
              </div>
              <div className="flex items-center gap-2">
                {isOverridden('email') && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleResetToDefault('email')}
                  >
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                )}
                <Switch
                  id="email-notifications"
                  checked={getCurrentValue('email') as boolean}
                  onCheckedChange={(checked) => handleNotificationChange('email', checked)}
                />
              </div>
            </div>

            {/* Performance Email Reports - Only shown when email notifications are enabled */}
            {getCurrentValue('email') && (
              <div className="ml-6 space-y-4 border-l-2 border-muted pl-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5 flex-1">
                    <Label htmlFor="performance-emails" className="flex items-center gap-2">
                      <BarChart3 className="h-4 w-4" />
                      Performance Email Reports
                      {isOverridden('performanceEmailsEnabled') && <Badge variant="secondary" className="ml-2">Custom</Badge>}
                      {!isOverridden('performanceEmailsEnabled') && <Badge variant="outline" className="ml-2">Agency Default</Badge>}
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Receive detailed performance reports via email
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {isOverridden('performanceEmailsEnabled') && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleResetToDefault('performanceEmailsEnabled')}
                      >
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                    )}
                    <Switch
                      id="performance-emails"
                      checked={getCurrentValue('performanceEmailsEnabled') as boolean}
                      onCheckedChange={(checked) => handleNotificationChange('performanceEmailsEnabled', checked)}
                    />
                  </div>
                </div>

                {/* Email Frequency - Only shown when performance emails are enabled */}
                {getCurrentValue('performanceEmailsEnabled') && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-medium flex items-center gap-2">
                        Report Frequency
                        {isOverridden('emailFrequency') && <Badge variant="secondary">Custom</Badge>}
                        {!isOverridden('emailFrequency') && <Badge variant="outline">Agency Default</Badge>}
                      </Label>
                      {isOverridden('emailFrequency') && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleResetToDefault('emailFrequency')}
                        >
                          <RefreshCw className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    <RadioGroup
                      value={getCurrentValue('emailFrequency') as string}
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
            <div className="space-y-0.5 flex-1">
              <Label htmlFor="sms-notifications" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                SMS Notifications
                {isOverridden('sms') && <Badge variant="secondary" className="ml-2">Custom</Badge>}
                {!isOverridden('sms') && <Badge variant="outline" className="ml-2">Agency Default</Badge>}
              </Label>
              <p className="text-sm text-muted-foreground">
                Receive urgent alerts via SMS
              </p>
            </div>
            <div className="flex items-center gap-2">
              {isOverridden('sms') && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleResetToDefault('sms')}
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
              )}
              <Switch
                id="sms-notifications"
                checked={getCurrentValue('sms') as boolean}
                onCheckedChange={(checked) => handleNotificationChange('sms', checked)}
              />
            </div>
          </div>

          <Separator />

          {/* In-App Notifications */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5 flex-1">
              <Label htmlFor="inapp-notifications" className="flex items-center gap-2">
                <Bell className="h-4 w-4" />
                In-App Notifications
                {isOverridden('inApp') && <Badge variant="secondary" className="ml-2">Custom</Badge>}
                {!isOverridden('inApp') && <Badge variant="outline" className="ml-2">Agency Default</Badge>}
              </Label>
              <p className="text-sm text-muted-foreground">
                Show notifications within the platform
              </p>
            </div>
            <div className="flex items-center gap-2">
              {isOverridden('inApp') && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleResetToDefault('inApp')}
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
              )}
              <Switch
                id="inapp-notifications"
                checked={getCurrentValue('inApp') as boolean}
                onCheckedChange={(checked) => handleNotificationChange('inApp', checked)}
              />
            </div>
          </div>
          </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AgentNotificationManagement;
