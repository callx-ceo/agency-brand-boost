import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CampaignFormData, CAMPAIGN_VERTICALS } from "../types/campaignTypes";

interface CampaignSettingsStepProps {
  formData: CampaignFormData;
  updateFormData: (updates: Partial<CampaignFormData>) => void;
}

export const CampaignSettingsStep = ({ formData, updateFormData }: CampaignSettingsStepProps) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6 space-y-6">
          {/* Payout */}
          <div>
            <Label>Payout</Label>
            <div className="relative mt-1">
              <Input
                type="number"
                value={formData.payout || 65}
                onChange={(e) => updateFormData({ payout: parseFloat(e.target.value) || 0 })}
                placeholder="65"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">%</span>
            </div>
          </div>

          {/* Vertical Name */}
          <div>
            <Label>Vertical Name</Label>
            <Select
              value={formData.vertical}
              onValueChange={(value) => updateFormData({ vertical: value })}
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select vertical" />
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

          {/* Expiration Date */}
          <div>
            <Label>Expiration Date</Label>
            <RadioGroup
              value={formData.expirationDate || "ongoing"}
              onValueChange={(value: "ongoing" | "expires") => updateFormData({ expirationDate: value })}
              className="mt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="ongoing" id="ongoing" />
                <Label htmlFor="ongoing" className="font-normal cursor-pointer">Ongoing</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="expires" id="expires" />
                <Label htmlFor="expires" className="font-normal cursor-pointer">Expires</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Repeat Calls */}
          <div>
            <Label>Repeat Calls</Label>
            <p className="text-sm text-muted-foreground mb-2">Ensure Repeat Calls Go To The Destination Number</p>
            <RadioGroup
              value={formData.repeatCalls ? "on" : "off"}
              onValueChange={(value) => updateFormData({ repeatCalls: value === "on" })}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="on" id="repeat-on" />
                <Label htmlFor="repeat-on" className="font-normal cursor-pointer">On</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="off" id="repeat-off" />
                <Label htmlFor="repeat-off" className="font-normal cursor-pointer">Off</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Record Calls */}
          <div>
            <Label>Record Calls</Label>
            <p className="text-sm text-muted-foreground mb-2">Record All Calls For This Campaign</p>
            <RadioGroup
              value={formData.recordCalls ? "on" : "off"}
              onValueChange={(value) => updateFormData({ recordCalls: value === "on" })}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="on" id="record-on" />
                <Label htmlFor="record-on" className="font-normal cursor-pointer">On</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="off" id="record-off" />
                <Label htmlFor="record-off" className="font-normal cursor-pointer">Off</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Greeting Recording */}
          <div>
            <Label>Greeting Recording</Label>
            <p className="text-sm text-muted-foreground mb-2">Play "This call may be recorded" greeting</p>
            <RadioGroup
              value={formData.greetingRecording ? "on" : "off"}
              onValueChange={(value) => updateFormData({ greetingRecording: value === "on" })}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="on" id="greeting-on" />
                <Label htmlFor="greeting-on" className="font-normal cursor-pointer">On</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="off" id="greeting-off" />
                <Label htmlFor="greeting-off" className="font-normal cursor-pointer">Off</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Lead Settings */}
          <div>
            <Label>Lead Settings</Label>
            <p className="text-sm text-muted-foreground mb-2">Accept Leads For This Campaign</p>
            <RadioGroup
              value={formData.leadSettings ? "on" : "off"}
              onValueChange={(value) => updateFormData({ leadSettings: value === "on" })}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="on" id="lead-on" />
                <Label htmlFor="lead-on" className="font-normal cursor-pointer">On</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="off" id="lead-off" />
                <Label htmlFor="lead-off" className="font-normal cursor-pointer">Off</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Off Hours Message */}
          <div>
            <Label>Off Hours Message</Label>
            <p className="text-sm text-muted-foreground mb-2">Send SMS to Off Hours Leads</p>
            <RadioGroup
              value={formData.offHoursMessage ? "on" : "off"}
              onValueChange={(value) => updateFormData({ offHoursMessage: value === "on" })}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="on" id="offhours-on" />
                <Label htmlFor="offhours-on" className="font-normal cursor-pointer">On</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="off" id="offhours-off" />
                <Label htmlFor="offhours-off" className="font-normal cursor-pointer">Off</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Visibility Settings */}
          <div>
            <Label>Visibility Settings</Label>
            <RadioGroup
              value={formData.visibilitySettings || "all_publishers"}
              onValueChange={(value: "all_publishers" | "approved_publishers" | "invitation_only") => 
                updateFormData({ visibilitySettings: value })
              }
              className="mt-2 space-y-3"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="all_publishers" id="all-pub" />
                <Label htmlFor="all-pub" className="font-normal cursor-pointer">All publishers</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="approved_publishers" id="approved-pub" />
                <Label htmlFor="approved-pub" className="font-normal cursor-pointer">
                  Publishers that have been approved for one of my other campaign
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="invitation_only" id="invite-only" />
                <Label htmlFor="invite-only" className="font-normal cursor-pointer">
                  No publishers (invitation only)
                </Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
