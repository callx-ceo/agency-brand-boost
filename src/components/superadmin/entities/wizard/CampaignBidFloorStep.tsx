
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DollarSign, TrendingUp, AlertCircle } from "lucide-react";
import { CampaignFormData } from "../types/campaignTypes";

interface CampaignBidFloorStepProps {
  formData: CampaignFormData;
  updateFormData: (updates: Partial<CampaignFormData>) => void;
  userRole: "super_admin" | "agency_admin" | "publisher";
  currentUserId?: string;
}

export const CampaignBidFloorStep = ({ formData, updateFormData }: CampaignBidFloorStepProps) => {
  const verticalRecommendations: Record<string, number> = {
    "Final Expense": 45.0,
    "Medicare": 35.0,
    "Auto Insurance": 25.0,
    "Home Insurance": 30.0,
    "Health Insurance": 40.0,
    "Life Insurance": 50.0,
    "Debt Settlement": 20.0,
    "Home Services": 15.0,
    "Legal": 55.0
  };

  const getRecommendedBidFloor = () => {
    return verticalRecommendations[formData.vertical] || 25.0;
  };

  const handleBidFloorToggle = (enabled: boolean) => {
    updateFormData({ 
      bidFloorEnabled: enabled,
      minimumBidFloor: enabled ? getRecommendedBidFloor() : 0
    });
  };

  const handleUseRecommended = () => {
    updateFormData({ minimumBidFloor: getRecommendedBidFloor() });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="w-5 h-5" />
            Bid Floor Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Enable Bid Floor */}
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="space-y-1">
              <Label className="text-base font-medium">Enable Bid Floor</Label>
              <p className="text-sm text-gray-600">
                Set a minimum bid amount that advertisers must meet to access this campaign
              </p>
            </div>
            <Switch
              checked={formData.bidFloorEnabled || false}
              onCheckedChange={handleBidFloorToggle}
            />
          </div>

          {formData.bidFloorEnabled && (
            <>
              {/* Currency Selection */}
              <div>
                <Label htmlFor="bidFloorCurrency">Currency</Label>
                <Select
                  value={formData.bidFloorCurrency || "USD"}
                  onValueChange={(value) => updateFormData({ bidFloorCurrency: value as "USD" | "EUR" | "GBP" })}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD ($)</SelectItem>
                    <SelectItem value="EUR">EUR (€)</SelectItem>
                    <SelectItem value="GBP">GBP (£)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Minimum Bid Floor */}
              <div>
                <Label htmlFor="minimumBidFloor">Minimum Bid Floor</Label>
                <div className="flex gap-2 mt-1">
                  <Input
                    id="minimumBidFloor"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.minimumBidFloor || 0}
                    onChange={(e) => updateFormData({ minimumBidFloor: parseFloat(e.target.value) || 0 })}
                    placeholder="0.00"
                    className="flex-1"
                  />
                  <button
                    type="button"
                    onClick={handleUseRecommended}
                    className="px-3 py-2 text-sm border rounded-md hover:bg-gray-50 flex items-center gap-1"
                  >
                    <TrendingUp className="w-4 h-4" />
                    Use Recommended
                  </button>
                </div>
                {formData.vertical && (
                  <p className="text-sm text-gray-600 mt-1">
                    Recommended for {formData.vertical}: ${getRecommendedBidFloor().toFixed(2)}
                  </p>
                )}
              </div>

              {/* Bid Floor Information */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="space-y-2">
                    <h4 className="font-medium text-blue-900">How Bid Floors Work</h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Advertisers must bid at or above this amount to access the campaign</li>
                      <li>• Higher bid floors can improve call quality and revenue</li>
                      <li>• Too high bid floors may reduce call volume</li>
                      <li>• You can adjust bid floors anytime after campaign creation</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Vertical-Specific Insights */}
              {formData.vertical && (
                <div className="bg-gray-50 border rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">{formData.vertical} Industry Insights</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Recommended Range:</span>
                      <p className="font-medium">${(getRecommendedBidFloor() * 0.8).toFixed(2)} - ${(getRecommendedBidFloor() * 1.2).toFixed(2)}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Average Market Rate:</span>
                      <p className="font-medium">${getRecommendedBidFloor().toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
