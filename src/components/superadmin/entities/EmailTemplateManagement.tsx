import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Mail } from "lucide-react";
import BrandingSettings from "@/components/settings/BrandingSettings";

interface EmailTemplateManagementProps {
  onBackToDashboard: () => void;
}

const EmailTemplateManagement: React.FC<EmailTemplateManagementProps> = ({ onBackToDashboard }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={onBackToDashboard}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Mail className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Email Template Management</h1>
              <p className="text-muted-foreground">
                Configure email templates and branding for agent performance reports
              </p>
            </div>
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Global Email Template Settings</CardTitle>
          <CardDescription>
            Manage email templates sent to agents. Agencies can customize branding while maintaining CallX branding.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <BrandingSettings />
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailTemplateManagement;