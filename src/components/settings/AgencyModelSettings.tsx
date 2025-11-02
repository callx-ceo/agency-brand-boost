import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Megaphone, Shuffle, Info } from 'lucide-react';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";

export type AgencyModel = "marketplace_buyers" | "byo_media" | "hybrid";

interface AgencyModelSettingsProps {
  currentModel?: AgencyModel;
  onModelChange?: (model: AgencyModel) => void;
}

export const AgencyModelSettings = ({ 
  currentModel = "marketplace_buyers",
  onModelChange 
}: AgencyModelSettingsProps) => {
  const [selectedModel, setSelectedModel] = useState<AgencyModel>(currentModel);
  const [isChanged, setIsChanged] = useState(false);

  const handleModelChange = (value: AgencyModel) => {
    setSelectedModel(value);
    setIsChanged(value !== currentModel);
  };

  const handleSave = () => {
    onModelChange?.(selectedModel);
    toast.success("Agency model updated successfully");
    setIsChanged(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Agency Business Model</CardTitle>
        <CardDescription>
          Choose how your agency operates within the CallX platform. This determines your campaign source types and billing structure.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <RadioGroup
          value={selectedModel}
          onValueChange={(value: AgencyModel) => handleModelChange(value)}
          className="space-y-4"
        >
          {/* Marketplace Buyers */}
          <div className="flex items-start space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-accent transition-colors">
            <RadioGroupItem value="marketplace_buyers" id="marketplace_buyers" className="mt-1" />
            <Label htmlFor="marketplace_buyers" className="cursor-pointer flex-1">
              <div className="flex items-center gap-2 mb-2">
                <ShoppingCart className="h-5 w-5 text-primary" />
                <span className="font-semibold text-lg">Marketplace Buyers</span>
                <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-600">
                  Default
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Buy 100% of calls through CallX media and participate in marketplace offers. Best for agencies that want done-for-you inbound flow.
              </p>
              <div className="bg-muted/50 p-3 rounded-md space-y-1">
                <p className="text-xs font-semibold">Features:</p>
                <ul className="text-xs text-muted-foreground space-y-1 ml-4 list-disc">
                  <li>Access to all CallX marketplace campaigns</li>
                  <li>No tracking fees or setup costs</li>
                  <li>Instant agent assignment to live campaigns</li>
                  <li>Pay only for connected calls</li>
                </ul>
              </div>
            </Label>
          </div>

          {/* BYO Media */}
          <div className="flex items-start space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-accent transition-colors">
            <RadioGroupItem value="byo_media" id="byo_media" className="mt-1" />
            <Label htmlFor="byo_media" className="cursor-pointer flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Megaphone className="h-5 w-5 text-primary" />
                <span className="font-semibold text-lg">Bring Your Own Media (BYO)</span>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Run your own ads and publishers through CallX tracking and routing. Perfect for agencies with in-house media buyers or established publisher relationships.
              </p>
              <div className="bg-muted/50 p-3 rounded-md space-y-2">
                <p className="text-xs font-semibold">Features:</p>
                <ul className="text-xs text-muted-foreground space-y-1 ml-4 list-disc">
                  <li>Create private campaigns for your own traffic</li>
                  <li>Invite and manage your own publishers</li>
                  <li>Full control over routing and payouts</li>
                  <li>Usage-based billing (15% below Ringba rates)</li>
                </ul>
                <div className="mt-2 pt-2 border-t border-border">
                  <p className="text-xs font-semibold mb-1">Tracking Costs:</p>
                  <ul className="text-xs text-muted-foreground space-y-0.5 ml-4 list-disc">
                    <li>US/CA Numbers: $0.85/month</li>
                    <li>US/CA Minutes: $0.041/min</li>
                    <li>Recordings: $0.0085/min</li>
                  </ul>
                </div>
              </div>
            </Label>
          </div>

          {/* Hybrid */}
          <div className="flex items-start space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-accent transition-colors">
            <RadioGroupItem value="hybrid" id="hybrid" className="mt-1" />
            <Label htmlFor="hybrid" className="cursor-pointer flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Shuffle className="h-5 w-5 text-primary" />
                <span className="font-semibold text-lg">Hybrid Model</span>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Combine CallX Marketplace calls with your own publishers and media. Ideal for growth agencies scaling from marketplace to owned media.
              </p>
              <div className="bg-muted/50 p-3 rounded-md space-y-1">
                <p className="text-xs font-semibold">Features:</p>
                <ul className="text-xs text-muted-foreground space-y-1 ml-4 list-disc">
                  <li>Access to CallX marketplace (no fees)</li>
                  <li>Create private campaigns for your traffic</li>
                  <li>Mixed billing: $0 for marketplace, usage fees for BYO</li>
                  <li>Flexible scaling between both sources</li>
                </ul>
              </div>
            </Label>
          </div>
        </RadioGroup>

        {selectedModel !== "marketplace_buyers" && (
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription className="text-xs">
              With {selectedModel === "hybrid" ? "Hybrid" : "BYO Media"} model, you can create private campaigns. 
              Marketplace campaigns remain active for all agents by default unless blocked at the agency level.
            </AlertDescription>
          </Alert>
        )}

        {isChanged && (
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => {
              setSelectedModel(currentModel);
              setIsChanged(false);
            }}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              Save Changes
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
