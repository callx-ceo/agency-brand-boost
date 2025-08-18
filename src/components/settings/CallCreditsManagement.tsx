
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { Plus, Gift, DollarSign, Users, Calendar, Settings, Shield, Target, Phone, MapPin } from "lucide-react";
import BulkBonusDialog from "./BulkBonusDialog";

const verticals = [
  { id: 'final_expense', name: 'Final Expense', color: 'bg-purple-100 text-purple-800' },
  { id: 'auto_insurance', name: 'Auto Insurance', color: 'bg-blue-100 text-blue-800' },
  { id: 'health_insurance', name: 'Health Insurance', color: 'bg-green-100 text-green-800' },
  { id: 'medicare', name: 'Medicare', color: 'bg-orange-100 text-orange-800' }
];

const states = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware',
  'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
  'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
  'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico',
  'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania',
  'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
  'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
];

// Mock data for agents with vertical settings
const mockAgentBalances = [
  {
    agentId: "agent_user_123",
    agentName: "John Doe",
    agentEmail: "john.doe@example.com",
    baseBalance: 100.00,
    bonusBalance: 25.00,
    usedAmount: 67.50,
    remainingBalance: 57.50,
    dailyBudget: 50.00,
    maxCallsPerDay: 25,
    verticals: {
      final_expense: { 
        enabled: true, 
        maxBid: 2.50, 
        states: ['California', 'Texas', 'Florida'] 
      },
      auto_insurance: { 
        enabled: true, 
        maxBid: 1.75, 
        states: ['California', 'Nevada'] 
      },
      health_insurance: { 
        enabled: false, 
        maxBid: 3.00, 
        states: [] 
      },
      medicare: { 
        enabled: true, 
        maxBid: 2.25, 
        states: ['California', 'Texas'] 
      }
    }
  },
  {
    agentId: "agent_user_456",
    agentName: "Jane Smith",
    agentEmail: "jane.smith@example.com",
    baseBalance: 50.00,
    bonusBalance: 0.00,
    usedAmount: 32.75,
    remainingBalance: 17.25,
    dailyBudget: 30.00,
    maxCallsPerDay: 15,
    verticals: {
      final_expense: { 
        enabled: true, 
        maxBid: 2.00, 
        states: ['Texas', 'Arizona'] 
      },
      auto_insurance: { 
        enabled: false, 
        maxBid: 1.50, 
        states: [] 
      },
      health_insurance: { 
        enabled: true, 
        maxBid: 2.75, 
        states: ['Texas'] 
      },
      medicare: { 
        enabled: false, 
        maxBid: 2.00, 
        states: [] 
      }
    }
  }
];

const CallCreditsManagement = () => {
  const [selectedAgent, setSelectedAgent] = useState<string>("");
  const [bonusAmount, setBonusAmount] = useState<string>("");
  const [bulkDialogOpen, setBulkDialogOpen] = useState(false);
  const [editingAgent, setEditingAgent] = useState<string>("");
  const [editingVertical, setEditingVertical] = useState<string>("");
  const [newMaxBid, setNewMaxBid] = useState<string>("");
  const [newDailyBudget, setNewDailyBudget] = useState<string>("");
  const [newMaxCalls, setNewMaxCalls] = useState<string>("");
  const [editingStates, setEditingStates] = useState<string[]>([]);
  const [stateMode, setStateMode] = useState<"all" | "specific">("specific");

  const currentBillingPeriod = "December 2024";

  const handleAllocateBonus = () => {
    if (!selectedAgent || !bonusAmount) {
      toast.error("Please select an agent and enter bonus amount");
      return;
    }
    
    toast.success(`Allocated $${bonusAmount} bonus to ${mockAgentBalances.find(a => a.agentId === selectedAgent)?.agentName}`);
    setBonusAmount("");
    setSelectedAgent("");
  };

  const handleUpdateDailySettings = (agentId: string) => {
    if (!newDailyBudget && !newMaxCalls) {
      toast.error("Please enter daily budget or max calls");
      return;
    }

    const agent = mockAgentBalances.find(a => a.agentId === agentId);
    if (agent) {
      toast.success(`Updated daily settings for ${agent.agentName}`);
      setEditingAgent("");
      setNewDailyBudget("");
      setNewMaxCalls("");
    }
  };

  const handleUpdateVerticalBid = (agentId: string, verticalId: string) => {
    if (!newMaxBid || parseFloat(newMaxBid) <= 0) {
      toast.error("Please enter a valid max bid amount");
      return;
    }

    const agent = mockAgentBalances.find(a => a.agentId === agentId);
    if (agent) {
      toast.success(`Updated ${verticals.find(v => v.id === verticalId)?.name} max bid to $${newMaxBid} for ${agent.agentName}`);
      setEditingAgent("");
      setEditingVertical("");
      setNewMaxBid("");
    }
  };

  const handleUpdateStates = (agentId: string, verticalId: string) => {
    const agent = mockAgentBalances.find(a => a.agentId === agentId);
    const vertical = verticals.find(v => v.id === verticalId);
    if (agent && vertical) {
      const stateText = stateMode === "all" ? "All US" : `${editingStates.length} states`;
      toast.success(`Updated ${vertical.name} licensing states (${stateText}) for ${agent.agentName}`);
      setEditingAgent("");
      setEditingVertical("");
      setEditingStates([]);
    }
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="verticals">Verticals & States</TabsTrigger>
          <TabsTrigger value="limits">Daily Limits</TabsTrigger>
          <TabsTrigger value="bonuses">Bonuses</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Agent Call Management Overview</CardTitle>
              <CardDescription className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Usage tracked for billing period: {currentBillingPeriod}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Agent Name</TableHead>
                    <TableHead>Daily Budget</TableHead>
                    <TableHead>Max Calls/Day</TableHead>
                    <TableHead>Remaining Balance</TableHead>
                    <TableHead>Active Verticals</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockAgentBalances.map((agent) => (
                    <TableRow key={agent.agentId}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{agent.agentName}</div>
                          <div className="text-sm text-gray-500">{agent.agentEmail}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium">${agent.dailyBudget.toFixed(2)}</span>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium">{agent.maxCallsPerDay} calls</span>
                      </TableCell>
                      <TableCell>
                        <span className={`font-medium ${
                          agent.remainingBalance < 20 ? 'text-red-600' : 
                          agent.remainingBalance < 50 ? 'text-yellow-600' : 'text-green-600'
                        }`}>
                          ${agent.remainingBalance.toFixed(2)}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1 flex-wrap">
                          {Object.entries(agent.verticals)
                            .filter(([_, config]) => config.enabled)
                            .map(([verticalId, _]) => {
                              const vertical = verticals.find(v => v.id === verticalId);
                              return vertical ? (
                                <span key={verticalId} className={`px-2 py-1 text-xs rounded-full ${vertical.color}`}>
                                  {vertical.name}
                                </span>
                              ) : null;
                            })}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline">
                          Configure
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="verticals" className="space-y-6">
          {mockAgentBalances.map((agent) => (
            <Card key={agent.agentId}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  {agent.agentName} - Vertical Configuration
                </CardTitle>
                <CardDescription>
                  Configure which verticals this agent can purchase calls in and their licensing states
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {verticals.map((vertical) => {
                  const config = agent.verticals[vertical.id as keyof typeof agent.verticals];
                  const isEditing = editingAgent === agent.agentId && editingVertical === vertical.id;
                  
                  return (
                    <div key={vertical.id} className="border rounded-lg p-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Checkbox checked={config.enabled} />
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${vertical.color}`}>
                            {vertical.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-gray-600">
                            Max Bid: <span className="font-medium">${config.maxBid.toFixed(2)}</span>
                          </span>
                          <span className="text-sm text-gray-600">
                            States: <span className="font-medium">{config.states.length}</span>
                          </span>
                        </div>
                      </div>
                      
                      {config.enabled && (
                        <div className="pl-8 space-y-3">
                          <div className="flex gap-4 items-end">
                            <div className="flex-1">
                              <Label>Max Bid Per Call</Label>
                              {isEditing ? (
                                <div className="flex gap-2">
                                  <div className="relative">
                                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    <Input
                                      type="number"
                                      step="0.01"
                                      min="0.01"
                                      value={newMaxBid}
                                      onChange={(e) => setNewMaxBid(e.target.value)}
                                      placeholder={config.maxBid.toFixed(2)}
                                      className="w-32 pl-8"
                                    />
                                  </div>
                                  <Button 
                                    size="sm" 
                                    onClick={() => handleUpdateVerticalBid(agent.agentId, vertical.id)}
                                  >
                                    Save
                                  </Button>
                                  <Button 
                                    size="sm" 
                                    variant="outline"
                                    onClick={() => {
                                      setEditingAgent("");
                                      setEditingVertical("");
                                      setNewMaxBid("");
                                    }}
                                  >
                                    Cancel
                                  </Button>
                                </div>
                              ) : (
                                <div className="flex gap-2 items-center">
                                  <span className="text-lg font-medium">${config.maxBid.toFixed(2)}</span>
                                  <Button 
                                    size="sm" 
                                    variant="outline"
                                    onClick={() => {
                                      setEditingAgent(agent.agentId);
                                      setEditingVertical(vertical.id);
                                      setNewMaxBid(config.maxBid.toString());
                                    }}
                                  >
                                    Edit
                                  </Button>
                                </div>
                              )}
                            </div>
                            
                            <div className="flex-1">
                              <Label>Licensed States</Label>
                              <div className="flex gap-2 items-center">
                                <span className="text-sm">
                                  {config.states.length > 0 ? `${config.states.join(', ')}` : 'No states selected'}
                                </span>
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => {
                                    setEditingAgent(agent.agentId);
                                    setEditingVertical(vertical.id);
                                    setEditingStates(config.states);
                                  }}
                                >
                                  <MapPin className="h-4 w-4 mr-1" />
                                  Edit States
                                </Button>
                              </div>
                            </div>
                          </div>
                          
                          {isEditing && editingVertical === vertical.id && (
                            <div className="border-t pt-4 space-y-4">
                              <Label>Select Licensed States</Label>
                              <RadioGroup value={stateMode} onValueChange={(value: "all" | "specific") => setStateMode(value)}>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="all" id="all-us" />
                                  <Label htmlFor="all-us">All US</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="specific" id="specific-states" />
                                  <Label htmlFor="specific-states">Specific States</Label>
                                </div>
                              </RadioGroup>
                              
                              {stateMode === "specific" && (
                                <div>
                                  <div className="flex justify-between items-center mb-2">
                                    <Label>Select States</Label>
                                    <Button 
                                      variant="outline" 
                                      size="sm"
                                      onClick={() => {
                                        const allSelected = editingStates.length === states.length;
                                        setEditingStates(allSelected ? [] : [...states]);
                                      }}
                                    >
                                      {editingStates.length === states.length ? 'Deselect All' : 'Select All'}
                                    </Button>
                                  </div>
                                  <div className="grid grid-cols-4 gap-2 max-h-48 overflow-y-auto border rounded p-3">
                                    {states.map((state) => (
                                      <div key={state} className="flex items-center space-x-2">
                                        <Checkbox
                                          id={`${vertical.id}-${state}`}
                                          checked={editingStates.includes(state)}
                                          onCheckedChange={(checked) => {
                                            if (checked) {
                                              setEditingStates([...editingStates, state]);
                                            } else {
                                              setEditingStates(editingStates.filter(s => s !== state));
                                            }
                                          }}
                                        />
                                        <Label htmlFor={`${vertical.id}-${state}`} className="text-sm">
                                          {state}
                                        </Label>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                              
                              <div className="flex gap-2">
                                <Button onClick={() => handleUpdateStates(agent.agentId, vertical.id)}>
                                  Update States
                                </Button>
                                <Button 
                                  variant="outline"
                                  onClick={() => {
                                    setEditingAgent("");
                                    setEditingVertical("");
                                    setEditingStates([]);
                                  }}
                                >
                                  Cancel
                                </Button>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="limits" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Daily Limits Configuration
              </CardTitle>
              <CardDescription>
                Set daily budget and call volume limits for each agent
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Agent Name</TableHead>
                    <TableHead>Daily Budget</TableHead>
                    <TableHead>Max Calls/Day</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockAgentBalances.map((agent) => (
                    <TableRow key={agent.agentId}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{agent.agentName}</div>
                          <div className="text-sm text-gray-500">{agent.agentEmail}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {editingAgent === agent.agentId ? (
                          <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                              type="number"
                              step="0.01"
                              min="0"
                              value={newDailyBudget}
                              onChange={(e) => setNewDailyBudget(e.target.value)}
                              placeholder={agent.dailyBudget.toFixed(2)}
                              className="w-32 pl-8"
                            />
                          </div>
                        ) : (
                          <span className="font-medium">${agent.dailyBudget.toFixed(2)}</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {editingAgent === agent.agentId ? (
                          <Input
                            type="number"
                            min="1"
                            value={newMaxCalls}
                            onChange={(e) => setNewMaxCalls(e.target.value)}
                            placeholder={agent.maxCallsPerDay.toString()}
                            className="w-24"
                          />
                        ) : (
                          <span className="font-medium">{agent.maxCallsPerDay} calls</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {editingAgent === agent.agentId ? (
                          <div className="flex gap-2">
                            <Button 
                              size="sm" 
                              onClick={() => handleUpdateDailySettings(agent.agentId)}
                            >
                              Save
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => {
                                setEditingAgent("");
                                setNewDailyBudget("");
                                setNewMaxCalls("");
                              }}
                            >
                              Cancel
                            </Button>
                          </div>
                        ) : (
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => {
                              setEditingAgent(agent.agentId);
                              setNewDailyBudget(agent.dailyBudget.toString());
                              setNewMaxCalls(agent.maxCallsPerDay.toString());
                            }}
                          >
                            Edit Limits
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bonuses" className="space-y-6">

          {/* Credit Allocation */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gift className="h-5 w-5" />
                Allocate Bonus Balance
              </CardTitle>
              <CardDescription>
                Provide additional call balance to specific agents as bonuses or incentives
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="agent-select">Select Agent</Label>
                  <select
                    id="agent-select"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={selectedAgent}
                    onChange={(e) => setSelectedAgent(e.target.value)}
                  >
                    <option value="">Choose agent...</option>
                    {mockAgentBalances.map((agent) => (
                      <option key={agent.agentId} value={agent.agentId}>
                        {agent.agentName}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label htmlFor="bonus-amount">Bonus Amount (USD)</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="bonus-amount"
                      type="number"
                      placeholder="0.00"
                      step="0.01"
                      min="0"
                      value={bonusAmount}
                      onChange={(e) => setBonusAmount(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="flex items-end">
                  <Button onClick={handleAllocateBonus} className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Allocate Bonus
                  </Button>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <Button 
                  variant="outline" 
                  onClick={() => setBulkDialogOpen(true)}
                  className="flex items-center gap-2"
                >
                  <Users className="h-4 w-4" />
                  Bulk Allocate Bonus
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <BulkBonusDialog 
        open={bulkDialogOpen}
        onOpenChange={setBulkDialogOpen}
        agents={mockAgentBalances}
      />
    </div>
  );
};

export default CallCreditsManagement;
