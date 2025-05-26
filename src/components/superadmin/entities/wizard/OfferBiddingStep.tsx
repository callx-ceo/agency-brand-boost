
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { DollarSign, Target, TrendingUp } from "lucide-react";
import { OfferFormData } from "../types/offerTypes";

interface OfferBiddingStepProps {
  formData: OfferFormData;
  updateFormData: (updates: Partial<OfferFormData>) => void;
  userRole: "super_admin" | "agency_admin" | "publisher";
  currentUserId?: string;
}

export const OfferBiddingStep = ({ formData, updateFormData }: OfferBiddingStepProps) => {
  const calculateProjectedSpend = () => {
    const daily = (formData.dailyCap || 0) * formData.bidPrice;
    const monthly = (formData.monthlyCap || 0) * formData.bidPrice;
    return { daily, monthly };
  };

  const projectedSpend = calculateProjectedSpend();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="w-5 h-5" />
            Bid Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="bidPrice">Bid Price (USD) *</Label>
            <div className="relative mt-1">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
              <Input
                id="bidPrice"
                type="number"
                value={formData.bidPrice || ""}
                onChange={(e) => updateFormData({ bidPrice: parseFloat(e.target.value) || 0 })}
                placeholder="45.00"
                className="pl-8"
                min="0"
                step="0.01"
              />
            </div>
            <p className="text-sm text-gray-500 mt-1">Amount you'll pay per qualified call</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="dailyCap">Daily Cap (Calls)</Label>
              <Input
                id="dailyCap"
                type="number"
                value={formData.dailyCap || ""}
                onChange={(e) => updateFormData({ dailyCap: parseInt(e.target.value) || undefined })}
                placeholder="200"
                className="mt-1"
                min="0"
              />
              <p className="text-sm text-gray-500 mt-1">Maximum calls per day</p>
            </div>

            <div>
              <Label htmlFor="monthlyCap">Monthly Cap (Calls)</Label>
              <Input
                id="monthlyCap"
                type="number"
                value={formData.monthlyCap || ""}
                onChange={(e) => updateFormData({ monthlyCap: parseInt(e.target.value) || undefined })}
                placeholder="5000"
                className="mt-1"
                min="0"
              />
              <p className="text-sm text-gray-500 mt-1">Maximum calls per month</p>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <Label htmlFor="activeImmediately">Activate Immediately</Label>
              <p className="text-sm text-gray-500">Start receiving calls as soon as offer is created</p>
            </div>
            <Switch
              id="activeImmediately"
              checked={formData.activeImmediately}
              onCheckedChange={(checked) => updateFormData({ activeImmediately: checked })}
            />
          </div>
        </CardContent>
      </Card>

      {(formData.dailyCap || formData.monthlyCap) && formData.bidPrice > 0 && (
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-700">
              <TrendingUp className="w-5 h-5" />
              Projected Spend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {formData.dailyCap && (
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    ${projectedSpend.daily.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">Maximum Daily Spend</div>
                  <Badge variant="outline" className="mt-1">
                    {formData.dailyCap} calls × ${formData.bidPrice}
                  </Badge>
                </div>
              )}
              
              {formData.monthlyCap && (
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    ${projectedSpend.monthly.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">Maximum Monthly Spend</div>
                  <Badge variant="outline" className="mt-1">
                    {formData.monthlyCap} calls × ${formData.bidPrice}
                  </Badge>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="bg-yellow-50 border-yellow-200">
        <CardContent className="pt-4">
          <div className="flex items-start gap-3">
            <Target className="w-5 h-5 text-yellow-600 mt-0.5" />
            <div className="text-sm text-yellow-800">
              <strong>Bidding Tips:</strong>
              <ul className="mt-2 space-y-1">
                <li>• Higher bids increase your chances of winning calls</li>
                <li>• Set realistic caps to control your spending</li>
                <li>• Monitor performance and adjust bids accordingly</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
