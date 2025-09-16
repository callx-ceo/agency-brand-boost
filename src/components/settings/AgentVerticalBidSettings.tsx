import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DollarSign, AlertCircle } from 'lucide-react';
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
  "Legal",
  "Solar"
];

// System minimum bids per vertical (set by admin)
const MINIMUM_BIDS = {
  "Final Expense": 45,
  "Medicare": 35,
  "Auto Insurance": 30,
  "Home Insurance": 25,
  "Health Insurance": 40,
  "Life Insurance": 50,
  "Debt Settlement": 20,
  "Home Services": 15,
  "Legal": 55,
  "Solar": 65
};

interface VerticalBid {
  vertical: string;
  bidAmount: number;
  isValid?: boolean;
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
      const minBid = getMinimumBid(vertical);
      const currentAmount = existingBid?.bidAmount || getDefaultBidAmount(vertical);
      return {
        vertical,
        bidAmount: currentAmount,
        isValid: currentAmount >= minBid
      };
    });
  });

  const { toast } = useToast();

  function getMinimumBid(vertical: string): number {
    return MINIMUM_BIDS[vertical] || 25;
  }

  function getDefaultBidAmount(vertical: string): number {
    const minBid = getMinimumBid(vertical);
    // Default to 20% above minimum bid
    return Math.ceil(minBid * 1.2);
  }

  const handleBidChange = (vertical: string, newBid: string) => {
    const bidAmount = parseFloat(newBid) || 0;
    const minBid = getMinimumBid(vertical);
    const isValid = bidAmount >= minBid;
    
    setBidSettings(prev => prev.map(bid => 
      bid.vertical === vertical ? { ...bid, bidAmount, isValid } : bid
    ));
  };

  const handleSave = () => {
    const invalidBids = bidSettings.filter(bid => !bid.isValid);
    
    if (invalidBids.length > 0) {
      toast({
        title: "Invalid Bid Amounts",
        description: `Please fix bids below minimum for: ${invalidBids.map(bid => bid.vertical).join(', ')}`,
        variant: "destructive"
      });
      return;
    }

    onUpdate?.(bidSettings);
    toast({
      title: "Bid Settings Updated", 
      description: `Updated bid amounts for ${bidSettings.length} vertical(s)`,
    });
  };

  const setMinimumBid = (vertical: string) => {
    const minBid = getMinimumBid(vertical);
    handleBidChange(vertical, minBid.toString());
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
          Set your bid amounts for each vertical. Must meet or exceed minimum bids.
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
          Set your bid amounts for each vertical. Must meet or exceed minimum bids to receive calls.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          {bidSettings.map((bid) => {
            const minBid = getMinimumBid(bid.vertical);
            const isValid = bid.isValid !== false;
            
            return (
              <div key={bid.vertical} className={`p-4 border rounded-lg ${!isValid ? 'border-destructive bg-destructive/5' : 'border-border'}`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <Label className="font-medium">{bid.vertical}</Label>
                    <div className="space-y-1 mt-1">
                      <p className="text-sm text-muted-foreground">
                        Minimum: ${minBid} • Suggested: ${getDefaultBidAmount(bid.vertical)}
                      </p>
                      {!isValid && (
                        <div className="flex items-center gap-1 text-sm text-destructive">
                          <AlertCircle className="w-3 h-3" />
                          Bid must be at least ${minBid}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setMinimumBid(bid.vertical)}
                      className="text-xs px-2 h-7"
                    >
                      Use Min
                    </Button>
                    <div className="flex items-center gap-1">
                      <span className="text-sm">$</span>
                      <Input
                        type="number"
                        min={minBid}
                        step="0.01"
                        value={bid.bidAmount}
                        onChange={(e) => handleBidChange(bid.vertical, e.target.value)}
                        className={`w-24 ${!isValid ? 'border-destructive focus:border-destructive' : ''}`}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
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

        <div className="flex items-center gap-3">
          <Button onClick={handleSave} className="flex-1">
            Save Bid Settings
          </Button>
          {bidSettings.some(bid => bid.isValid === false) && (
            <div className="flex items-center gap-1 text-sm text-destructive">
              <AlertCircle className="w-4 h-4" />
              Fix invalid bids
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};