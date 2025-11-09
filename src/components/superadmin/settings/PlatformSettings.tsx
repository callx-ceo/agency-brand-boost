import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import {
  Settings,
  Mail,
  MessageSquare,
  CreditCard,
  Shield,
  Code,
  Zap,
  Wrench,
  Globe,
  Bell,
  Database,
  Server,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PlatformSettingsProps {
  onBackToDashboard: () => void;
}

const PlatformSettings = ({ onBackToDashboard }: PlatformSettingsProps) => {
  const [generalSettings, setGeneralSettings] = useState({
    platformName: "CallX Platform",
    platformUrl: "https://callx.platform.com",
    supportEmail: "support@callx.com",
    companyName: "CallX Inc.",
    timezone: "America/New_York",
    dateFormat: "MM/DD/YYYY",
    currency: "USD",
  });

  const [emailSettings, setEmailSettings] = useState({
    smtpHost: "smtp.sendgrid.net",
    smtpPort: "587",
    smtpUser: "apikey",
    smtpPassword: "••••••••••••",
    fromEmail: "noreply@callx.com",
    fromName: "CallX Platform",
    enableSSL: true,
  });

  const [smsSettings, setSmsSettings] = useState({
    provider: "twilio",
    twilioAccountSid: "AC••••••••••••••",
    twilioAuthToken: "••••••••••••",
    twilioPhoneNumber: "+1234567890",
    enableSMS: true,
  });

  const [paymentSettings, setPaymentSettings] = useState({
    stripePublishableKey: "pk_live_••••••••••••",
    stripeSecretKey: "sk_live_••••••••••••",
    enableStripe: true,
    enableInvoicing: true,
    paymentTermsDays: "30",
  });

  const [securitySettings, setSecuritySettings] = useState({
    sessionTimeout: "60",
    maxLoginAttempts: "5",
    passwordMinLength: "8",
    requireUppercase: true,
    requireNumbers: true,
    requireSpecialChars: true,
    enable2FA: false,
    enableIPWhitelist: false,
  });

  const [apiSettings, setApiSettings] = useState({
    apiRateLimit: "1000",
    apiRateLimitWindow: "60",
    enableApiLogging: true,
    enableWebhooks: true,
    webhookRetryAttempts: "3",
  });

  const [featureFlags, setFeatureFlags] = useState({
    enableReferrals: true,
    enableAgentPayments: true,
    enableAIRecommendations: true,
    enableAdvancedAnalytics: true,
    enableAutoScaling: false,
    enableBetaFeatures: false,
  });

  const [maintenanceSettings, setMaintenanceSettings] = useState({
    maintenanceMode: false,
    maintenanceMessage: "System maintenance in progress. We'll be back soon!",
    allowAdminAccess: true,
  });

  const [notificationSettings, setNotificationSettings] = useState({
    enableEmailNotifications: true,
    enableSMSNotifications: true,
    enableInAppNotifications: true,
    enablePushNotifications: false,
    notificationBatchSize: "50",
    notificationRetryAttempts: "3",
  });

  const handleSaveGeneral = () => {
    toast.success("General settings saved successfully");
  };

  const handleSaveEmail = () => {
    toast.success("Email configuration saved successfully");
  };

  const handleSaveSMS = () => {
    toast.success("SMS configuration saved successfully");
  };

  const handleSavePayment = () => {
    toast.success("Payment settings saved successfully");
  };

  const handleSaveSecurity = () => {
    toast.success("Security settings saved successfully");
  };

  const handleSaveAPI = () => {
    toast.success("API settings saved successfully");
  };

  const handleSaveFeatures = () => {
    toast.success("Feature flags updated successfully");
  };

  const handleSaveMaintenance = () => {
    toast.success("Maintenance settings saved successfully");
  };

  const handleSaveNotifications = () => {
    toast.success("Notification settings saved successfully");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Platform Settings</h1>
          <p className="text-muted-foreground">
            Configure system-wide settings and integrations
          </p>
        </div>
        <Button variant="outline" onClick={onBackToDashboard}>
          Back to Dashboard
        </Button>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-5 lg:grid-cols-9">
          <TabsTrigger value="general">
            <Settings className="w-4 h-4 mr-2" />
            General
          </TabsTrigger>
          <TabsTrigger value="email">
            <Mail className="w-4 h-4 mr-2" />
            Email
          </TabsTrigger>
          <TabsTrigger value="sms">
            <MessageSquare className="w-4 h-4 mr-2" />
            SMS
          </TabsTrigger>
          <TabsTrigger value="payment">
            <CreditCard className="w-4 h-4 mr-2" />
            Payment
          </TabsTrigger>
          <TabsTrigger value="security">
            <Shield className="w-4 h-4 mr-2" />
            Security
          </TabsTrigger>
          <TabsTrigger value="api">
            <Code className="w-4 h-4 mr-2" />
            API
          </TabsTrigger>
          <TabsTrigger value="features">
            <Zap className="w-4 h-4 mr-2" />
            Features
          </TabsTrigger>
          <TabsTrigger value="maintenance">
            <Wrench className="w-4 h-4 mr-2" />
            Maintenance
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="w-4 h-4 mr-2" />
            Notifications
          </TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Basic platform configuration and branding
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="platformName">Platform Name</Label>
                  <Input
                    id="platformName"
                    value={generalSettings.platformName}
                    onChange={(e) =>
                      setGeneralSettings({ ...generalSettings, platformName: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="platformUrl">Platform URL</Label>
                  <Input
                    id="platformUrl"
                    value={generalSettings.platformUrl}
                    onChange={(e) =>
                      setGeneralSettings({ ...generalSettings, platformUrl: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="supportEmail">Support Email</Label>
                  <Input
                    id="supportEmail"
                    type="email"
                    value={generalSettings.supportEmail}
                    onChange={(e) =>
                      setGeneralSettings({ ...generalSettings, supportEmail: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input
                    id="companyName"
                    value={generalSettings.companyName}
                    onChange={(e) =>
                      setGeneralSettings({ ...generalSettings, companyName: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select
                    value={generalSettings.timezone}
                    onValueChange={(value) =>
                      setGeneralSettings({ ...generalSettings, timezone: value })
                    }
                  >
                    <SelectTrigger id="timezone">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="America/New_York">Eastern Time</SelectItem>
                      <SelectItem value="America/Chicago">Central Time</SelectItem>
                      <SelectItem value="America/Denver">Mountain Time</SelectItem>
                      <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                      <SelectItem value="UTC">UTC</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateFormat">Date Format</Label>
                  <Select
                    value={generalSettings.dateFormat}
                    onValueChange={(value) =>
                      setGeneralSettings({ ...generalSettings, dateFormat: value })
                    }
                  >
                    <SelectTrigger id="dateFormat">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                      <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                      <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Select
                    value={generalSettings.currency}
                    onValueChange={(value) =>
                      setGeneralSettings({ ...generalSettings, currency: value })
                    }
                  >
                    <SelectTrigger id="currency">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD - US Dollar</SelectItem>
                      <SelectItem value="EUR">EUR - Euro</SelectItem>
                      <SelectItem value="GBP">GBP - British Pound</SelectItem>
                      <SelectItem value="CAD">CAD - Canadian Dollar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button onClick={handleSaveGeneral}>Save General Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Email Settings */}
        <TabsContent value="email" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Email Configuration</CardTitle>
              <CardDescription>
                Configure SMTP settings for email delivery
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="smtpHost">SMTP Host</Label>
                  <Input
                    id="smtpHost"
                    value={emailSettings.smtpHost}
                    onChange={(e) =>
                      setEmailSettings({ ...emailSettings, smtpHost: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtpPort">SMTP Port</Label>
                  <Input
                    id="smtpPort"
                    value={emailSettings.smtpPort}
                    onChange={(e) =>
                      setEmailSettings({ ...emailSettings, smtpPort: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="smtpUser">SMTP Username</Label>
                  <Input
                    id="smtpUser"
                    value={emailSettings.smtpUser}
                    onChange={(e) =>
                      setEmailSettings({ ...emailSettings, smtpUser: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtpPassword">SMTP Password</Label>
                  <Input
                    id="smtpPassword"
                    type="password"
                    value={emailSettings.smtpPassword}
                    onChange={(e) =>
                      setEmailSettings({ ...emailSettings, smtpPassword: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fromEmail">From Email</Label>
                  <Input
                    id="fromEmail"
                    type="email"
                    value={emailSettings.fromEmail}
                    onChange={(e) =>
                      setEmailSettings({ ...emailSettings, fromEmail: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fromName">From Name</Label>
                  <Input
                    id="fromName"
                    value={emailSettings.fromName}
                    onChange={(e) =>
                      setEmailSettings({ ...emailSettings, fromName: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <Label htmlFor="enableSSL">Enable SSL/TLS</Label>
                  <p className="text-sm text-muted-foreground">
                    Use secure connection for email delivery
                  </p>
                </div>
                <Switch
                  id="enableSSL"
                  checked={emailSettings.enableSSL}
                  onCheckedChange={(checked) =>
                    setEmailSettings({ ...emailSettings, enableSSL: checked })
                  }
                />
              </div>

              <Button onClick={handleSaveEmail}>Save Email Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* SMS Settings */}
        <TabsContent value="sms" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>SMS Configuration</CardTitle>
              <CardDescription>
                Configure SMS provider settings for text messaging
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="smsProvider">SMS Provider</Label>
                <Select
                  value={smsSettings.provider}
                  onValueChange={(value) =>
                    setSmsSettings({ ...smsSettings, provider: value })
                  }
                >
                  <SelectTrigger id="smsProvider">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="twilio">Twilio</SelectItem>
                    <SelectItem value="aws-sns">AWS SNS</SelectItem>
                    <SelectItem value="vonage">Vonage</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="twilioAccountSid">Twilio Account SID</Label>
                  <Input
                    id="twilioAccountSid"
                    value={smsSettings.twilioAccountSid}
                    onChange={(e) =>
                      setSmsSettings({ ...smsSettings, twilioAccountSid: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="twilioAuthToken">Twilio Auth Token</Label>
                  <Input
                    id="twilioAuthToken"
                    type="password"
                    value={smsSettings.twilioAuthToken}
                    onChange={(e) =>
                      setSmsSettings({ ...smsSettings, twilioAuthToken: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="twilioPhoneNumber">Twilio Phone Number</Label>
                <Input
                  id="twilioPhoneNumber"
                  value={smsSettings.twilioPhoneNumber}
                  onChange={(e) =>
                    setSmsSettings({ ...smsSettings, twilioPhoneNumber: e.target.value })
                  }
                />
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <Label htmlFor="enableSMS">Enable SMS Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow platform to send SMS notifications
                  </p>
                </div>
                <Switch
                  id="enableSMS"
                  checked={smsSettings.enableSMS}
                  onCheckedChange={(checked) =>
                    setSmsSettings({ ...smsSettings, enableSMS: checked })
                  }
                />
              </div>

              <Button onClick={handleSaveSMS}>Save SMS Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payment Settings */}
        <TabsContent value="payment" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Payment Gateway Settings</CardTitle>
              <CardDescription>
                Configure payment processing and billing options
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="stripePublishableKey">Stripe Publishable Key</Label>
                  <Input
                    id="stripePublishableKey"
                    value={paymentSettings.stripePublishableKey}
                    onChange={(e) =>
                      setPaymentSettings({
                        ...paymentSettings,
                        stripePublishableKey: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stripeSecretKey">Stripe Secret Key</Label>
                  <Input
                    id="stripeSecretKey"
                    type="password"
                    value={paymentSettings.stripeSecretKey}
                    onChange={(e) =>
                      setPaymentSettings({ ...paymentSettings, stripeSecretKey: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="paymentTermsDays">Payment Terms (Days)</Label>
                <Input
                  id="paymentTermsDays"
                  type="number"
                  value={paymentSettings.paymentTermsDays}
                  onChange={(e) =>
                    setPaymentSettings({ ...paymentSettings, paymentTermsDays: e.target.value })
                  }
                />
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <Label htmlFor="enableStripe">Enable Stripe Payments</Label>
                  <p className="text-sm text-muted-foreground">
                    Accept credit card payments via Stripe
                  </p>
                </div>
                <Switch
                  id="enableStripe"
                  checked={paymentSettings.enableStripe}
                  onCheckedChange={(checked) =>
                    setPaymentSettings({ ...paymentSettings, enableStripe: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <Label htmlFor="enableInvoicing">Enable Invoice Payments</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow agencies to pay via invoice
                  </p>
                </div>
                <Switch
                  id="enableInvoicing"
                  checked={paymentSettings.enableInvoicing}
                  onCheckedChange={(checked) =>
                    setPaymentSettings({ ...paymentSettings, enableInvoicing: checked })
                  }
                />
              </div>

              <Button onClick={handleSavePayment}>Save Payment Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Configuration</CardTitle>
              <CardDescription>
                Configure security policies and authentication settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                  <Input
                    id="sessionTimeout"
                    type="number"
                    value={securitySettings.sessionTimeout}
                    onChange={(e) =>
                      setSecuritySettings({ ...securitySettings, sessionTimeout: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxLoginAttempts">Max Login Attempts</Label>
                  <Input
                    id="maxLoginAttempts"
                    type="number"
                    value={securitySettings.maxLoginAttempts}
                    onChange={(e) =>
                      setSecuritySettings({
                        ...securitySettings,
                        maxLoginAttempts: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="passwordMinLength">Min Password Length</Label>
                  <Input
                    id="passwordMinLength"
                    type="number"
                    value={securitySettings.passwordMinLength}
                    onChange={(e) =>
                      setSecuritySettings({
                        ...securitySettings,
                        passwordMinLength: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <Label htmlFor="requireUppercase">Require Uppercase Letters</Label>
                    <p className="text-sm text-muted-foreground">
                      Passwords must contain uppercase letters
                    </p>
                  </div>
                  <Switch
                    id="requireUppercase"
                    checked={securitySettings.requireUppercase}
                    onCheckedChange={(checked) =>
                      setSecuritySettings({ ...securitySettings, requireUppercase: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <Label htmlFor="requireNumbers">Require Numbers</Label>
                    <p className="text-sm text-muted-foreground">
                      Passwords must contain numbers
                    </p>
                  </div>
                  <Switch
                    id="requireNumbers"
                    checked={securitySettings.requireNumbers}
                    onCheckedChange={(checked) =>
                      setSecuritySettings({ ...securitySettings, requireNumbers: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <Label htmlFor="requireSpecialChars">Require Special Characters</Label>
                    <p className="text-sm text-muted-foreground">
                      Passwords must contain special characters
                    </p>
                  </div>
                  <Switch
                    id="requireSpecialChars"
                    checked={securitySettings.requireSpecialChars}
                    onCheckedChange={(checked) =>
                      setSecuritySettings({ ...securitySettings, requireSpecialChars: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <Label htmlFor="enable2FA">Enable Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">
                      Require 2FA for all admin users
                    </p>
                  </div>
                  <Switch
                    id="enable2FA"
                    checked={securitySettings.enable2FA}
                    onCheckedChange={(checked) =>
                      setSecuritySettings({ ...securitySettings, enable2FA: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <Label htmlFor="enableIPWhitelist">Enable IP Whitelist</Label>
                    <p className="text-sm text-muted-foreground">
                      Restrict admin access to specific IP addresses
                    </p>
                  </div>
                  <Switch
                    id="enableIPWhitelist"
                    checked={securitySettings.enableIPWhitelist}
                    onCheckedChange={(checked) =>
                      setSecuritySettings({ ...securitySettings, enableIPWhitelist: checked })
                    }
                  />
                </div>
              </div>

              <Button onClick={handleSaveSecurity}>Save Security Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* API Settings */}
        <TabsContent value="api" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>API Configuration</CardTitle>
              <CardDescription>
                Configure API rate limits and webhook settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="apiRateLimit">API Rate Limit (requests)</Label>
                  <Input
                    id="apiRateLimit"
                    type="number"
                    value={apiSettings.apiRateLimit}
                    onChange={(e) =>
                      setApiSettings({ ...apiSettings, apiRateLimit: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="apiRateLimitWindow">Rate Limit Window (seconds)</Label>
                  <Input
                    id="apiRateLimitWindow"
                    type="number"
                    value={apiSettings.apiRateLimitWindow}
                    onChange={(e) =>
                      setApiSettings({ ...apiSettings, apiRateLimitWindow: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="webhookRetryAttempts">Webhook Retry Attempts</Label>
                <Input
                  id="webhookRetryAttempts"
                  type="number"
                  value={apiSettings.webhookRetryAttempts}
                  onChange={(e) =>
                    setApiSettings({ ...apiSettings, webhookRetryAttempts: e.target.value })
                  }
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <Label htmlFor="enableApiLogging">Enable API Logging</Label>
                    <p className="text-sm text-muted-foreground">
                      Log all API requests and responses
                    </p>
                  </div>
                  <Switch
                    id="enableApiLogging"
                    checked={apiSettings.enableApiLogging}
                    onCheckedChange={(checked) =>
                      setApiSettings({ ...apiSettings, enableApiLogging: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <Label htmlFor="enableWebhooks">Enable Webhooks</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow outgoing webhook notifications
                    </p>
                  </div>
                  <Switch
                    id="enableWebhooks"
                    checked={apiSettings.enableWebhooks}
                    onCheckedChange={(checked) =>
                      setApiSettings({ ...apiSettings, enableWebhooks: checked })
                    }
                  />
                </div>
              </div>

              <Button onClick={handleSaveAPI}>Save API Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Feature Flags */}
        <TabsContent value="features" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Feature Flags</CardTitle>
              <CardDescription>
                Enable or disable platform features
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <Label htmlFor="enableReferrals">Referral Program</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable the agent referral program
                  </p>
                </div>
                <Switch
                  id="enableReferrals"
                  checked={featureFlags.enableReferrals}
                  onCheckedChange={(checked) =>
                    setFeatureFlags({ ...featureFlags, enableReferrals: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <Label htmlFor="enableAgentPayments">Agent Self-Payments</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow agents to pay for their own credits
                  </p>
                </div>
                <Switch
                  id="enableAgentPayments"
                  checked={featureFlags.enableAgentPayments}
                  onCheckedChange={(checked) =>
                    setFeatureFlags({ ...featureFlags, enableAgentPayments: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <Label htmlFor="enableAIRecommendations">AI Recommendations</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable AI-powered recommendations
                  </p>
                </div>
                <Switch
                  id="enableAIRecommendations"
                  checked={featureFlags.enableAIRecommendations}
                  onCheckedChange={(checked) =>
                    setFeatureFlags({ ...featureFlags, enableAIRecommendations: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <Label htmlFor="enableAdvancedAnalytics">Advanced Analytics</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable advanced analytics dashboards
                  </p>
                </div>
                <Switch
                  id="enableAdvancedAnalytics"
                  checked={featureFlags.enableAdvancedAnalytics}
                  onCheckedChange={(checked) =>
                    setFeatureFlags({ ...featureFlags, enableAdvancedAnalytics: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <Label htmlFor="enableAutoScaling">Auto-Scaling</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable automatic infrastructure scaling
                  </p>
                </div>
                <Switch
                  id="enableAutoScaling"
                  checked={featureFlags.enableAutoScaling}
                  onCheckedChange={(checked) =>
                    setFeatureFlags({ ...featureFlags, enableAutoScaling: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <Label htmlFor="enableBetaFeatures">Beta Features</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable experimental beta features
                  </p>
                </div>
                <Switch
                  id="enableBetaFeatures"
                  checked={featureFlags.enableBetaFeatures}
                  onCheckedChange={(checked) =>
                    setFeatureFlags({ ...featureFlags, enableBetaFeatures: checked })
                  }
                />
              </div>

              <Button onClick={handleSaveFeatures}>Save Feature Flags</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Maintenance */}
        <TabsContent value="maintenance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Maintenance Mode</CardTitle>
              <CardDescription>
                Configure maintenance mode and system downtime
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg bg-yellow-50 border-yellow-200">
                <div>
                  <Label htmlFor="maintenanceMode" className="text-yellow-900">
                    Enable Maintenance Mode
                  </Label>
                  <p className="text-sm text-yellow-700">
                    Platform will be unavailable to regular users
                  </p>
                </div>
                <Switch
                  id="maintenanceMode"
                  checked={maintenanceSettings.maintenanceMode}
                  onCheckedChange={(checked) =>
                    setMaintenanceSettings({ ...maintenanceSettings, maintenanceMode: checked })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="maintenanceMessage">Maintenance Message</Label>
                <Textarea
                  id="maintenanceMessage"
                  rows={3}
                  value={maintenanceSettings.maintenanceMessage}
                  onChange={(e) =>
                    setMaintenanceSettings({
                      ...maintenanceSettings,
                      maintenanceMessage: e.target.value,
                    })
                  }
                />
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <Label htmlFor="allowAdminAccess">Allow Admin Access</Label>
                  <p className="text-sm text-muted-foreground">
                    Admins can access platform during maintenance
                  </p>
                </div>
                <Switch
                  id="allowAdminAccess"
                  checked={maintenanceSettings.allowAdminAccess}
                  onCheckedChange={(checked) =>
                    setMaintenanceSettings({ ...maintenanceSettings, allowAdminAccess: checked })
                  }
                />
              </div>

              <Button onClick={handleSaveMaintenance}>Save Maintenance Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Configuration</CardTitle>
              <CardDescription>
                Configure system-wide notification delivery settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <Label htmlFor="enableEmailNotifications">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Send notifications via email
                    </p>
                  </div>
                  <Switch
                    id="enableEmailNotifications"
                    checked={notificationSettings.enableEmailNotifications}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({
                        ...notificationSettings,
                        enableEmailNotifications: checked,
                      })
                    }
                  />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <Label htmlFor="enableSMSNotifications">SMS Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Send notifications via SMS
                    </p>
                  </div>
                  <Switch
                    id="enableSMSNotifications"
                    checked={notificationSettings.enableSMSNotifications}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({
                        ...notificationSettings,
                        enableSMSNotifications: checked,
                      })
                    }
                  />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <Label htmlFor="enableInAppNotifications">In-App Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Show notifications within the platform
                    </p>
                  </div>
                  <Switch
                    id="enableInAppNotifications"
                    checked={notificationSettings.enableInAppNotifications}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({
                        ...notificationSettings,
                        enableInAppNotifications: checked,
                      })
                    }
                  />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <Label htmlFor="enablePushNotifications">Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Send browser push notifications
                    </p>
                  </div>
                  <Switch
                    id="enablePushNotifications"
                    checked={notificationSettings.enablePushNotifications}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({
                        ...notificationSettings,
                        enablePushNotifications: checked,
                      })
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="notificationBatchSize">Batch Size</Label>
                  <Input
                    id="notificationBatchSize"
                    type="number"
                    value={notificationSettings.notificationBatchSize}
                    onChange={(e) =>
                      setNotificationSettings({
                        ...notificationSettings,
                        notificationBatchSize: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notificationRetryAttempts">Retry Attempts</Label>
                  <Input
                    id="notificationRetryAttempts"
                    type="number"
                    value={notificationSettings.notificationRetryAttempts}
                    onChange={(e) =>
                      setNotificationSettings({
                        ...notificationSettings,
                        notificationRetryAttempts: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <Button onClick={handleSaveNotifications}>Save Notification Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PlatformSettings;
