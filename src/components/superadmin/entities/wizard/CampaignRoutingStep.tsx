
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Users, Clock, AlertTriangle } from "lucide-react";
import { CampaignFormData } from "../types/campaignTypes";

interface CampaignRoutingStepProps {
  formData: CampaignFormData;
  updateFormData: (updates: Partial<CampaignFormData>) => void;
  userRole: "super_admin" | "agency_admin" | "publisher";
}

// Mock data for available agents
const mockAgents = [
  { id: "agent_001", name: "John Smith", email: "john@agency.com", states: ["FL", "TX"], status: "active" as const },
  { id: "agent_002", name: "Sarah Johnson", email: "sarah@agency.com", states: ["CA", "NY"], status: "active" as const },
  { id: "agent_003", name: "Mike Wilson", email: "mike@agency.com", states: ["FL", "GA"], status: "active" as const },
];

// US Timezones
const US_TIMEZONES = [
  { value: "America/New_York", label: "Eastern Time (ET)" },
  { value: "America/Chicago", label: "Central Time (CT)" },
  { value: "America/Denver", label: "Mountain Time (MT)" },
  { value: "America/Los_Angeles", label: "Pacific Time (PT)" },
  { value: "America/Anchorage", label: "Alaska Time (AKT)" },
  { value: "Pacific/Honolulu", label: "Hawaii Time (HT)" }
];

const HOURS = Array.from({ length: 24 }, (_, i) => {
  const hour = i.toString().padStart(2, '0');
  return { value: `${hour}:00`, label: `${hour}:00` };
});

const DAYS_CONFIG = [
  { key: "Monday", label: "Mon" },
  { key: "Tuesday", label: "Tue" },
  { key: "Wednesday", label: "Wed" },
  { key: "Thursday", label: "Thu" },
  { key: "Friday", label: "Fri" },
  { key: "Saturday", label: "Sat" },
  { key: "Sunday", label: "Sun" }
];

export const CampaignRoutingStep = ({ formData, updateFormData }: CampaignRoutingStepProps) => {
  const availableAgents = mockAgents.filter(agent => 
    agent.states.some(state => formData.targetStates.includes(state))
  );

  // Initialize with all agents selected
  React.useEffect(() => {
    if (!formData.assignedAgents && availableAgents.length > 0) {
      updateFormData({ assignedAgents: availableAgents.map(agent => agent.id) });
    }
  }, [availableAgents, formData.assignedAgents, updateFormData]);

  // Initialize timezone if not set
  React.useEffect(() => {
    if (!formData.schedule.timezone) {
      updateFormData({ 
        schedule: { 
          ...formData.schedule, 
          timezone: "America/New_York",
          operationType: "allDays"
        }
      });
    }
  }, [formData.schedule.timezone, updateFormData]);

  const handleSelectAllAgents = () => {
    const allAgentIds = availableAgents.map(agent => agent.id);
    if (formData.assignedAgents?.length === allAgentIds.length) {
      updateFormData({ assignedAgents: [] });
    } else {
      updateFormData({ assignedAgents: allAgentIds });
    }
  };

  const handleDayScheduleChange = (day: string, field: "start" | "end" | "closed", value: string | boolean) => {
    const currentDaySchedules = formData.schedule.daySchedules || {};
    updateFormData({
      schedule: {
        ...formData.schedule,
        daySchedules: {
          ...currentDaySchedules,
          [day]: {
            ...currentDaySchedules[day],
            [field]: value
          }
        }
      }
    });
  };

  const copyHoursToAllDays = (sourceDay: string) => {
    const sourceDaySchedule = formData.schedule.daySchedules?.[sourceDay];
    if (!sourceDaySchedule) return;

    const newDaySchedules: any = {};
    DAYS_CONFIG.forEach(day => {
      newDaySchedules[day.key] = { ...sourceDaySchedule };
    });

    updateFormData({
      schedule: {
        ...formData.schedule,
        daySchedules: newDaySchedules
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Agent Assignment */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Agent Assignment
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-3">
              <Label>Available Agents ({availableAgents.length})</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleSelectAllAgents}
                className="text-xs"
              >
                {formData.assignedAgents?.length === availableAgents.length ? "Deselect All" : "Select All"}
              </Button>
            </div>
            <div className="space-y-2 max-h-40 overflow-y-auto border rounded-md p-3">
              {availableAgents.map((agent) => (
                <div key={agent.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={agent.id}
                    checked={formData.assignedAgents?.includes(agent.id) || false}
                    onCheckedChange={(checked) => {
                      const agents = checked 
                        ? [...(formData.assignedAgents || []), agent.id]
                        : (formData.assignedAgents || []).filter(id => id !== agent.id);
                      updateFormData({ assignedAgents: agents });
                    }}
                  />
                  <div>
                    <Label htmlFor={agent.id} className="font-medium">{agent.name}</Label>
                    <p className="text-xs text-gray-500">{agent.email}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="concurrency">Max Concurrency per Agent</Label>
            <Input
              id="concurrency"
              type="number"
              value={formData.concurrencyCapPerAgent || ""}
              onChange={(e) => updateFormData({ concurrencyCapPerAgent: parseInt(e.target.value) || undefined })}
              placeholder="3"
              className="mt-1"
              min="1"
              max="10"
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="recording">Enable Call Recording</Label>
              <p className="text-sm text-gray-500">Record calls for quality assurance</p>
            </div>
            <Switch
              id="recording"
              checked={formData.recordingEnabled || false}
              onCheckedChange={(checked) => updateFormData({ recordingEnabled: checked })}
            />
          </div>
        </CardContent>
      </Card>

      {/* Hours of Operation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Hours of Operation
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="timezone">Timezone</Label>
            <Select
              value={formData.schedule.timezone || "America/New_York"}
              onValueChange={(value) => updateFormData({ 
                schedule: { ...formData.schedule, timezone: value }
              })}
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select timezone" />
              </SelectTrigger>
              <SelectContent>
                {US_TIMEZONES.map((tz) => (
                  <SelectItem key={tz.value} value={tz.value}>
                    {tz.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Operation Type</Label>
            <RadioGroup
              value={formData.schedule.operationType || "allDays"}
              onValueChange={(value) => updateFormData({ 
                schedule: { ...formData.schedule, operationType: value as "allDays" | "specificDays" }
              })}
              className="mt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="allDays" id="allDays" />
                <Label htmlFor="allDays">All Days</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="specificDays" id="specificDays" />
                <Label htmlFor="specificDays">Specific Days</Label>
              </div>
            </RadioGroup>
          </div>

          {formData.schedule.operationType === "specificDays" && (
            <div className="space-y-3">
              <p className="text-sm text-gray-600">Please enter the hours of operation for this campaign:</p>
              
              {DAYS_CONFIG.map((day, index) => {
                const daySchedule = formData.schedule.daySchedules?.[day.key] || { start: "08:00", end: "17:00", closed: false };
                
                return (
                  <div key={day.key} className="grid grid-cols-12 gap-2 items-center">
                    <div className="col-span-1">
                      <Label className="text-sm">{day.label}</Label>
                    </div>
                    
                    <div className="col-span-2">
                      <Select
                        value={daySchedule.start || "08:00"}
                        onValueChange={(value) => handleDayScheduleChange(day.key, "start", value)}
                        disabled={daySchedule.closed}
                      >
                        <SelectTrigger className="text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {HOURS.map((hour) => (
                            <SelectItem key={hour.value} value={hour.value}>
                              {hour.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="col-span-1 text-center text-sm">to</div>
                    
                    <div className="col-span-2">
                      <Select
                        value={daySchedule.end || "17:00"}
                        onValueChange={(value) => handleDayScheduleChange(day.key, "end", value)}
                        disabled={daySchedule.closed}
                      >
                        <SelectTrigger className="text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {HOURS.map((hour) => (
                            <SelectItem key={hour.value} value={hour.value}>
                              {hour.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="col-span-2 flex items-center space-x-2">
                      <Checkbox
                        id={`${day.key}-closed`}
                        checked={daySchedule.closed || false}
                        onCheckedChange={(checked) => handleDayScheduleChange(day.key, "closed", checked)}
                      />
                      <Label htmlFor={`${day.key}-closed`} className="text-sm">Closed</Label>
                    </div>
                    
                    {index === 0 && (
                      <div className="col-span-4">
                        <Button
                          type="button"
                          variant="link"
                          size="sm"
                          onClick={() => copyHoursToAllDays(day.key)}
                          className="text-xs text-blue-600"
                        >
                          Copy hours to each day
                        </Button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Fallback Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Fallback Behavior
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>When no agents are available:</Label>
            <Select
              value={formData.fallbackBehavior}
              onValueChange={(value) => updateFormData({ fallbackBehavior: value as any })}
            >
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="redirect_url">302 Redirect to URL</SelectItem>
                <SelectItem value="return_publisher">Return to Publisher Number</SelectItem>
                <SelectItem value="custom_message">Play Custom Message</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {formData.fallbackBehavior === "redirect_url" && (
            <div>
              <Label>Fallback URL</Label>
              <Input
                placeholder="https://example.com/fallback"
                value={formData.fallbackUrl || ""}
                onChange={(e) => updateFormData({ fallbackUrl: e.target.value })}
                className="mt-1"
              />
            </div>
          )}

          {formData.fallbackBehavior === "custom_message" && (
            <div>
              <Label>Custom Message</Label>
              <Textarea
                placeholder="Sorry, all our agents are currently busy. Please try again later."
                value={formData.fallbackMessage || ""}
                onChange={(e) => updateFormData({ fallbackMessage: e.target.value })}
                className="mt-1"
              />
            </div>
          )}

          <div>
            <Label>Whisper Message (optional)</Label>
            <Input
              placeholder="This call is from the Holiday Sale campaign"
              value={formData.whisperMessage || ""}
              onChange={(e) => updateFormData({ whisperMessage: e.target.value })}
              className="mt-1"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
