import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, DollarSign, MapPin, Target } from "lucide-react";
import { toast } from "sonner";

interface VerticalBid {
  vertical: string;
  bidAmount: number;
  isValid?: boolean;
}

interface TeamMember {
  id: string;
  name: string;
  email: string;
  agency: string;
  status: "active" | "pending" | "inactive";
  performance: string;
  onlineTime: string;
  callTime: string;
  lastLogin: string;
  verticals: string[];
  bids: VerticalBid[];
  targetStates: string[];
}

interface TeamMemberDetailViewProps {
  member: TeamMember;
  onBack: () => void;
}

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

const MINIMUM_BIDS: Record<string, number> = {
  "Final Expense": 8.00,
  "Medicare": 12.00,
  "Auto Insurance": 6.00,
  "Home Insurance": 7.00,
  "Health Insurance": 10.00,
  "Life Insurance": 9.00,
  "Debt Settlement": 15.00,
  "Home Services": 5.00,
  "Legal": 20.00
};

const US_STATES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado",
  "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho",
  "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana",
  "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota",
  "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada",
  "New Hampshire", "New Jersey", "New Mexico", "New York",
  "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon",
  "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
  "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington",
  "West Virginia", "Wisconsin", "Wyoming"
];

export const TeamMemberDetailView: React.FC<TeamMemberDetailViewProps> = ({ member, onBack }) => {
  const [selectedVerticals, setSelectedVerticals] = useState<string[]>(member.verticals);
  const [bidSettings, setBidSettings] = useState<VerticalBid[]>(member.bids);
  const [targetStates, setTargetStates] = useState<string[]>(member.targetStates);

  const handleVerticalToggle = (vertical: string) => {
    setSelectedVerticals(prev =>
      prev.includes(vertical)
        ? prev.filter(v => v !== vertical)
        : [...prev, vertical]
    );
  };

  const handleBidChange = (vertical: string, value: string) => {
    const amount = parseFloat(value) || 0;
    const minBid = MINIMUM_BIDS[vertical] || 0;
    
    setBidSettings(prev => {
      const existing = prev.find(b => b.vertical === vertical);
      if (existing) {
        return prev.map(b =>
          b.vertical === vertical
            ? { ...b, bidAmount: amount, isValid: amount >= minBid }
            : b
        );
      } else {
        return [...prev, { vertical, bidAmount: amount, isValid: amount >= minBid }];
      }
    });
  };

  const handleStateToggle = (state: string) => {
    setTargetStates(prev =>
      prev.includes(state)
        ? prev.filter(s => s !== state)
        : [...prev, state]
    );
  };

  const handleSaveVerticals = () => {
    toast.success("Vertical preferences saved successfully");
  };

  const handleSaveBids = () => {
    const invalidBids = bidSettings.filter(b => !b.isValid);
    if (invalidBids.length > 0) {
      toast.error("Please fix invalid bid amounts before saving");
      return;
    }
    toast.success("Bid prices updated successfully");
  };

  const handleSaveStates = () => {
    toast.success("Target states updated successfully");
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      active: "bg-green-500",
      pending: "bg-yellow-500",
      inactive: "bg-gray-500"
    };
    return (
      <Badge className={`${colors[status as keyof typeof colors] || colors.inactive} text-white`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Agents
        </Button>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{member.name}</h1>
          <p className="text-muted-foreground">{member.agency}</p>
        </div>
        {getStatusBadge(member.status)}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-sm text-muted-foreground mb-1">Performance</div>
            <div className="text-2xl font-bold">{member.performance}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-sm text-muted-foreground mb-1">Online Time</div>
            <div className="text-2xl font-bold">{member.onlineTime}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-sm text-muted-foreground mb-1">Call Time</div>
            <div className="text-2xl font-bold">{member.callTime}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-sm text-muted-foreground mb-1">Last Login</div>
            <div className="text-2xl font-bold">{member.lastLogin}</div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="verticals" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="verticals" className="flex items-center gap-2">
            <Target className="w-4 h-4" />
            VERTICALS
          </TabsTrigger>
          <TabsTrigger value="bids" className="flex items-center gap-2">
            <DollarSign className="w-4 h-4" />
            BID PRICES
          </TabsTrigger>
          <TabsTrigger value="states" className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            TARGET STATES
          </TabsTrigger>
        </TabsList>

        {/* Verticals Tab */}
        <TabsContent value="verticals" className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Vertical Assignments
                  </h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    Select which verticals this agent can handle calls for. They'll only receive calls from campaigns matching their selected verticals.
                  </p>
                </div>

                <div>
                  <h4 className="font-medium mb-4">Available Verticals</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {AVAILABLE_VERTICALS.map((vertical) => (
                      <div key={vertical} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <Checkbox
                            id={vertical}
                            checked={selectedVerticals.includes(vertical)}
                            onCheckedChange={() => handleVerticalToggle(vertical)}
                          />
                          <Label htmlFor={vertical} className="cursor-pointer font-normal">
                            {vertical}
                          </Label>
                        </div>
                        {selectedVerticals.includes(vertical) && (
                          <Badge variant="secondary">Active</Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Selected Verticals</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    {selectedVerticals.length} vertical(s) selected
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {selectedVerticals.map((vertical) => (
                      <Badge key={vertical} className="bg-primary text-primary-foreground">
                        {vertical}
                      </Badge>
                    ))}
                    {selectedVerticals.length === 0 && (
                      <span className="text-sm text-muted-foreground">No verticals selected</span>
                    )}
                  </div>
                </div>

                <Button onClick={handleSaveVerticals} className="w-full">
                  Save Vertical Preferences
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Bid Prices Tab */}
        <TabsContent value="bids" className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                    <DollarSign className="w-5 h-5" />
                    Bid Price Configuration
                  </h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    Set your bid prices for each vertical. Higher bids increase your chances of receiving calls.
                  </p>
                </div>

                <div className="space-y-4">
                  {selectedVerticals.map((vertical) => {
                    const bid = bidSettings.find(b => b.vertical === vertical);
                    const minBid = MINIMUM_BIDS[vertical] || 0;
                    const isValid = bid ? bid.isValid : false;

                    return (
                      <div key={vertical} className="p-4 border rounded-lg space-y-2">
                        <div className="flex items-center justify-between">
                          <Label className="font-medium">{vertical}</Label>
                          <span className="text-sm text-muted-foreground">
                            Min: ${minBid.toFixed(2)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="relative flex-1">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                              $
                            </span>
                            <Input
                              type="number"
                              step="0.01"
                              min={minBid}
                              value={bid?.bidAmount || ""}
                              onChange={(e) => handleBidChange(vertical, e.target.value)}
                              className={`pl-7 ${!isValid && bid ? 'border-red-500' : ''}`}
                              placeholder={minBid.toFixed(2)}
                            />
                          </div>
                          {bid && (
                            <Badge variant={isValid ? "secondary" : "destructive"}>
                              {isValid ? "Valid" : "Too Low"}
                            </Badge>
                          )}
                        </div>
                        {bid && !isValid && (
                          <p className="text-xs text-red-500">
                            Bid must be at least ${minBid.toFixed(2)}
                          </p>
                        )}
                      </div>
                    );
                  })}
                  {selectedVerticals.length === 0 && (
                    <p className="text-center text-muted-foreground py-8">
                      Please select verticals first to configure bid prices
                    </p>
                  )}
                </div>

                {selectedVerticals.length > 0 && (
                  <div className="p-4 bg-muted rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Estimated Weekly Spend</span>
                      <span className="text-2xl font-bold">
                        ${(bidSettings.reduce((sum, b) => sum + b.bidAmount, 0) * 50).toFixed(2)}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Based on average of 50 calls per week per vertical
                    </p>
                  </div>
                )}

                <Button
                  onClick={handleSaveBids}
                  className="w-full"
                  disabled={selectedVerticals.length === 0}
                >
                  Save Bid Configuration
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Target States Tab */}
        <TabsContent value="states" className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Target States
                  </h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    Select which states this agent is licensed to operate in. They'll only receive calls from these states.
                  </p>
                </div>

                <div className="flex gap-2 mb-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setTargetStates(US_STATES)}
                  >
                    Select All
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setTargetStates([])}
                  >
                    Clear All
                  </Button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {US_STATES.map((state) => (
                    <div
                      key={state}
                      className="flex items-center gap-2 p-2 border rounded hover:bg-muted/50 cursor-pointer"
                      onClick={() => handleStateToggle(state)}
                    >
                      <Checkbox
                        id={state}
                        checked={targetStates.includes(state)}
                        onCheckedChange={() => handleStateToggle(state)}
                      />
                      <Label htmlFor={state} className="cursor-pointer text-sm font-normal">
                        {state}
                      </Label>
                    </div>
                  ))}
                </div>

                <div className="p-4 bg-muted rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">States Selected</span>
                    <span className="text-2xl font-bold">{targetStates.length}</span>
                  </div>
                </div>

                <Button onClick={handleSaveStates} className="w-full">
                  Save Target States
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
