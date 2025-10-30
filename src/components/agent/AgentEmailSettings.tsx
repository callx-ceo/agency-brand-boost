import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Mail, Bell, Target, BarChart3 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { EmailTemplateSelector } from "./EmailTemplatePreview";
import EmailTestComponent from "./EmailTestComponent";

const AgentEmailSettings = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    callScoreEmails: true,
    callScoreFrequency: "per_call", // "per_call" | "daily_digest" | "weekly_digest"
    recommendedActionsEmails: true,
    recommendedActionsFrequency: "daily", // "daily" | "weekly"
  });

  const handleToggle = (key: keyof typeof settings, value: boolean | string) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    // TODO: Save to database/backend
    console.log("Saving email settings:", settings);
    toast({
      title: "Settings Saved",
      description: "Your email notification preferences have been updated.",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Mail className="w-6 h-6" />
          Email Notifications
        </h2>
        <p className="text-muted-foreground mt-1">
          Configure when and how you receive performance updates via email
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-blue-500" />
            Call Score Reports
          </CardTitle>
          <CardDescription>
            Receive detailed scoring and feedback after calls
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="call-score-emails" className="text-base">
                Enable Call Score Emails
              </Label>
              <p className="text-sm text-muted-foreground">
                Get AI-powered scoring and improvement suggestions
              </p>
            </div>
            <Switch
              id="call-score-emails"
              checked={settings.callScoreEmails}
              onCheckedChange={(checked) => handleToggle("callScoreEmails", checked)}
            />
          </div>

          {settings.callScoreEmails && (
            <div className="ml-4 pl-4 border-l-2 border-border space-y-3">
              <Label className="text-sm font-medium">Email Frequency</Label>
              <RadioGroup
                value={settings.callScoreFrequency}
                onValueChange={(value) => handleToggle("callScoreFrequency", value)}
                className="space-y-3"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="per_call" id="per_call" />
                  <Label htmlFor="per_call" className="font-normal cursor-pointer">
                    After every call (recommended for learning)
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="daily_digest" id="daily_digest" />
                  <Label htmlFor="daily_digest" className="font-normal cursor-pointer">
                    Daily digest - One summary per day
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="weekly_digest" id="weekly_digest" />
                  <Label htmlFor="weekly_digest" className="font-normal cursor-pointer">
                    Weekly digest - Summary at week's end
                  </Label>
                </div>
              </RadioGroup>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-green-500" />
            Recommended Actions
          </CardTitle>
          <CardDescription>
            Get personalized action plans to improve your performance
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="actions-emails" className="text-base">
                Enable Action Recommendations
              </Label>
              <p className="text-sm text-muted-foreground">
                Receive AI-generated suggestions tailored to your performance
              </p>
            </div>
            <Switch
              id="actions-emails"
              checked={settings.recommendedActionsEmails}
              onCheckedChange={(checked) => handleToggle("recommendedActionsEmails", checked)}
            />
          </div>

          {settings.recommendedActionsEmails && (
            <div className="ml-4 pl-4 border-l-2 border-border space-y-3">
              <Label className="text-sm font-medium">Email Frequency</Label>
              <RadioGroup
                value={settings.recommendedActionsFrequency}
                onValueChange={(value) => handleToggle("recommendedActionsFrequency", value)}
                className="space-y-3"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="daily" id="daily" />
                  <Label htmlFor="daily" className="font-normal cursor-pointer">
                    Daily - Fresh insights every day
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="weekly" id="weekly" />
                  <Label htmlFor="weekly" className="font-normal cursor-pointer">
                    Weekly - Comprehensive weekly review
                  </Label>
                </div>
              </RadioGroup>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <div className="flex gap-3">
          <Bell className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
              Why receive call scores after every call?
            </p>
            <p className="text-sm text-blue-700 dark:text-blue-300">
              Immediate feedback helps you learn faster and adjust your approach in real-time. 
              Studies show agents who review their performance after each call improve 3x faster 
              than those who review weekly.
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <Button variant="outline" onClick={() => window.location.reload()}>
          Cancel
        </Button>
        <Button onClick={handleSave}>
          Save Preferences
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Email Template Customization</CardTitle>
          <CardDescription>
            Preview and customize your email templates
          </CardDescription>
        </CardHeader>
        <CardContent>
          <EmailTemplateSelector />
        </CardContent>
      </Card>

      <EmailTestComponent />
    </div>
  );
};

export default AgentEmailSettings;
