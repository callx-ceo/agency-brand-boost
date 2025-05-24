
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Building2, CreditCard, Phone, Brain, BarChart3, Shield } from "lucide-react";

// Mock settings for service billing policies
const mockServiceSettings = {
  whiteLabelPlatform: {
    enabled: true,
    agencyOnly: true, // Always agency-only
  },
  defaultBillingPolicies: {
    callCredits: "AGENCY_BILLED",
    telephonyFees: "AGENCY_BILLED", 
    aiCoaching: "AGENT_BILLED",
    aiCallScoring: "AGENT_BILLED"
  },
  allowAgentChoice: {
    callCredits: true,
    telephonyFees: true,
    aiCoaching: true,
    aiCallScoring: true
  }
};

const ServiceBillingSettings = () => {
  const [settings, setSettings] = useState(mockServiceSettings);

  const handleSaveSettings = () => {
    toast.success("Service billing settings updated successfully");
  };

  const handleDefaultPolicyChange = (service: string, policy: string) => {
    setSettings({
      ...settings,
      defaultBillingPolicies: {
        ...settings.defaultBillingPolicies,
        [service]: policy
      }
    });
  };

  const handleAgentChoiceToggle = (service: string, allowed: boolean) => {
    setSettings({
      ...settings,
      allowAgentChoice: {
        ...settings.allowAgentChoice,
        [service]: allowed
      }
    });
  };

  const getServiceIcon = (service: string) => {
    switch(service) {
      case 'callCredits': return <CreditCard className="h-5 w-5" />;
      case 'telephonyFees': return <Phone className="h-5 w-5" />;
      case 'aiCoaching': return <Brain className="h-5 w-5" />;
      case 'aiCallScoring': return <BarChart3 className="h-5 w-5" />;
      default: return <Shield className="h-5 w-5" />;
    }
  };

  const getServiceLabel = (service: string) => {
    switch(service) {
      case 'callCredits': return 'Call Credits / Seat License';
      case 'telephonyFees': return 'Telephony Fees';
      case 'aiCoaching': return 'AI Real-time Coaching';
      case 'aiCallScoring': return 'AI Call Scoring';
      default: return service;
    }
  };

  const getServiceDescription = (service: string) => {
    switch(service) {
      case 'callCredits': return 'Base monthly seat license and call credit allocations';
      case 'telephonyFees': return 'Per-minute charges for phone calls and SMS';
      case 'aiCoaching': return 'Real-time AI guidance during calls';
      case 'aiCallScoring': return 'Automated quality assessment and scoring';
      default: return '';
    }
  };

  return (
    <div className="space-y-6">
      {/* White Label Platform - Agency Only */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            White Label Platform
          </CardTitle>
          <CardDescription>
            Platform branding and customization features - Agency exclusive
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div>
              <div className="font-medium">White Label Platform Access</div>
              <div className="text-sm text-gray-600">Custom branding, domain, and platform configuration</div>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded text-sm font-medium bg-blue-100 text-blue-800">
                Agency Only
              </span>
              <Switch checked={settings.whiteLabelPlatform.enabled} disabled />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Service Billing Policies */}
      <Card>
        <CardHeader>
          <CardTitle>Service Billing Policies</CardTitle>
          <CardDescription>
            Configure default billing responsibility for each service
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {Object.entries(settings.defaultBillingPolicies).map(([service, defaultPolicy]) => (
            <div key={service} className="border rounded-lg p-4">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-3">
                  {getServiceIcon(service)}
                  <div>
                    <h4 className="font-medium">{getServiceLabel(service)}</h4>
                    <p className="text-sm text-gray-600">{getServiceDescription(service)}</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                {/* Default Policy */}
                <div>
                  <Label className="text-sm font-medium">Billing responsibility:</Label>
                  <div className="mt-2 flex gap-4">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name={`${service}-default`}
                        value="AGENCY_BILLED"
                        checked={defaultPolicy === "AGENCY_BILLED"}
                        onChange={(e) => handleDefaultPolicyChange(service, e.target.value)}
                        className="w-4 h-4"
                      />
                      <span className="text-sm">Agency pays</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name={`${service}-default`}
                        value="AGENT_BILLED"
                        checked={defaultPolicy === "AGENT_BILLED"}
                        onChange={(e) => handleDefaultPolicyChange(service, e.target.value)}
                        className="w-4 h-4"
                      />
                      <span className="text-sm">Agent pays</span>
                    </label>
                  </div>
                </div>

                {/* Agent Choice Toggle */}
                <div className="flex items-center justify-between pt-2 border-t">
                  <div>
                    <Label className="text-sm font-medium">Allow agents to change billing responsibility</Label>
                    <div className="text-xs text-gray-500 mt-1">
                      Agents can switch between agency-paid and self-paid for this service
                    </div>
                  </div>
                  <Switch
                    checked={settings.allowAgentChoice[service]}
                    onCheckedChange={(checked) => handleAgentChoiceToggle(service, checked)}
                  />
                </div>
              </div>
            </div>
          ))}
        </CardContent>
        <CardFooter>
          <Button onClick={handleSaveSettings}>Save Billing Policies</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ServiceBillingSettings;
