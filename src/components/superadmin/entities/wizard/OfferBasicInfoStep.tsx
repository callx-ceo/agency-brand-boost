import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Phone } from "lucide-react";
import { OfferFormData, VERTICALS, US_STATES } from "../types/offerTypes";

interface OfferBasicInfoStepProps {
  formData: OfferFormData;
  updateFormData: (updates: Partial<OfferFormData>) => void;
  userRole: "super_admin" | "agency_admin" | "publisher";
  currentUserId?: string;
}

export const OfferBasicInfoStep = ({ formData, updateFormData, userRole }: OfferBasicInfoStepProps) => {
  const mockAvailableAgents = 14; // This would be calculated based on selected states

  const handleSelectAllStates = () => {
    if (formData.targetStates.length === US_STATES.length) {
      // If all states are selected, deselect all
      updateFormData({ targetStates: [] });
    } else {
      // Otherwise, select all states
      updateFormData({ targetStates: [...US_STATES] });
    }
  };

  const isAllStatesSelected = formData.targetStates.length === US_STATES.length;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="offerName">Offer Name *</Label>
            <Input
              id="offerName"
              value={formData.name}
              onChange={(e) => updateFormData({ name: e.target.value })}
              placeholder="e.g., Final Expense Inbound"
              className="mt-1"
            />
          </div>

          <div>
            <Label>Offer Type *</Label>
            <RadioGroup
              value={formData.type}
              onValueChange={(value) => updateFormData({ type: value as "internal" | "external" })}
              className="mt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="internal" id="internal" />
                <Label htmlFor="internal" className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Distribute calls to agents
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="external" id="external" />
                <Label htmlFor="external" className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Send calls to external destination
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div>
            <Label htmlFor="vertical">Vertical *</Label>
            <Select value={formData.vertical} onValueChange={(value) => updateFormData({ vertical: value })}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select vertical" />
              </SelectTrigger>
              <SelectContent>
                {VERTICALS.map((vertical) => (
                  <SelectItem key={vertical} value={vertical}>
                    {vertical}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label>Target States</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleSelectAllStates}
                className="text-xs"
              >
                {isAllStatesSelected ? "Deselect All" : "Select All"}
              </Button>
            </div>
            <div className="p-3 border rounded-md max-h-40 overflow-y-auto">
              <div className="grid grid-cols-3 gap-2">
                {US_STATES.map((state) => (
                  <div key={state} className="flex items-center space-x-2">
                    <Checkbox
                      id={state}
                      checked={formData.targetStates.includes(state)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          updateFormData({ targetStates: [...formData.targetStates, state] });
                        } else {
                          updateFormData({ targetStates: formData.targetStates.filter(s => s !== state) });
                        }
                      }}
                    />
                    <Label htmlFor={state} className="text-sm">{state}</Label>
                  </div>
                ))}
              </div>
            </div>
            {formData.targetStates.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1">
                {formData.targetStates.map((state) => (
                  <Badge key={state} variant="secondary" className="text-xs">
                    {state}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <div>
            <Label htmlFor="callDuration">Call Duration Requirement (seconds)</Label>
            <Input
              id="callDuration"
              type="number"
              value={formData.callDurationRequirement}
              onChange={(e) => updateFormData({ callDurationRequirement: parseInt(e.target.value) || 60 })}
              className="mt-1"
              min="0"
            />
          </div>
        </div>
      </div>

      {formData.type === "internal" && formData.targetStates.length > 0 && (
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-600" />
              Agent Availability Preview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="text-2xl font-bold text-blue-600">{mockAvailableAgents}</div>
              <div className="text-sm text-gray-600">
                Active agents available in selected states: {formData.targetStates.join(", ")}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {formData.type === "external" && (
        <Card className="bg-orange-50 border-orange-200">
          <CardContent className="pt-4">
            <div className="flex items-center gap-2 text-orange-700">
              <Phone className="w-5 h-5" />
              <span className="text-sm">External destination number will be configured in the next step</span>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
