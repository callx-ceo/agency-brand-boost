
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DollarSign, Save, TrendingUp, AlertCircle, Edit } from "lucide-react";
import { toast } from "sonner";

interface BidFloorSettingsProps {
  campaignName: string;
  vertical: string;
  initialSettings: {
    bidFloorEnabled: boolean;
    minimumBidFloor: number;
    bidFloorCurrency: "USD" | "EUR" | "GBP";
  };
  onSave: (settings: any) => void;
}

const BidFloorSettings = ({ campaignName, vertical, initialSettings, onSave }: BidFloorSettingsProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [settings, setSettings] = useState(initialSettings);

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
    return verticalRecommendations[vertical] || 25.0;
  };

  const handleSave = () => {
    onSave(settings);
    setIsEditing(false);
    toast.success("Bid floor settings updated successfully");
  };

  const handleCancel = () => {
    setSettings(initialSettings);
    setIsEditing(false);
  };

  const getCurrencySymbol = (currency: string) => {
    switch (currency) {
      case "USD": return "$";
      case "EUR": return "€";
      case "GBP": return "£";
      default: return "$";
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="w-5 h-5" />
            Bid Floor Settings
          </CardTitle>
          {!isEditing && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setIsEditing(true)}
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {!isEditing ? (
          // Read-only view
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <Label className="text-base font-medium">Bid Floor Status</Label>
                <p className="text-sm text-gray-600">
                  {settings.bidFloorEnabled 
                    ? "Advertisers must meet minimum bid requirements" 
                    : "No bid floor requirements set"
                  }
                </p>
              </div>
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                settings.bidFloorEnabled 
                  ? "bg-green-100 text-green-800" 
                  : "bg-gray-100 text-gray-600"
              }`}>
                {settings.bidFloorEnabled ? "Enabled" : "Disabled"}
              </div>
            </div>

            {settings.bidFloorEnabled && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-600">Minimum Bid Floor</Label>
                  <p className="text-2xl font-bold">
                    {getCurrencySymbol(settings.bidFloorCurrency)}{settings.minimumBidFloor.toFixed(2)}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Currency</Label>
                  <p className="text-lg">{settings.bidFloorCurrency}</p>
                </div>
              </div>
            )}
          </div>
        ) : (
          // Edit mode
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="space-y-1">
                <Label className="text-base font-medium">Enable Bid Floor</Label>
                <p className="text-sm text-gray-600">
                  Set a minimum bid amount that advertisers must meet to access this campaign
                </p>
              </div>
              <Switch
                checked={settings.bidFloorEnabled}
                onCheckedChange={(enabled) => setSettings({ 
                  ...settings, 
                  bidFloorEnabled: enabled,
                  minimumBidFloor: enabled ? getRecommendedBidFloor() : 0
                })}
              />
            </div>

            {settings.bidFloorEnabled && (
              <>
                <div>
                  <Label htmlFor="bidFloorCurrency">Currency</Label>
                  <Select
                    value={settings.bidFloorCurrency}
                    onValueChange={(value) => setSettings({ 
                      ...settings, 
                      bidFloorCurrency: value as "USD" | "EUR" | "GBP" 
                    })}
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

                <div>
                  <Label htmlFor="minimumBidFloor">Minimum Bid Floor</Label>
                  <div className="flex gap-2 mt-1">
                    <Input
                      id="minimumBidFloor"
                      type="number"
                      step="0.01"
                      min="0"
                      value={settings.minimumBidFloor}
                      onChange={(e) => setSettings({ 
                        ...settings, 
                        minimumBidFloor: parseFloat(e.target.value) || 0 
                      })}
                      placeholder="0.00"
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setSettings({ 
                        ...settings, 
                        minimumBidFloor: getRecommendedBidFloor() 
                      })}
                      className="flex items-center gap-1"
                    >
                      <TrendingUp className="w-4 h-4" />
                      Use Recommended
                    </Button>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    Recommended for {vertical}: ${getRecommendedBidFloor().toFixed(2)}
                  </p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div className="space-y-2">
                      <h4 className="font-medium text-blue-900">Bid Floor Impact</h4>
                      <ul className="text-sm text-blue-800 space-y-1">
                        <li>• Advertisers must bid at or above this amount</li>
                        <li>• Higher floors improve quality but may reduce volume</li>
                        <li>• Changes take effect immediately</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </>
            )}

            <div className="flex gap-2">
              <Button onClick={handleSave} className="flex items-center gap-2">
                <Save className="w-4 h-4" />
                Save Changes
              </Button>
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BidFloorSettings;
