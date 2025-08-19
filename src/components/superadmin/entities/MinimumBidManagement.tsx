import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { DollarSign } from "lucide-react";
import { toast } from "sonner";

interface MinimumBid {
  verticalId: string;
  verticalName: string;
  minBid: number;
}

const MinimumBidManagement = ({ onBackToDashboard }: { onBackToDashboard: () => void }) => {
  const [minimumBids, setMinimumBids] = useState<MinimumBid[]>([
    { verticalId: 'final_expense', verticalName: 'Final Expense', minBid: 2.00 },
    { verticalId: 'auto_insurance', verticalName: 'Auto Insurance', minBid: 1.50 },
    { verticalId: 'health_insurance', verticalName: 'Health Insurance', minBid: 2.50 },
    { verticalId: 'medicare', verticalName: 'Medicare', minBid: 2.00 },
    { verticalId: 'life_insurance', verticalName: 'Life Insurance', minBid: 1.75 },
    { verticalId: 'home_insurance', verticalName: 'Home Insurance', minBid: 1.25 }
  ]);

  const [hasChanges, setHasChanges] = useState(false);

  const handleBidChange = (verticalId: string, newBid: string) => {
    const bidValue = parseFloat(newBid) || 0;
    setMinimumBids(prev => 
      prev.map(bid => 
        bid.verticalId === verticalId 
          ? { ...bid, minBid: bidValue }
          : bid
      )
    );
    setHasChanges(true);
  };

  const handleSave = () => {
    // Here you would typically save to your database
    console.log('Saving minimum bids:', minimumBids);
    toast.success("Minimum bid requirements updated successfully");
    setHasChanges(false);
  };

  const handleReset = () => {
    // Reset to original values or fetch from API
    setMinimumBids([
      { verticalId: 'final_expense', verticalName: 'Final Expense', minBid: 2.00 },
      { verticalId: 'auto_insurance', verticalName: 'Auto Insurance', minBid: 1.50 },
      { verticalId: 'health_insurance', verticalName: 'Health Insurance', minBid: 2.50 },
      { verticalId: 'medicare', verticalName: 'Medicare', minBid: 2.00 },
      { verticalId: 'life_insurance', verticalName: 'Life Insurance', minBid: 1.75 },
      { verticalId: 'home_insurance', verticalName: 'Home Insurance', minBid: 1.25 }
    ]);
    setHasChanges(false);
    toast.info("Minimum bids reset to defaults");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Minimum Bid Management</h1>
          <p className="text-muted-foreground">
            Configure minimum bid requirements for each vertical
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={handleReset}
            disabled={!hasChanges}
          >
            Reset
          </Button>
          <Button 
            onClick={handleSave}
            disabled={!hasChanges}
          >
            Save Changes
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Vertical Minimum Bids</CardTitle>
          <CardDescription>
            Set the minimum bid amounts that agents must meet for each vertical. 
            These requirements will be enforced across all agencies.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {minimumBids.map((bid) => (
              <div key={bid.verticalId} className="space-y-2">
                <Label htmlFor={`min-bid-${bid.verticalId}`} className="text-sm font-medium">
                  {bid.verticalName}
                </Label>
                <div className="relative">
                  <DollarSign className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id={`min-bid-${bid.verticalId}`}
                    type="number"
                    step="0.01"
                    min="0"
                    value={bid.minBid}
                    onChange={(e) => handleBidChange(bid.verticalId, e.target.value)}
                    className="pl-8"
                    placeholder="0.00"
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Impact & Guidelines</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">What This Affects</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Agent maximum bid settings</li>
                <li>• Campaign bid floor validation</li>
                <li>• Offer bid requirements</li>
                <li>• Publisher payout calculations</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Best Practices</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Consider market rates for each vertical</li>
                <li>• Leave room for competitive bidding</li>
                <li>• Review and adjust quarterly</li>
                <li>• Monitor impact on conversion rates</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MinimumBidManagement;