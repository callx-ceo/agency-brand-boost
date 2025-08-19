import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Plus, Gift, DollarSign, Users, Calendar, Settings, Target, Phone, MapPin, Search, Edit } from "lucide-react";
import BulkBonusDialog from "./BulkBonusDialog";

const verticals = [
  { id: 'final_expense', name: 'Final Expense', color: 'bg-purple-100 text-purple-800' },
  { id: 'auto_insurance', name: 'Auto Insurance', color: 'bg-blue-100 text-blue-800' },
  { id: 'health_insurance', name: 'Health Insurance', color: 'bg-green-100 text-green-800' },
  { id: 'medicare', name: 'Medicare', color: 'bg-orange-100 text-orange-800' },
  { id: 'life_insurance', name: 'Life Insurance', color: 'bg-red-100 text-red-800' },
  { id: 'home_insurance', name: 'Home Insurance', color: 'bg-teal-100 text-teal-800' }
];

// Mock function to get minimum bids - in real app this would be an API call
const getMinimumBids = () => {
  return {
    'final_expense': 2.00,
    'auto_insurance': 1.50,
    'health_insurance': 2.50,
    'medicare': 2.00,
    'life_insurance': 1.75,
    'home_insurance': 1.25
  };
};

const states = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware',
  'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
  'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
  'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico',
  'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania',
  'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
  'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
];

// Mock data for agents with all settings
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
      final_expense: { enabled: true, maxBid: 2.50, states: ['California', 'Texas', 'Florida'] },
      auto_insurance: { enabled: true, maxBid: 1.75, states: ['California', 'Nevada'] },
      health_insurance: { enabled: false, maxBid: 3.00, states: [] },
      medicare: { enabled: true, maxBid: 2.25, states: ['California', 'Texas'] },
      life_insurance: { enabled: false, maxBid: 1.75, states: [] },
      home_insurance: { enabled: false, maxBid: 1.25, states: [] }
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
      final_expense: { enabled: true, maxBid: 2.00, states: ['Texas', 'Arizona'] },
      auto_insurance: { enabled: false, maxBid: 1.50, states: [] },
      health_insurance: { enabled: true, maxBid: 2.75, states: ['Texas'] },
      medicare: { enabled: false, maxBid: 2.00, states: [] },
      life_insurance: { enabled: false, maxBid: 1.75, states: [] },
      home_insurance: { enabled: false, maxBid: 1.25, states: [] }
    }
  },
  {
    agentId: "agent_user_789",
    agentName: "Michael Johnson",
    agentEmail: "michael.johnson@example.com",
    baseBalance: 200.00,
    bonusBalance: 50.00,
    usedAmount: 145.25,
    remainingBalance: 104.75,
    dailyBudget: 75.00,
    maxCallsPerDay: 40,
    verticals: {
      final_expense: { enabled: true, maxBid: 3.00, states: ['California', 'Texas', 'Florida', 'Nevada'] },
      auto_insurance: { enabled: true, maxBid: 2.25, states: ['California', 'Texas'] },
      health_insurance: { enabled: true, maxBid: 3.50, states: ['California', 'Texas', 'Arizona'] },
      medicare: { enabled: true, maxBid: 2.75, states: ['California', 'Texas', 'Florida'] },
      life_insurance: { enabled: true, maxBid: 1.85, states: ['California', 'Texas'] },
      home_insurance: { enabled: false, maxBid: 1.25, states: [] }
    }
  }
];

const CallCreditsManagement = () => {
  const [selectedAgent, setSelectedAgent] = useState<string>("");
  const [bonusAmount, setBonusAmount] = useState<string>("");
  const [bulkDialogOpen, setBulkDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingAgent, setEditingAgent] = useState<string>("");
  const [editingField, setEditingField] = useState<string>("");
  const [editValue, setEditValue] = useState<string>("");
  const [verticalDialogOpen, setVerticalDialogOpen] = useState(false);
  const [selectedAgentForVertical, setSelectedAgentForVertical] = useState<string>("");
  const [agentDialogOpen, setAgentDialogOpen] = useState(false);
  const [selectedAgentForEdit, setSelectedAgentForEdit] = useState<string>("");
  const [tempAgentSettings, setTempAgentSettings] = useState<any>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [minimumBids] = useState(getMinimumBids());

  const currentBillingPeriod = "December 2024";
  const agencyBilledAgents = mockAgentBalances.filter(agent => agent.remainingBalance > 0);

  const filteredAgents = mockAgentBalances.filter(agent =>
    agent.agentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.agentEmail.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAllocateBonus = () => {
    if (!selectedAgent || !bonusAmount) {
      toast.error("Please select an agent and enter bonus amount");
      return;
    }
    
    toast.success(`Allocated $${bonusAmount} bonus to ${mockAgentBalances.find(a => a.agentId === selectedAgent)?.agentName}`);
    setBonusAmount("");
    setSelectedAgent("");
  };

  const handleUpdateField = (agentId: string, field: string) => {
    if (!editValue) {
      toast.error("Please enter a valid value");
      return;
    }

    const agent = mockAgentBalances.find(a => a.agentId === agentId);
    if (agent) {
      const fieldLabels = {
        dailyBudget: "daily budget"
      };
      toast.success(`Updated ${fieldLabels[field as keyof typeof fieldLabels]} to ${editValue} for ${agent.agentName}`);
      setEditingAgent("");
      setEditingField("");
      setEditValue("");
    }
  };

  const openAgentDialog = (agentId: string) => {
    const agent = mockAgentBalances.find(a => a.agentId === agentId);
    if (agent) {
      setSelectedAgentForEdit(agentId);
      setTempAgentSettings(JSON.parse(JSON.stringify(agent))); // Deep copy
      setHasUnsavedChanges(false);
      setAgentDialogOpen(true);
    }
  };

  const handleStateToggle = (verticalId: string, state: string, checked: boolean) => {
    if (!tempAgentSettings) return;
    
    const updatedSettings = { ...tempAgentSettings };
    const currentStates = updatedSettings.verticals[verticalId].states;
    
    if (checked) {
      if (!currentStates.includes(state)) {
        updatedSettings.verticals[verticalId].states = [...currentStates, state];
      }
    } else {
      updatedSettings.verticals[verticalId].states = currentStates.filter((s: string) => s !== state);
    }
    
    setTempAgentSettings(updatedSettings);
    setHasUnsavedChanges(true);
  };

  const handleVerticalToggle = (verticalId: string, enabled: boolean) => {
    if (!tempAgentSettings) return;
    
    const updatedSettings = { ...tempAgentSettings };
    updatedSettings.verticals[verticalId].enabled = enabled;
    setTempAgentSettings(updatedSettings);
    setHasUnsavedChanges(true);
  };

  const handleMaxBidChange = (verticalId: string, maxBid: string) => {
    if (!tempAgentSettings) return;
    
    const minBid = minimumBids[verticalId as keyof typeof minimumBids] || 0;
    const bidValue = parseFloat(maxBid) || 0;
    
    if (bidValue < minBid) {
      const vertical = verticals.find(v => v.id === verticalId);
      toast.error(`Minimum bid for ${vertical?.name || verticalId} is $${minBid.toFixed(2)}`);
      return;
    }
    
    const updatedSettings = { ...tempAgentSettings };
    updatedSettings.verticals[verticalId].maxBid = bidValue;
    setTempAgentSettings(updatedSettings);
    setHasUnsavedChanges(true);
  };

  const handleCloseDialog = () => {
    if (hasUnsavedChanges) {
      toast.error("You have unsaved changes. Please save or they will be lost.");
      return;
    }
    setAgentDialogOpen(false);
    setSelectedAgentForEdit("");
    setTempAgentSettings(null);
  };

  const handleSaveChanges = () => {
    // Here you would save to your backend
    toast.success(`Settings saved for ${tempAgentSettings?.agentName}`);
    setHasUnsavedChanges(false);
    setAgentDialogOpen(false);
    setSelectedAgentForEdit("");
    setTempAgentSettings(null);
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="limits">Daily Limits</TabsTrigger>
          <TabsTrigger value="verticals">Verticals</TabsTrigger>
          <TabsTrigger value="balances">Balances</TabsTrigger>
          <TabsTrigger value="bonuses">Bonuses</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Agent Call Management Overview</CardTitle>
              <CardDescription>
                Quick overview of all agent settings and performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search agents..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 max-w-md"
                  />
                </div>
              </div>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Agent Name</TableHead>
                    <TableHead>Daily Budget</TableHead>
                    <TableHead>Remaining Balance</TableHead>
                    <TableHead>Active Verticals</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAgents.map((agent) => (
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
                        <Dialog open={agentDialogOpen} onOpenChange={(open) => !open && handleCloseDialog()}>
                          <DialogTrigger asChild>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => openAgentDialog(agent.agentId)}
                            >
                              <Edit className="h-4 w-4 mr-1" />
                              Edit Settings
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>Edit Call Settings - {tempAgentSettings?.agentName}</DialogTitle>
                              <DialogDescription>
                                Configure agent's vertical settings, max bids, and licensed states
                              </DialogDescription>
                            </DialogHeader>
                            
                            {tempAgentSettings && (
                            <div className="space-y-6">
                              {/* Daily Budget Section */}
                              <div className="border rounded-lg p-4">
                                <h3 className="text-lg font-semibold mb-4">Daily Budget</h3>
                                <div className="grid grid-cols-1 gap-4">
                                  <div>
                                    <Label htmlFor="dailyBudget">Daily Budget</Label>
                                    <div className="relative">
                                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                      <Input
                                        id="dailyBudget"
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        defaultValue={agent.dailyBudget}
                                        className="pl-8"
                                        onChange={(e) => {
                                          setTempAgentSettings({...tempAgentSettings, dailyBudget: parseFloat(e.target.value) || 0});
                                          setHasUnsavedChanges(true);
                                        }}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Verticals Configuration */}
                              <div className="border rounded-lg p-4">
                                <h3 className="text-lg font-semibold mb-4">Vertical Settings</h3>
                                <div className="space-y-6">
                                  {verticals.map(vertical => {
                                    const config = tempAgentSettings.verticals[vertical.id as keyof typeof tempAgentSettings.verticals];
                                    return (
                                      <div key={vertical.id} className="border rounded-lg p-4">
                                        <div className="flex items-center justify-between mb-4">
                                          <div className="flex items-center gap-3">
                                            <Checkbox 
                                              id={`${tempAgentSettings.agentId}-${vertical.id}`}
                                              checked={config.enabled}
                                              onCheckedChange={(checked) => handleVerticalToggle(vertical.id, checked as boolean)}
                                            />
                                            <Label 
                                              htmlFor={`${tempAgentSettings.agentId}-${vertical.id}`}
                                              className={`px-3 py-1 rounded text-sm font-medium ${vertical.color}`}
                                            >
                                              {vertical.name}
                                            </Label>
                                          </div>
                                          <div className="flex items-center gap-2">
                                            <Label htmlFor={`${tempAgentSettings.agentId}-${vertical.id}-bid`} className="text-sm">
                                              Max Bid:
                                            </Label>
                                            <div className="flex items-center gap-2">
                                              <div className="relative">
                                                <DollarSign className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-gray-400" />
                                                <Input
                                                  id={`${tempAgentSettings.agentId}-${vertical.id}-bid`}
                                                  type="number"
                                                  step="0.01"
                                                  min={minimumBids[vertical.id as keyof typeof minimumBids] || 0}
                                                  value={config.maxBid}
                                                  onChange={(e) => handleMaxBidChange(vertical.id, e.target.value)}
                                                  className="w-24 pl-6 text-sm"
                                                />
                                              </div>
                                              <span className="text-xs text-gray-500">
                                                (Min: ${(minimumBids[vertical.id as keyof typeof minimumBids] || 0).toFixed(2)})
                                              </span>
                                            </div>
                                          </div>
                                        </div>
                                        
                                        {/* States Selection */}
                                        <div>
                                          <Label className="text-sm font-medium mb-3 block">
                                            Licensed States ({config.states.length} selected)
                                          </Label>
                                          
                                          {/* Display Selected States */}
                                          {config.states.length > 0 && (
                                            <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded">
                                              <div className="text-xs text-blue-600 font-medium mb-2">Selected States:</div>
                                              <div className="flex flex-wrap gap-2">
                                                {config.states.map(state => (
                                                  <span key={state} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">
                                                    {state}
                                                  </span>
                                                ))}
                                              </div>
                                            </div>
                                          )}
                                          
                                          <div className="max-h-40 overflow-y-auto border rounded p-4 bg-gray-50">
                                            <div className="grid grid-cols-2 gap-3">
                                              {states.map(state => (
                                                <label key={state} className="flex items-center space-x-3 text-sm hover:bg-white rounded p-2 cursor-pointer">
                                                  <Checkbox 
                                                    checked={config.states.includes(state)}
                                                    onCheckedChange={(checked) => handleStateToggle(vertical.id, state, checked as boolean)}
                                                    className="h-4 w-4"
                                                  />
                                                  <span className="text-sm font-medium">{state}</span>
                                                </label>
                                              ))}
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                              
                              <div className="flex justify-end gap-2 pt-4">
                                <Button variant="outline" onClick={handleCloseDialog}>Cancel</Button>
                                <Button onClick={handleSaveChanges}>Save Changes</Button>
                              </div>
                            </div>
                            )}
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="limits" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Daily Budget Configuration
              </CardTitle>
              <CardDescription>
                Set daily budget limits for each agent
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search agents..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 max-w-md"
                  />
                </div>
              </div>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Agent Name</TableHead>
                    <TableHead>Daily Budget</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAgents.map((agent) => (
                    <TableRow key={agent.agentId}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{agent.agentName}</div>
                          <div className="text-sm text-gray-500">{agent.agentEmail}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {editingAgent === agent.agentId && editingField === "dailyBudget" ? (
                          <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                              type="number"
                              step="0.01"
                              min="0"
                              value={editValue}
                              onChange={(e) => setEditValue(e.target.value)}
                              className="w-32 pl-8"
                              autoFocus
                            />
                          </div>
                        ) : (
                          <span className="font-medium">${agent.dailyBudget.toFixed(2)}</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {editingAgent === agent.agentId ? (
                          <div className="flex gap-2">
                            <Button 
                              size="sm" 
                              onClick={() => handleUpdateField(agent.agentId, editingField)}
                            >
                              Save
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => {
                                setEditingAgent("");
                                setEditingField("");
                                setEditValue("");
                              }}
                            >
                              Cancel
                            </Button>
                          </div>
                        ) : (
                          <div className="flex gap-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => {
                                setEditingAgent(agent.agentId);
                                setEditingField("dailyBudget");
                                setEditValue(agent.dailyBudget.toString());
                              }}
                            >
                              Edit Budget
                            </Button>
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="verticals" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Vertical Configuration
              </CardTitle>
              <CardDescription>
                Manage which verticals agents can purchase calls in and their max bids per vertical
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search agents..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 max-w-md"
                  />
                </div>
              </div>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Agent Name</TableHead>
                    {verticals.map(vertical => (
                      <TableHead key={vertical.id} className="text-center">
                        <span className={`px-2 py-1 rounded text-xs ${vertical.color}`}>
                          {vertical.name}
                        </span>
                      </TableHead>
                    ))}
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAgents.map((agent) => (
                    <TableRow key={agent.agentId}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{agent.agentName}</div>
                          <div className="text-sm text-gray-500">{agent.agentEmail}</div>
                        </div>
                      </TableCell>
                      {verticals.map(vertical => {
                        const config = agent.verticals[vertical.id as keyof typeof agent.verticals];
                        return (
                          <TableCell key={vertical.id} className="text-center">
                            {config.enabled ? (
                              <div className="space-y-1">
                                <div className="text-green-600 font-medium">${config.maxBid.toFixed(2)}</div>
                                <div className="text-xs text-gray-500">{config.states.length} states</div>
                              </div>
                            ) : (
                              <span className="text-gray-400">Disabled</span>
                            )}
                          </TableCell>
                        );
                      })}
                      <TableCell>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => {
                            setSelectedAgentForVertical(agent.agentId);
                            setVerticalDialogOpen(true);
                          }}
                        >
                          <Edit className="h-4 w-4 mr-1" />
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

        <TabsContent value="balances" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Agent Call Balance Overview</CardTitle>
              <CardDescription className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Usage tracked for billing period: {currentBillingPeriod}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Used Amount:</strong> Shows dollars spent on calls during the current billing period ({currentBillingPeriod}). 
                  This resets at the start of each billing cycle.
                </p>
              </div>

              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search agents..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 max-w-md"
                  />
                </div>
              </div>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Agent Name</TableHead>
                    <TableHead>Base Balance</TableHead>
                    <TableHead>Bonus Balance</TableHead>
                    <TableHead>Used This Period</TableHead>
                    <TableHead>Remaining</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAgents.map((agent) => (
                    <TableRow key={agent.agentId}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{agent.agentName}</div>
                          <div className="text-sm text-gray-500">{agent.agentEmail}</div>
                        </div>
                      </TableCell>
                      <TableCell>${agent.baseBalance.toFixed(2)}</TableCell>
                      <TableCell>
                        {agent.bonusBalance > 0 ? (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            <Gift className="h-3 w-3 mr-1" />
                            ${agent.bonusBalance.toFixed(2)}
                          </span>
                        ) : (
                          <span className="text-gray-400">$0.00</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <span>${agent.usedAmount.toFixed(2)}</span>
                          <span className="text-xs text-gray-500">({currentBillingPeriod})</span>
                        </div>
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
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => setSelectedAgent(agent.agentId)}
                        >
                          Add Bonus
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bonuses" className="space-y-6">
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
                  Bulk Allocate Bonus ({agencyBilledAgents.length} Agency-Billed Agents)
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