import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Bell, Save, BarChart3, AlertTriangle, TrendingUp, DollarSign } from "lucide-react";
import { toast } from "sonner";

interface NotificationSettingsProps {
  onBackToDashboard: () => void;
}

const NotificationSettings = ({ onBackToDashboard }: NotificationSettingsProps) => {
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: false,
    systemAlerts: true,
    performanceEmailsEnabled: true,
    emailFrequency: "daily_digest" as "per_event" | "daily_digest" | "weekly_digest",
    complianceAlertsEnabled: true,
    revenueAlertsEnabled: true,
    systemHealthAlertsEnabled: true
  });

  const handleSaveNotifications = () => {
    toast.success("Notification preferences updated successfully");
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Notification Settings</h1>
          <p className="text-muted-foreground mt-1">Configure platform-wide notification preferences</p>
        </div>
        <Button variant="outline" onClick={onBackToDashboard}>
          Back to Dashboard
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Notification Preferences
          </CardTitle>
          <CardDescription>
            Configure how you receive updates about platform activities and alerts
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Email Notifications */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Email Notifications</div>
                <div className="text-sm text-muted-foreground">Receive platform updates via email</div>
              </div>
              <Switch
                checked={notifications.emailNotifications}
                onCheckedChange={(checked) => setNotifications({...notifications, emailNotifications: checked})}
              />
            </div>

            {/* Nested Email Notification Types */}
            {notifications.emailNotifications && (
              <div className="ml-6 pl-4 border-l-2 border-border space-y-6">
                {/* Performance Reports */}
                <div className="flex items-start gap-2">
                  <BarChart3 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Platform Performance Reports</div>
                        <div className="text-sm text-muted-foreground">
                          Executive summaries of platform metrics, KPIs, and trends
                        </div>
                      </div>
                      <Switch
                        checked={notifications.performanceEmailsEnabled}
                        onCheckedChange={(checked) => setNotifications({...notifications, performanceEmailsEnabled: checked})}
                      />
                    </div>

                    {notifications.performanceEmailsEnabled && (
                      <div className="ml-2 space-y-3">
                        <Label className="text-sm font-medium">Report Frequency</Label>
                        <RadioGroup
                          value={notifications.emailFrequency}
                          onValueChange={(value) => setNotifications({...notifications, emailFrequency: value as "per_event" | "daily_digest" | "weekly_digest"})}
                          className="space-y-3"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="per_event" id="per_event" />
                            <Label htmlFor="per_event" className="font-normal cursor-pointer">
                              Real-time - Immediate notifications for critical events
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="daily_digest" id="daily_digest" />
                            <Label htmlFor="daily_digest" className="font-normal cursor-pointer">
                              Daily digest - One comprehensive summary per day
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="weekly_digest" id="weekly_digest" />
                            <Label htmlFor="weekly_digest" className="font-normal cursor-pointer">
                              Weekly digest - Executive summary at week's end
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>
                    )}
                  </div>
                </div>

                {/* Compliance Alerts */}
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Compliance & Fraud Alerts</div>
                        <div className="text-sm text-muted-foreground">
                          Critical alerts about compliance issues and fraud detection
                        </div>
                      </div>
                      <Switch
                        checked={notifications.complianceAlertsEnabled}
                        onCheckedChange={(checked) => setNotifications({...notifications, complianceAlertsEnabled: checked})}
                      />
                    </div>
                  </div>
                </div>

                {/* Revenue Alerts */}
                <div className="flex items-start gap-2">
                  <DollarSign className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Revenue & Billing Alerts</div>
                        <div className="text-sm text-muted-foreground">
                          Notifications about revenue milestones and billing events
                        </div>
                      </div>
                      <Switch
                        checked={notifications.revenueAlertsEnabled}
                        onCheckedChange={(checked) => setNotifications({...notifications, revenueAlertsEnabled: checked})}
                      />
                    </div>
                  </div>
                </div>

                {/* System Health Alerts */}
                <div className="flex items-start gap-2">
                  <TrendingUp className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">System Health & Capacity Alerts</div>
                        <div className="text-sm text-muted-foreground">
                          Alerts about system performance, downtime, and capacity issues
                        </div>
                      </div>
                      <Switch
                        checked={notifications.systemHealthAlertsEnabled}
                        onCheckedChange={(checked) => setNotifications({...notifications, systemHealthAlertsEnabled: checked})}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* SMS Notifications */}
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">SMS Notifications</div>
              <div className="text-sm text-muted-foreground">Receive critical alerts via text message</div>
            </div>
            <Switch
              checked={notifications.smsNotifications}
              onCheckedChange={(checked) => setNotifications({...notifications, smsNotifications: checked})}
            />
          </div>

          {/* System Alerts */}
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">In-App System Alerts</div>
              <div className="text-sm text-muted-foreground">Show system alerts in the dashboard</div>
            </div>
            <Switch
              checked={notifications.systemAlerts}
              onCheckedChange={(checked) => setNotifications({...notifications, systemAlerts: checked})}
            />
          </div>

          <Button onClick={handleSaveNotifications} className="flex items-center gap-2">
            <Save className="w-4 h-4" />
            Save Notification Settings
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationSettings;
