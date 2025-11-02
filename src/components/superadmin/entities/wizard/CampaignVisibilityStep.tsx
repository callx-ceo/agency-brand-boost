import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CampaignFormData } from "../types/campaignTypes";
import { Globe, Lock } from "lucide-react";

interface CampaignVisibilityStepProps {
  formData: CampaignFormData;
  updateFormData: (updates: Partial<CampaignFormData>) => void;
  userRole: "super_admin" | "agency_admin" | "publisher";
}

export const CampaignVisibilityStep = ({ formData, updateFormData, userRole }: CampaignVisibilityStepProps) => {
  // Agency admins can only create private campaigns
  if (userRole !== "super_admin") {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Campaign Visibility
            </CardTitle>
            <CardDescription>
              Your campaigns are private by default and only visible to your agency and invited publishers.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
              <Lock className="h-8 w-8 text-muted-foreground" />
              <div>
                <p className="font-medium">Private Campaign</p>
                <p className="text-sm text-muted-foreground">
                  Only accessible to your agency and invited publishers
                </p>
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
          <CardTitle>Campaign Visibility</CardTitle>
          <CardDescription>
            Choose whether this campaign should be available in the public marketplace or kept private
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={formData.visibility || "private"}
            onValueChange={(value: "private" | "marketplace") => updateFormData({ visibility: value })}
            className="space-y-4"
          >
            <div className="flex items-start space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-accent transition-colors">
              <RadioGroupItem value="private" id="private" className="mt-1" />
              <Label htmlFor="private" className="cursor-pointer flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Lock className="h-4 w-4" />
                  <span className="font-semibold">Private Campaign</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Only visible to your agency and specifically invited publishers. Full control over who can access and participate.
                </p>
              </Label>
            </div>

            <div className="flex items-start space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-accent transition-colors">
              <RadioGroupItem value="marketplace" id="marketplace" className="mt-1" />
              <Label htmlFor="marketplace" className="cursor-pointer flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Globe className="h-4 w-4" />
                  <span className="font-semibold">Marketplace Campaign</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Available to all qualified publishers in the CallX marketplace. Publishers can discover and apply to join this campaign.
                </p>
              </Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>
    </div>
  );
};

export default CampaignVisibilityStep;
