
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Building2 } from "lucide-react";
import { CampaignFormData, CAMPAIGN_VERTICALS } from "../types/campaignTypes";
import { US_STATES } from "../types/offerTypes";

interface CampaignBasicInfoStepProps {
  formData: CampaignFormData;
  updateFormData: (updates: Partial<CampaignFormData>) => void;
  userRole: "super_admin" | "agency_admin" | "publisher";
  currentUserId?: string;
}

export const CampaignBasicInfoStep = ({ formData, updateFormData }: CampaignBasicInfoStepProps) => {
  const handleStateToggle = (state: string) => {
    const newStates = formData.targetStates.includes(state)
      ? formData.targetStates.filter(s => s !== state)
      : [...formData.targetStates, state];
    updateFormData({ targetStates: newStates });
  };

  const handleSelectAllStates = () => {
    const allSelected = formData.targetStates.length === US_STATES.length;
    updateFormData({ 
      targetStates: allSelected ? [] : [...US_STATES]
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="w-5 h-5" />
            Campaign Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="campaignName">Campaign Name *</Label>
            <Input
              id="campaignName"
              value={formData.name}
              onChange={(e) => updateFormData({ name: e.target.value })}
              placeholder="e.g., Holiday Sale Campaign"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="vertical">Vertical *</Label>
            <Select
              value={formData.vertical}
              onValueChange={(value) => updateFormData({ vertical: value })}
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select a vertical" />
              </SelectTrigger>
              <SelectContent>
                {CAMPAIGN_VERTICALS.map((vertical) => (
                  <SelectItem key={vertical} value={vertical}>
                    {vertical}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="callDuration">Minimum Call Duration (seconds) *</Label>
            <Input
              id="callDuration"
              type="number"
              value={formData.callDurationRequirement}
              onChange={(e) => updateFormData({ callDurationRequirement: parseInt(e.target.value) || 60 })}
              placeholder="60"
              className="mt-1"
              min="1"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Target States *</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-600">
                Select the states where this campaign will be active
              </p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleSelectAllStates}
              >
                {formData.targetStates.length === US_STATES.length ? "Deselect All" : "Select All"}
              </Button>
            </div>
            
            <div className="grid grid-cols-10 gap-2">
              {US_STATES.map((state) => (
                <button
                  key={state}
                  type="button"
                  onClick={() => handleStateToggle(state)}
                  className={`px-3 py-2 text-sm rounded border transition-colors ${
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
              <div className="mt-3">
                <p className="text-sm text-gray-600 mb-2">Selected states ({formData.targetStates.length}):</p>
                <div className="flex flex-wrap gap-1">
                  {formData.targetStates.map(state => (
                    <Badge key={state} variant="outline">{state}</Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
