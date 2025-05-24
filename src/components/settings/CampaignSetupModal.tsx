
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, Clock, Users, Phone, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

interface CampaignSetupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCampaignCreated: (campaign: any) => void;
}

const CampaignSetupModal = ({ isOpen, onClose, onCampaignCreated }: CampaignSetupModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    targetStates: [] as string[],
    hoursOfOperation: {
      monday: { start: "09:00", end: "17:00", enabled: true },
      tuesday: { start: "09:00", end: "17:00", enabled: true },
      wednesday: { start: "09:00", end: "17:00", enabled: true },
      thursday: { start: "09:00", end: "17:00", enabled: true },
      friday: { start: "09:00", end: "17:00", enabled: true },
      saturday: { start: "09:00", end: "17:00", enabled: false },
      sunday: { start: "09:00", end: "17:00", enabled: false },
    },
    minCallDuration: 60,
    assignedAgents: [] as string[],
    fallbackBehavior: "redirect_url" as "redirect_url" | "return_publisher" | "custom_message",
    fallbackUrl: "",
    fallbackMessage: "",
    whisperMessage: "",
    maxConcurrency: 3,
    recordCalls: true,
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [generatedPromoNumber, setGeneratedPromoNumber] = useState("");

  const usStates = [
    "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
    "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
    "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
    "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
    "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
  ];

  const availableAgents = [
    { id: "1", name: "John Smith", status: "online" },
    { id: "2", name: "Sarah Johnson", status: "online" },
    { id: "3", name: "Mike Chen", status: "offline" },
    { id: "4", name: "Lisa Davis", status: "online" },
    { id: "5", name: "Tom Wilson", status: "away" },
  ];

  const handleStateToggle = (state: string) => {
    if (formData.targetStates.includes(state)) {
      setFormData({
        ...formData,
        targetStates: formData.targetStates.filter(s => s !== state)
      });
    } else {
      setFormData({
        ...formData,
        targetStates: [...formData.targetStates, state]
      });
    }
  };

  const handleAgentToggle = (agentId: string) => {
    if (formData.assignedAgents.includes(agentId)) {
      setFormData({
        ...formData,
        assignedAgents: formData.assignedAgents.filter(id => id !== agentId)
      });
    } else {
      setFormData({
        ...formData,
        assignedAgents: [...formData.assignedAgents, agentId]
      });
    }
  };

  const generatePromoNumber = () => {
    const areaCode = Math.floor(Math.random() * 900) + 100;
    const exchange = Math.floor(Math.random() * 900) + 100;
    const number = Math.floor(Math.random() * 9000) + 1000;
    return `+1 (${areaCode}) ${exchange}-${number}`;
  };

  const handleCreateCampaign = () => {
    if (!formData.name.trim()) {
      toast.error("Please enter a campaign name");
      return;
    }

    if (formData.targetStates.length === 0) {
      toast.error("Please select at least one target state");
      return;
    }

    const promoNumber = generatePromoNumber();
    setGeneratedPromoNumber(promoNumber);

    const newCampaign = {
      name: formData.name,
      promoNumber,
      status: "active" as const,
      callsReceived: 0,
      connectedToAgent: 0,
      fallbacksTriggered: 0,
      createdAt: new Date().toISOString().split('T')[0],
      ...formData
    };

    onCampaignCreated(newCampaign);
    toast.success(`Campaign "${formData.name}" created successfully!`);
    onClose();
    
    // Reset form
    setFormData({
      name: "",
      targetStates: [],
      hoursOfOperation: {
        monday: { start: "09:00", end: "17:00", enabled: true },
        tuesday: { start: "09:00", end: "17:00", enabled: true },
        wednesday: { start: "09:00", end: "17:00", enabled: true },
        thursday: { start: "09:00", end: "17:00", enabled: true },
        friday: { start: "09:00", end: "17:00", enabled: true },
        saturday: { start: "09:00", end: "17:00", enabled: false },
        sunday: { start: "09:00", end: "17:00", enabled: false },
      },
      minCallDuration: 60,
      assignedAgents: [],
      fallbackBehavior: "redirect_url",
      fallbackUrl: "",
      fallbackMessage: "",
      whisperMessage: "",
      maxConcurrency: 3,
      recordCalls: true,
    });
    setCurrentStep(1);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Phone className="w-5 h-5" />
            Create New Campaign
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="campaignName">Campaign Name</Label>
                <Input
                  id="campaignName"
                  placeholder="e.g., Holiday Sale Campaign"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div>
                <Label>Target States</Label>
                <div className="mt-2 grid grid-cols-10 gap-1">
                  {usStates.map((state) => (
                    <button
                      key={state}
                      type="button"
                      onClick={() => handleStateToggle(state)}
                      className={`px-2 py-1 text-xs rounded border ${
                        formData.targetStates.includes(state)
                          ? "bg-blue-100 border-blue-300 text-blue-800"
                          : "bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {state}
                    </button>
                  ))}
                </div>
                {formData.targetStates.length > 0 && (
                  <p className="text-sm text-gray-600 mt-2">
                    Selected: {formData.targetStates.join(", ")}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Call Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Call Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Minimum Call Duration to Bill (seconds)</Label>
                <Input
                  type="number"
                  value={formData.minCallDuration}
                  onChange={(e) => setFormData({ ...formData, minCallDuration: parseInt(e.target.value) || 60 })}
                />
              </div>

              <div>
                <Label>Max Concurrency per Agent</Label>
                <Input
                  type="number"
                  value={formData.maxConcurrency}
                  onChange={(e) => setFormData({ ...formData, maxConcurrency: parseInt(e.target.value) || 1 })}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label>Record Calls</Label>
                <Switch
                  checked={formData.recordCalls}
                  onCheckedChange={(checked) => setFormData({ ...formData, recordCalls: checked })}
                />
              </div>
            </CardContent>
          </Card>

          {/* Agent Assignment */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Users className="w-5 h-5" />
                Agent Assignment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label>Assign Agents (leave empty for all agents)</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {availableAgents.map((agent) => (
                    <div
                      key={agent.id}
                      className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                        formData.assignedAgents.includes(agent.id)
                          ? "border-blue-300 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => handleAgentToggle(agent.id)}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{agent.name}</span>
                        <Badge
                          variant={agent.status === "online" ? "default" : "secondary"}
                          className={
                            agent.status === "online"
                              ? "bg-green-100 text-green-800"
                              : agent.status === "away"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-gray-100 text-gray-800"
                          }
                        >
                          {agent.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
                {formData.assignedAgents.length === 0 && (
                  <p className="text-sm text-gray-600">All available agents will be used</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Fallback Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Fallback Behavior
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>When no agents are available:</Label>
                <Select
                  value={formData.fallbackBehavior}
                  onValueChange={(value) => setFormData({ ...formData, fallbackBehavior: value as any })}
                >
                  <SelectTrigger>
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
                    value={formData.fallbackUrl}
                    onChange={(e) => setFormData({ ...formData, fallbackUrl: e.target.value })}
                  />
                </div>
              )}

              {formData.fallbackBehavior === "custom_message" && (
                <div>
                  <Label>Custom Message</Label>
                  <Textarea
                    placeholder="Sorry, all our agents are currently busy. Please try again later."
                    value={formData.fallbackMessage}
                    onChange={(e) => setFormData({ ...formData, fallbackMessage: e.target.value })}
                  />
                </div>
              )}

              <div>
                <Label>Whisper Message (optional)</Label>
                <Input
                  placeholder="This call is from the Holiday Sale campaign"
                  value={formData.whisperMessage}
                  onChange={(e) => setFormData({ ...formData, whisperMessage: e.target.value })}
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleCreateCampaign}>
              Create Campaign
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CampaignSetupModal;
