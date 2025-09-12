import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DollarSign } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AVAILABLE_VERTICALS = [
  "Final Expense",
  "Medicare", 
  "Auto Insurance",
  "Home Insurance",
  "Health Insurance",
  "Life Insurance",
  "Debt Settlement",
  "Home Services",
  "Legal"
];

interface VerticalBid {
  vertical: string;
  bidAmount: number;
}

interface AgentVerticalBidSettingsProps {
  selectedVerticals: string[];
  currentBids?: VerticalBid[];
  onUpdate?: (bids: VerticalBid[]) => void;
}

export const AgentVerticalBidSettings: React.FC<AgentVerticalBidSettingsProps> = ({
  selectedVerticals,
  currentBids = [],
  onUpdate
}) => {
  const [bidSettings, setBidSettings] = useState<VerticalBid[]>(() => {
    // Initialize bid settings for selected verticals
    return selectedVerticals.map(vertical => {
      const existingBid = currentBids.find(bid => bid.vertical === vertical);
      return {
        vertical,
        bidAmount: existingBid?.bidAmount || getDefaultBidAmount(vertical)
      };
    });
  });

  const { toast } = useToast();

  function getDefaultBidAmount(vertical: string): number {
    const defaults: Record<string, number> = {
      "Final Expense": 65,
      "Medicare": 50,
      "Auto Insurance": 45,
      "Home Insurance": 40,
      "Health Insurance": 55,
      "Life Insurance": 60,
      "Debt Settlement": 35,
      "Home Services": 30,
      "Legal": 70
    };
    return defaults[vertical] || 50;
  }

  const handleBidChange = (vertical: string, newBid: string) => {
    const bidAmount = parseFloat(newBid) || 0;
    setBidSettings(prev => prev.map(bid => 
      bid.vertical === vertical ? { ...bid, bidAmount } : bid
    ));
  };

  const handleSave = () => {
    onUpdate?.(bidSettings);
    toast({
      title: "Bid Settings Updated", 
      description: `Updated bid amounts for ${bidSettings.length} vertical(s)`,
    });
  };

  if (selectedVerticals.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="w-5 h-5" />
            Bid Settings by Vertical
          </CardTitle>
          <CardDescription>
            Configure your bid amounts for each vertical you work with.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            Please select verticals first to configure bid settings.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="w-5 h-5" />
          Bid Settings by Vertical
        </CardTitle>
        <CardDescription>
          Set your bid amounts for each vertical. Higher bids may result in more call volume.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          {bidSettings.map((bid) => (
            <div key={bid.vertical} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex-1">
                <Label className="font-medium">{bid.vertical}</Label>
                <p className="text-sm text-muted-foreground">
                  Recommended: ${getDefaultBidAmount(bid.vertical)}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm">$</span>
                <Input
                  type="number"
                  min="0"
                  step="0.01"
                  value={bid.bidAmount}
                  onChange={(e) => handleBidChange(bid.vertical, e.target.value)}
                  className="w-24"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t">
          <div className="mb-4">
            <h4 className="font-medium mb-2">Total Estimated Weekly Spend</h4>
            <div className="text-2xl font-bold text-primary">
              ${bidSettings.reduce((total, bid) => total + (bid.bidAmount * 20), 0).toFixed(2)}
            </div>
            <p className="text-sm text-muted-foreground">
              Based on average of 20 calls per week per vertical
            </p>
          </div>
        </div>

        <Button onClick={handleSave} className="w-full">
          Save Bid Settings
        </Button>
      </CardContent>
    </Card>
  );
};