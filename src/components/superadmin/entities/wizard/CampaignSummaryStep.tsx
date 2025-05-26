
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Building2, Users, Clock, AlertTriangle } from "lucide-react";
import { CampaignFormData } from "../types/campaignTypes";

interface CampaignSummaryStepProps {
  formData: CampaignFormData;
  userRole: "super_admin" | "agency_admin" | "publisher";
}

export const CampaignSummaryStep = ({ formData }: CampaignSummaryStepProps) => {
  const generatePromoNumber = () => {
    const areaCode = Math.floor(Math.random() * 900) + 100;
    const exchange = Math.floor(Math.random() * 900) + 100;
    const number = Math.floor(Math.random() * 9000) + 1000;
    return `+1 (${areaCode}) ${exchange}-${number}`;
  };

  const promoNumber = React.useMemo(() => generatePromoNumber(), []);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            Campaign Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">
            Please review your campaign configuration before launching.
          </p>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="font-medium text-green-800">Generated Promo Number</span>
            </div>
            <p className="text-2xl font-mono text-green-800">{promoNumber}</p>
            <p className="text-sm text-green-600 mt-1">
              This number will be automatically provisioned for your campaign.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="w-5 h-5" />
            Basic Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <span className="font-medium">Campaign Name:</span>
            <span className="ml-2">{formData.name}</span>
          </div>
          <div>
            <span className="font-medium">Vertical:</span>
            <Badge className="ml-2">{formData.vertical}</Badge>
          </div>
          <div>
            <span className="font-medium">Minimum Call Duration:</span>
            <span className="ml-2">{formData.callDurationRequirement} seconds</span>
          </div>
          <div>
            <span className="font-medium">Target States ({formData.targetStates.length}):</span>
            <div className="mt-1 flex flex-wrap gap-1">
              {formData.targetStates.map(state => (
                <Badge key={state} variant="outline">{state}</Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Agent Assignment & Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <span className="font-medium">Assigned Agents:</span>
            <span className="ml-2">{formData.assignedAgents?.length || 0} agents selected</span>
          </div>
          {formData.concurrencyCapPerAgent && (
            <div>
              <span className="font-medium">Max Concurrency per Agent:</span>
              <span className="ml-2">{formData.concurrencyCapPerAgent}</span>
            </div>
          )}
          <div>
            <span className="font-medium">Call Recording:</span>
            <Badge className="ml-2" variant={formData.recordingEnabled ? "default" : "secondary"}>
              {formData.recordingEnabled ? "Enabled" : "Disabled"}
            </Badge>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Hours of Operation
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <span className="font-medium">Timezone:</span>
            <span className="ml-2">{formData.schedule.timezone}</span>
          </div>
          <div>
            <span className="font-medium">Operation Type:</span>
            <span className="ml-2">
              {formData.schedule.operationType === "allDays" ? "All Days" : "Specific Days"}
            </span>
          </div>
          {formData.schedule.operationType === "allDays" ? (
            <div>
              <span className="font-medium">Hours:</span>
              <span className="ml-2">{formData.schedule.start} - {formData.schedule.end}</span>
            </div>
          ) : (
            <div>
              <span className="font-medium">Daily Schedule:</span>
              <div className="mt-2 space-y-1 text-sm">
                {Object.entries(formData.schedule.daySchedules || {}).map(([day, schedule]) => (
                  <div key={day} className="flex justify-between">
                    <span>{day}:</span>
                    <span>
                      {schedule.closed ? "Closed" : `${schedule.start} - ${schedule.end}`}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Fallback Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <span className="font-medium">Fallback Behavior:</span>
            <span className="ml-2">
              {formData.fallbackBehavior === "redirect_url" && "302 Redirect to URL"}
              {formData.fallbackBehavior === "return_publisher" && "Return to Publisher Number"}
              {formData.fallbackBehavior === "custom_message" && "Play Custom Message"}
            </span>
          </div>
          {formData.fallbackUrl && (
            <div>
              <span className="font-medium">Fallback URL:</span>
              <span className="ml-2 text-blue-600">{formData.fallbackUrl}</span>
            </div>
          )}
          {formData.fallbackMessage && (
            <div>
              <span className="font-medium">Custom Message:</span>
              <span className="ml-2 italic">"{formData.fallbackMessage}"</span>
            </div>
          )}
          {formData.whisperMessage && (
            <div>
              <span className="font-medium">Whisper Message:</span>
              <span className="ml-2 italic">"{formData.whisperMessage}"</span>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
