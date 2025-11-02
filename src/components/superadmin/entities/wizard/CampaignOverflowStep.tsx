import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { CampaignFormData } from "../types/campaignTypes";
import { AlertCircle, ArrowRightLeft, PhoneOff, Store } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface CampaignOverflowStepProps {
  formData: CampaignFormData;
  updateFormData: (updates: Partial<CampaignFormData>) => void;
}

export const CampaignOverflowStep = ({ formData, updateFormData }: CampaignOverflowStepProps) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Overflow Call Management</CardTitle>
          <CardDescription>
            Define what happens when calls exceed your capacity or routing rules
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <RadioGroup
            value={formData.overflowBehavior || "drop_queue"}
            onValueChange={(value: "internal_redirect" | "offer_marketplace" | "drop_queue") => 
              updateFormData({ overflowBehavior: value })
            }
            className="space-y-4"
          >
            <div className="flex items-start space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-accent transition-colors">
              <RadioGroupItem value="internal_redirect" id="internal_redirect" className="mt-1" />
              <Label htmlFor="internal_redirect" className="cursor-pointer flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <ArrowRightLeft className="h-4 w-4" />
                  <span className="font-semibold">Redirect to Internal Destination</span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Forward overflow calls to your own backup number or overflow partner
                </p>
                {formData.overflowBehavior === "internal_redirect" && (
                  <div className="space-y-2 mt-3">
                    <Label htmlFor="overflowDestination" className="text-sm">
                      Overflow Destination (Phone Number or SIP URI)
                    </Label>
                    <Input
                      id="overflowDestination"
                      placeholder="+1234567890 or sip:overflow@yourdomain.com"
                      value={formData.overflowDestination || ""}
                      onChange={(e) => updateFormData({ overflowDestination: e.target.value })}
                    />
                  </div>
                )}
              </Label>
            </div>

            <div className="flex items-start space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-accent transition-colors">
              <RadioGroupItem value="offer_marketplace" id="offer_marketplace" className="mt-1" />
              <Label htmlFor="offer_marketplace" className="cursor-pointer flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Store className="h-4 w-4" />
                  <span className="font-semibold">Offer to CallX Marketplace</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Send overflow calls to the CallX marketplace for other qualified agents to handle
                </p>
                {formData.overflowBehavior === "offer_marketplace" && (
                  <Alert className="mt-3">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription className="text-xs">
                      CallX reserves the right to accept or reject overflow calls based on quality, routing capacity, and availability.
                    </AlertDescription>
                  </Alert>
                )}
              </Label>
            </div>

            <div className="flex items-start space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-accent transition-colors">
              <RadioGroupItem value="drop_queue" id="drop_queue" className="mt-1" />
              <Label htmlFor="drop_queue" className="cursor-pointer flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <PhoneOff className="h-4 w-4" />
                  <span className="font-semibold">Drop or Hold in Queue</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Disconnect overflow calls or place them in a queue until capacity becomes available (default)
                </p>
              </Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>
    </div>
  );
};

export default CampaignOverflowStep;
