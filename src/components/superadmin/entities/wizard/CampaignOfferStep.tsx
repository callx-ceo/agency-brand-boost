import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CampaignFormData } from "../types/campaignTypes";
import { DollarSign, Clock, Target } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface CampaignOfferStepProps {
  formData: CampaignFormData;
  updateFormData: (updates: Partial<CampaignFormData>) => void;
}

export const CampaignOfferStep = ({ formData, updateFormData }: CampaignOfferStepProps) => {
  const offer = formData.offer || {
    payout: 0,
    payoutType: "per_call",
    minimumCallDuration: 120
  };

  const updateOffer = (updates: Partial<typeof offer>) => {
    updateFormData({
      offer: { ...offer, ...updates }
    });
  };

  return (
    <div className="space-y-6">
      <Alert>
        <Target className="h-4 w-4" />
        <AlertDescription className="text-sm">
          <strong>Single Offer Structure:</strong> Each campaign has one offer representing your agency as the advertiser. 
          This offer defines how much you'll pay for qualified calls from your publishers.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="w-5 h-5" />
            Campaign Offer Details
          </CardTitle>
          <CardDescription>
            Define the payout structure for this campaign
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="payout">Payout Amount *</Label>
              <div className="relative mt-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                <Input
                  id="payout"
                  type="number"
                  min="0"
                  step="0.01"
                  value={offer.payout}
                  onChange={(e) => updateOffer({ payout: parseFloat(e.target.value) || 0 })}
                  className="pl-7"
                  placeholder="0.00"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="payoutType">Payout Type *</Label>
              <Select
                value={offer.payoutType}
                onValueChange={(value: "per_call" | "per_minute" | "per_conversion") => 
                  updateOffer({ payoutType: value })
                }
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="per_call">Per Call</SelectItem>
                  <SelectItem value="per_minute">Per Minute</SelectItem>
                  <SelectItem value="per_conversion">Per Conversion</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="minimumCallDuration" className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Minimum Call Duration (seconds)
            </Label>
            <Input
              id="minimumCallDuration"
              type="number"
              min="0"
              step="1"
              value={offer.minimumCallDuration || 0}
              onChange={(e) => updateOffer({ minimumCallDuration: parseInt(e.target.value) || 0 })}
              className="mt-1"
              placeholder="120"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Calls shorter than this will not be eligible for payout
            </p>
          </div>

          <div>
            <Label htmlFor="qualificationCriteria">Qualification Criteria (Optional)</Label>
            <Textarea
              id="qualificationCriteria"
              value={offer.qualificationCriteria || ""}
              onChange={(e) => updateOffer({ qualificationCriteria: e.target.value })}
              placeholder="e.g., Caller must be 65+, interested in Medicare plans, and located in target states"
              className="mt-1"
              rows={3}
            />
            <p className="text-xs text-muted-foreground mt-1">
              Additional requirements for a call to be considered qualified
            </p>
          </div>

          <div>
            <Label htmlFor="conversionGoal">Conversion Goal (Optional)</Label>
            <Input
              id="conversionGoal"
              value={offer.conversionGoal || ""}
              onChange={(e) => updateOffer({ conversionGoal: e.target.value })}
              placeholder="e.g., Schedule appointment, transfer to licensed agent"
              className="mt-1"
            />
            <p className="text-xs text-muted-foreground mt-1">
              What action constitutes a successful conversion
            </p>
          </div>

          {/* Payout Summary */}
          <div className="bg-muted/50 p-4 rounded-lg border border-border">
            <p className="text-sm font-semibold mb-2">Payout Summary</p>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Amount:</span>
                <span className="font-medium">${offer.payout.toFixed(2)} {offer.payoutType.replace('_', ' ')}</span>
              </div>
              {offer.minimumCallDuration && offer.minimumCallDuration > 0 && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Min Duration:</span>
                  <span className="font-medium">{offer.minimumCallDuration}s ({Math.floor(offer.minimumCallDuration / 60)}m {offer.minimumCallDuration % 60}s)</span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CampaignOfferStep;
