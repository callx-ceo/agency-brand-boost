
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Users, Phone, Clock, Settings } from "lucide-react";
import { OfferFormData, DAYS_OF_WEEK } from "../types/offerTypes";

interface OfferRoutingStepProps {
  formData: OfferFormData;
  updateFormData: (updates: Partial<OfferFormData>) => void;
  userRole: "super_admin" | "agency_admin" | "publisher";
  currentUserId?: string;
}

// Mock data for available agents
const mockAgents = [
  { id: "agent_001", name: "John Smith", email: "john@agency.com", states: ["FL", "TX"], status: "active" as const },
  { id: "agent_002", name: "Sarah Johnson", email: "sarah@agency.com", states: ["CA", "NY"], status: "active" as const },
  { id: "agent_003", name: "Mike Wilson", email: "mike@agency.com", states: ["FL", "GA"], status: "active" as const },
];

export const OfferRoutingStep = ({ formData, updateFormData }: OfferRoutingStepProps) => {
  const availableAgents = mockAgents.filter(agent => 
    agent.states.some(state => formData.targetStates.includes(state))
  );

  if (formData.type === "external") {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="w-5 h-5" />
              External Routing Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="externalDestination">External Destination Number *</Label>
              <Input
                id="externalDestination"
                value={formData.externalDestination || ""}
                onChange={(e) => updateFormData({ externalDestination: e.target.value })}
                placeholder="+1 (888) 555-1212"
                className="mt-1"
              />
              <p className="text-sm text-gray-500 mt-1">Must be in E.164 format</p>
            </div>

            <div>
              <Label htmlFor="fallbackNumber">Fallback Number (Optional)</Label>
              <Input
                id="fallbackNumber"
                value={formData.fallbackNumber || ""}
                onChange={(e) => updateFormData({ fallbackNumber: e.target.value })}
                placeholder="+1 (888) 555-1213"
                className="mt-1"
              />
              <p className="text-sm text-gray-500 mt-1">Used when primary destination is unavailable</p>
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

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Hours of Operation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="startTime">Start Time</Label>
                <Input
                  id="startTime"
                  type="time"
                  value={formData.schedule.start}
                  onChange={(e) => updateFormData({ 
                    schedule: { ...formData.schedule, start: e.target.value }
                  })}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="endTime">End Time</Label>
                <Input
                  id="endTime"
                  type="time"
                  value={formData.schedule.end}
                  onChange={(e) => updateFormData({ 
                    schedule: { ...formData.schedule, end: e.target.value }
                  })}
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <Label>Operating Days</Label>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {DAYS_OF_WEEK.map((day) => (
                  <div key={day} className="flex items-center space-x-2">
                    <Checkbox
                      id={day}
                      checked={formData.schedule.days.includes(day)}
                      onCheckedChange={(checked) => {
                        const days = checked 
                          ? [...formData.schedule.days, day]
                          : formData.schedule.days.filter(d => d !== day);
                        updateFormData({ schedule: { ...formData.schedule, days } });
                      }}
                    />
                    <Label htmlFor={day} className="text-sm">{day}</Label>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Agent Assignment
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Available Agents ({availableAgents.length})</Label>
            <p className="text-sm text-gray-500 mb-3">
              Agents matching your selected states: {formData.targetStates.join(", ")}
            </p>
            <div className="space-y-2 max-h-40 overflow-y-auto border rounded-md p-3">
              {availableAgents.map((agent) => (
                <div key={agent.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
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
                  <div className="flex gap-1">
                    {agent.states.map(state => (
                      <Badge key={state} variant="outline" className="text-xs">{state}</Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="concurrency">Concurrency Limit per Agent</Label>
            <Input
              id="concurrency"
              type="number"
              value={formData.concurrencyCapPerAgent || ""}
              onChange={(e) => updateFormData({ concurrencyCapPerAgent: parseInt(e.target.value) || undefined })}
              placeholder="5"
              className="mt-1"
              min="1"
              max="10"
            />
            <p className="text-sm text-gray-500 mt-1">Maximum simultaneous calls per agent (optional)</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Schedule Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="startTime">Start Time</Label>
              <Input
                id="startTime"
                type="time"
                value={formData.schedule.start}
                onChange={(e) => updateFormData({ 
                  schedule: { ...formData.schedule, start: e.target.value }
                })}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="endTime">End Time</Label>
              <Input
                id="endTime"
                type="time"
                value={formData.schedule.end}
                onChange={(e) => updateFormData({ 
                  schedule: { ...formData.schedule, end: e.target.value }
                })}
                className="mt-1"
              />
            </div>
          </div>

          <div>
            <Label>Operating Days</Label>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {DAYS_OF_WEEK.map((day) => (
                <div key={day} className="flex items-center space-x-2">
                  <Checkbox
                    id={day}
                    checked={formData.schedule.days.includes(day)}
                    onCheckedChange={(checked) => {
                      const days = checked 
                        ? [...formData.schedule.days, day]
                        : formData.schedule.days.filter(d => d !== day);
                      updateFormData({ schedule: { ...formData.schedule, days } });
                    }}
                  />
                  <Label htmlFor={day} className="text-sm">{day}</Label>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
