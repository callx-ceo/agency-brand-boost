import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, CheckCircle2, DollarSign, MapPin, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { AgentTargetStatesSettings } from '@/components/settings/AgentTargetStatesSettings';

interface VerticalBid {
  vertical: string;
  bidAmount: number;
  isValid?: boolean;
}

interface VerticalTargetStates {
  vertical: string;
  states: string[];
}

interface Agent {
  id: number;
  name: string;
  email?: string;
  agency: string;
  status: string;
  performance: number;
  lastLogin: string;
  onlineTime: string;
  callTime: string;
  verticals: string[];
  bids: VerticalBid[];
  targetStates?: VerticalTargetStates[];
}

interface AgentDetailViewProps {
  agent: Agent;
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

export const AgentDetailView: React.FC<AgentDetailViewProps> = ({ agent, onBack }) => {
  const [selectedVerticals, setSelectedVerticals] = useState<string[]>(agent.verticals || []);
  const [bidSettings, setBidSettings] = useState<VerticalBid[]>(agent.bids || []);
  const [targetStates, setTargetStates] = useState<VerticalTargetStates[]>(agent.targetStates || []);
  const { toast } = useToast();

  const handleVerticalToggle = (vertical: string) => {
    setSelectedVerticals(prev =>
      prev.includes(vertical)
        ? prev.filter(v => v !== vertical)
        : [...prev, vertical]
    );
  };

  const handleTargetStatesUpdate = (updatedStates: VerticalTargetStates[]) => {
    setTargetStates(updatedStates);
    toast({
      title: "States Updated",
      description: `Saved target states for ${agent.name}`,
    });
  };

  const handleBidChange = (vertical: string, value: string) => {
    const numValue = parseFloat(value) || 0;
    const minBid = MINIMUM_BIDS[vertical] || 0;
    
    setBidSettings(prev => {
      const existing = prev.find(b => b.vertical === vertical);
      if (existing) {
        return prev.map(b =>
          b.vertical === vertical
            ? { ...b, bidAmount: numValue, isValid: numValue >= minBid }
            : b
        );
      } else {
        return [...prev, { vertical, bidAmount: numValue, isValid: numValue >= minBid }];
      }
    });
  };

  const handleSaveVerticals = () => {
    toast({
      title: "Verticals Updated",
      description: `Saved ${selectedVerticals.length} vertical(s) for ${agent.name}`,
    });
  };

  const handleSaveBids = () => {
    const invalidBids = bidSettings.filter(b => !b.isValid);
    if (invalidBids.length > 0) {
      toast({
        title: "Invalid Bids",
        description: "Please ensure all bids meet minimum requirements",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Bids Updated",
      description: `Updated bid settings for ${agent.name}`,
    });
  };


  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active": return <Badge variant="default" className="bg-green-100 text-green-800">Active</Badge>;
      case "pending": return <Badge variant="outline" className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case "suspended": return <Badge variant="destructive">Suspended</Badge>;
      default: return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Agents
          </Button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold">{agent.name}</h1>
              {getStatusBadge(agent.status)}
            </div>
            <p className="text-muted-foreground">{agent.agency}</p>
          </div>
        </div>
      </div>


      {/* Settings Tabs */}
      <Tabs defaultValue="verticals" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="verticals">
            <CheckCircle2 className="h-4 w-4 mr-2" />
            Verticals
          </TabsTrigger>
          <TabsTrigger value="bids">
            <DollarSign className="h-4 w-4 mr-2" />
            Bid Prices
          </TabsTrigger>
          <TabsTrigger value="states">
            <MapPin className="h-4 w-4 mr-2" />
            Target States
          </TabsTrigger>
        </TabsList>

        {/* Verticals Tab */}
        <TabsContent value="verticals">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5" />
                Vertical Assignments
              </CardTitle>
              <CardDescription>
                Select which verticals this agent can handle calls for. They'll only receive calls from campaigns matching their selected verticals.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label className="text-sm font-medium">Available Verticals</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {AVAILABLE_VERTICALS.map((vertical) => (
                    <div key={vertical} className="flex items-center space-x-3">
                      <Checkbox
                        id={vertical}
                        checked={selectedVerticals.includes(vertical)}
                        onCheckedChange={() => handleVerticalToggle(vertical)}
                      />
                      <Label 
                        htmlFor={vertical}
                        className="text-sm font-normal cursor-pointer flex-1"
                      >
                        {vertical}
                      </Label>
                      {selectedVerticals.includes(vertical) && (
                        <Badge variant="secondary" className="text-xs">
                          Active
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Selected Verticals</p>
                    <p className="text-xs text-muted-foreground">
                      {selectedVerticals.length === 0 
                        ? "No verticals selected - agent won't receive any calls"
                        : `${selectedVerticals.length} vertical(s) selected`
                      }
                    </p>
                  </div>
                  <div className="flex gap-2">
                    {selectedVerticals.slice(0, 3).map((vertical) => (
                      <Badge key={vertical} variant="default" className="text-xs">
                        {vertical}
                      </Badge>
                    ))}
                    {selectedVerticals.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{selectedVerticals.length - 3}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              <Button onClick={handleSaveVerticals} className="w-full">
                Save Vertical Preferences
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Bids Tab */}
        <TabsContent value="bids">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Bid Price Settings
              </CardTitle>
              <CardDescription>
                Set bid amounts for each vertical. Higher bids increase call priority but also cost more per call.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {selectedVerticals.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <p className="text-sm">No verticals assigned to this agent.</p>
                  <p className="text-xs mt-1">Assign verticals first to set bid prices.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {selectedVerticals.map((vertical) => {
                    const currentBid = bidSettings.find(b => b.vertical === vertical);
                    const minBid = MINIMUM_BIDS[vertical] || 0;
                    const isValid = currentBid ? currentBid.bidAmount >= minBid : false;
                    const suggestedBid = minBid * 1.2;

                    return (
                      <Card key={vertical}>
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-sm font-medium">{vertical}</CardTitle>
                            <Badge variant="outline" className="text-xs">
                              Min: ${minBid.toFixed(2)}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <Label htmlFor={`bid-${vertical}`} className="text-xs">
                              Your Bid Amount
                            </Label>
                            <div className="flex gap-2 items-center">
                              <div className="relative flex-1">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                                  $
                                </span>
                                <Input
                                  id={`bid-${vertical}`}
                                  type="number"
                                  step="0.01"
                                  min={minBid}
                                  value={currentBid?.bidAmount || minBid}
                                  onChange={(e) => handleBidChange(vertical, e.target.value)}
                                  className={`pl-7 ${!isValid ? 'border-destructive' : ''}`}
                                />
                              </div>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleBidChange(vertical, minBid.toString())}
                              >
                                Set Min
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleBidChange(vertical, suggestedBid.toFixed(2))}
                              >
                                Suggested
                              </Button>
                            </div>
                            {!isValid && currentBid && (
                              <p className="text-xs text-destructive">
                                Must be at least ${minBid.toFixed(2)}
                              </p>
                            )}
                            <p className="text-xs text-muted-foreground">
                              Suggested bid: ${suggestedBid.toFixed(2)} (20% above minimum)
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              )}

              {selectedVerticals.length > 0 && (
                <div className="pt-4 border-t space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">Estimated Weekly Spend</span>
                    <span className="text-lg font-semibold">
                      ${bidSettings.reduce((sum, bid) => sum + (bid.bidAmount * 50), 0).toFixed(2)}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Based on ~50 calls per vertical per week
                  </p>
                  <Button onClick={handleSaveBids} className="w-full">
                    Save Bid Settings
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* States Tab */}
        <TabsContent value="states">
          <AgentTargetStatesSettings
            selectedVerticals={selectedVerticals}
            currentTargetStates={targetStates}
            onUpdate={handleTargetStatesUpdate}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};
