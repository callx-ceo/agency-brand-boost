import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Plus, Gift, DollarSign, Users, Calendar, Settings, Target, Phone, MapPin, Search, Edit, Building2 } from "lucide-react";

const verticals = [
  { id: 'final_expense', name: 'Final Expense', color: 'bg-purple-100 text-purple-800' },
  { id: 'auto_insurance', name: 'Auto Insurance', color: 'bg-blue-100 text-blue-800' },
  { id: 'health_insurance', name: 'Health Insurance', color: 'bg-green-100 text-green-800' },
  { id: 'medicare', name: 'Medicare', color: 'bg-orange-100 text-orange-800' },
  { id: 'life_insurance', name: 'Life Insurance', color: 'bg-red-100 text-red-800' },
  { id: 'home_insurance', name: 'Home Insurance', color: 'bg-teal-100 text-teal-800' }
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

// Mock function to get minimum bids
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

// Mock data for agencies and their agents
const mockAgencyData = [
  {
    agencyId: "agency_001",
    agencyName: "Premier Insurance Group",
    totalAgents: 15,
    totalBalance: 5670.00,
    totalUsed: 2340.00,
    agents: [
      {
        agentId: "agent_001",
        agentName: "John Doe",
        agentEmail: "john.doe@premier.com",
        baseBalance: 200.00,
        bonusBalance: 50.00,
        usedAmount: 120.50,
        remainingBalance: 129.50,
        dailyBudget: 75.00,
        maxCallsPerDay: 30,
        verticals: {
          final_expense: { enabled: true, maxBid: 2.50, states: ['California', 'Texas'] },
          auto_insurance: { enabled: true, maxBid: 1.75, states: ['California'] },
          health_insurance: { enabled: false, maxBid: 3.00, states: [] },
          medicare: { enabled: true, maxBid: 2.25, states: ['Texas'] }
        }
      },
      {
        agentId: "agent_002",
        agentName: "Jane Smith",
        agentEmail: "jane.smith@premier.com",
        baseBalance: 150.00,
        bonusBalance: 25.00,
        usedAmount: 80.25,
        remainingBalance: 94.75,
        dailyBudget: 60.00,
        maxCallsPerDay: 25,
        verticals: {
          final_expense: { enabled: true, maxBid: 2.00, states: ['Texas', 'Arizona'] },
          auto_insurance: { enabled: false, maxBid: 1.50, states: [] },
          health_insurance: { enabled: true, maxBid: 2.75, states: ['Texas'] },
          medicare: { enabled: false, maxBid: 2.00, states: [] }
        }
      }
    ]
  },
  {
    agencyId: "agency_002",
    agencyName: "Elite Insurance Services",
    totalAgents: 8,
    totalBalance: 3200.00,
    totalUsed: 1450.00,
    agents: [
      {
        agentId: "agent_003",
        agentName: "Michael Johnson",
        agentEmail: "m.johnson@elite.com",
        baseBalance: 300.00,
        bonusBalance: 75.00,
        usedAmount: 180.25,
        remainingBalance: 194.75,
        dailyBudget: 100.00,
        maxCallsPerDay: 40,
        verticals: {
          final_expense: { enabled: true, maxBid: 3.00, states: ['California', 'Texas', 'Florida'] },
          auto_insurance: { enabled: true, maxBid: 2.25, states: ['California', 'Texas'] },
          health_insurance: { enabled: true, maxBid: 3.50, states: ['California', 'Texas'] },
          medicare: { enabled: true, maxBid: 2.75, states: ['California', 'Florida'] }
        }
      }
    ]
  }
];

const CallSettingsManagement = ({ onBackToDashboard }: { onBackToDashboard: () => void }) => {
  const [selectedAgency, setSelectedAgency] = useState<string>("");
  const [bonusAmount, setBonusAmount] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");
  const [agentDialogOpen, setAgentDialogOpen] = useState(false);
  const [selectedAgentForEdit, setSelectedAgentForEdit] = useState<any>(null);
  const [tempAgentSettings, setTempAgentSettings] = useState<any>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [minimumBids] = useState(getMinimumBids());

  const filteredAgencies = mockAgencyData.filter(agency =>
    agency.agencyName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getAllAgents = () => {
    return mockAgencyData.flatMap(agency => 
      agency.agents.map(agent => ({ ...agent, agencyName: agency.agencyName, agencyId: agency.agencyId }))
    );
  };

  const filteredAgents = getAllAgents().filter(agent =>
    agent.agentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.agentEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.agencyName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openAgentDialog = (agent: any) => {
    setSelectedAgentForEdit(agent);
    setTempAgentSettings(JSON.parse(JSON.stringify(agent)));
    setHasUnsavedChanges(false);
    setAgentDialogOpen(true);
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
    setSelectedAgentForEdit(null);
    setTempAgentSettings(null);
  };

  const handleSaveChanges = () => {
    toast.success(`Settings saved for ${tempAgentSettings?.agentName}`);
    setHasUnsavedChanges(false);
    setAgentDialogOpen(false);
    setSelectedAgentForEdit(null);
    setTempAgentSettings(null);
  };

  const handleAllocateBonus = () => {
    if (!selectedAgentForEdit || !bonusAmount) {
      toast.error("Please select an agent and enter bonus amount");
      return;
    }
    
    toast.success(`Allocated $${bonusAmount} bonus to ${selectedAgentForEdit.agentName}`);
    setBonusAmount("");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Call Settings Management</h1>
          <p className="text-muted-foreground">
            Manage call settings, budgets, and vertical configurations across all agencies
          </p>
        </div>
        <Button variant="outline" onClick={onBackToDashboard}>
          Back to Dashboard
        </Button>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="agencies">By Agency</TabsTrigger>
          <TabsTrigger value="agents">All Agents</TabsTrigger>
          <TabsTrigger value="bonuses">Bonus Management</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Agencies</CardTitle>
                <Building2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockAgencyData.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Agents</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{getAllAgents().length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ${mockAgencyData.reduce((sum, agency) => sum + agency.totalBalance, 0).toFixed(2)}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Platform-wide Call Settings Summary</CardTitle>
              <CardDescription>
                Overview of agent settings and balances across all agencies
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search agents or agencies..."
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
                    <TableHead>Agency</TableHead>
                    <TableHead>Daily Budget</TableHead>
                    <TableHead>Remaining Balance</TableHead>
                    <TableHead>Active Verticals</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAgents.map((agent) => (
                    <TableRow key={`${agent.agencyId}-${agent.agentId}`}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{agent.agentName}</div>
                          <div className="text-sm text-gray-500">{agent.agentEmail}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm font-medium">{agent.agencyName}</span>
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
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => openAgentDialog(agent)}
                        >
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="agencies" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Agency Overview</CardTitle>
              <CardDescription>
                Call settings and balances by agency
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredAgencies.map((agency) => (
                  <div key={agency.agencyId} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold">{agency.agencyName}</h3>
                        <p className="text-sm text-muted-foreground">{agency.totalAgents} agents</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold">${agency.totalBalance.toFixed(2)}</div>
                        <div className="text-sm text-muted-foreground">Total Balance</div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-3 bg-gray-50 rounded">
                        <div className="text-xl font-bold text-green-600">
                          ${(agency.totalBalance - agency.totalUsed).toFixed(2)}
                        </div>
                        <div className="text-sm text-gray-600">Remaining</div>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded">
                        <div className="text-xl font-bold text-blue-600">
                          ${agency.totalUsed.toFixed(2)}
                        </div>
                        <div className="text-sm text-gray-600">Used</div>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded">
                        <div className="text-xl font-bold">
                          {agency.agents.reduce((sum, agent) => sum + agent.maxCallsPerDay, 0)}
                        </div>
                        <div className="text-sm text-gray-600">Max Daily Calls</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="agents" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>All Agents</CardTitle>
              <CardDescription>
                Detailed view of all agent settings across agencies
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
                    <TableHead>Agent</TableHead>
                    <TableHead>Agency</TableHead>
                    <TableHead>Budget/Calls</TableHead>
                    <TableHead>Balance Status</TableHead>
                    <TableHead>Verticals</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAgents.map((agent) => (
                    <TableRow key={`${agent.agencyId}-${agent.agentId}`}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{agent.agentName}</div>
                          <div className="text-sm text-gray-500">{agent.agentEmail}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{agent.agencyName}</span>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">${agent.dailyBudget}/day</div>
                          <div className="text-sm text-gray-500">{agent.maxCallsPerDay} calls/day</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <span className={`font-medium ${
                            agent.remainingBalance < 20 ? 'text-red-600' : 
                            agent.remainingBalance < 50 ? 'text-yellow-600' : 'text-green-600'
                          }`}>
                            ${agent.remainingBalance.toFixed(2)}
                          </span>
                          <div className="text-sm text-gray-500">
                            Used: ${agent.usedAmount.toFixed(2)}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1 flex-wrap">
                          {Object.entries(agent.verticals)
                            .filter(([_, config]) => config.enabled)
                            .map(([verticalId, config]) => {
                              const vertical = verticals.find(v => v.id === verticalId);
                              return vertical ? (
                                <div key={verticalId} className="text-xs">
                                  <span className={`px-2 py-1 rounded-full ${vertical.color}`}>
                                    {vertical.name}
                                  </span>
                                  <div className="text-gray-500 mt-1">
                                    ${config.maxBid} | {config.states.length} states
                                  </div>
                                </div>
                              ) : null;
                            })}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => openAgentDialog(agent)}
                        >
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
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
              <CardTitle>Bonus Management</CardTitle>
              <CardDescription>
                Allocate bonuses to agents across all agencies
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="agent-select">Select Agent</Label>
                    <Select value={selectedAgentForEdit?.agentId || ""} onValueChange={(value) => {
                      const agent = getAllAgents().find(a => a.agentId === value);
                      setSelectedAgentForEdit(agent);
                    }}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose an agent" />
                      </SelectTrigger>
                      <SelectContent>
                        {getAllAgents().map((agent) => (
                          <SelectItem key={agent.agentId} value={agent.agentId}>
                            {agent.agentName} ({agent.agencyName})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="bonus-amount">Bonus Amount</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="bonus-amount"
                        type="number"
                        step="0.01"
                        min="0"
                        value={bonusAmount}
                        onChange={(e) => setBonusAmount(e.target.value)}
                        className="pl-8"
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                  <div className="flex items-end">
                    <Button onClick={handleAllocateBonus} className="w-full">
                      <Gift className="h-4 w-4 mr-2" />
                      Allocate Bonus
                    </Button>
                  </div>
                </div>

                {selectedAgentForEdit && (
                  <div className="border rounded-lg p-4 bg-gray-50">
                    <h4 className="font-medium mb-2">Selected Agent Details</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Current Balance:</span>
                        <div className="font-medium">${selectedAgentForEdit.remainingBalance.toFixed(2)}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Bonus Balance:</span>
                        <div className="font-medium">${selectedAgentForEdit.bonusBalance.toFixed(2)}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Daily Budget:</span>
                        <div className="font-medium">${selectedAgentForEdit.dailyBudget.toFixed(2)}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Agency:</span>
                        <div className="font-medium">{selectedAgentForEdit.agencyName}</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Agent Settings Dialog */}
      <Dialog open={agentDialogOpen} onOpenChange={(open) => !open && handleCloseDialog()}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Call Settings - {tempAgentSettings?.agentName}</DialogTitle>
            <DialogDescription>
              Configure agent's vertical settings, max bids, and licensed states
            </DialogDescription>
          </DialogHeader>
          
          {tempAgentSettings && (
            <div className="space-y-6">
              {/* Agency Info */}
              <div className="border rounded-lg p-4 bg-gray-50">
                <h3 className="text-lg font-semibold mb-2">Agent Information</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Agency:</span>
                    <div className="font-medium">{tempAgentSettings.agencyName}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Email:</span>
                    <div className="font-medium">{tempAgentSettings.agentEmail}</div>
                  </div>
                </div>
              </div>

              {/* Daily Budget Section */}
              <div className="border rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-4">Daily Budget & Limits</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="dailyBudget">Daily Budget</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="dailyBudget"
                        type="number"
                        step="0.01"
                        min="0"
                        value={tempAgentSettings.dailyBudget}
                        className="pl-8"
                        onChange={(e) => {
                          setTempAgentSettings({...tempAgentSettings, dailyBudget: parseFloat(e.target.value) || 0});
                          setHasUnsavedChanges(true);
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="maxCalls">Max Calls Per Day</Label>
                    <Input
                      id="maxCalls"
                      type="number"
                      min="0"
                      value={tempAgentSettings.maxCallsPerDay}
                      onChange={(e) => {
                        setTempAgentSettings({...tempAgentSettings, maxCallsPerDay: parseInt(e.target.value) || 0});
                        setHasUnsavedChanges(true);
                      }}
                    />
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
                                  className="pl-6 w-20"
                                />
                              </div>
                              <span className="text-xs text-gray-500">
                                Min: ${minimumBids[vertical.id as keyof typeof minimumBids]?.toFixed(2) || '0.00'}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        {config.enabled && (
                          <div>
                            <Label className="text-sm font-medium mb-2 block">Licensed States:</Label>
                            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 max-h-40 overflow-y-auto border rounded p-2">
                              {states.map(state => (
                                <div key={state} className="flex items-center space-x-2">
                                  <Checkbox
                                    id={`${tempAgentSettings.agentId}-${vertical.id}-${state}`}
                                    checked={config.states.includes(state)}
                                    onCheckedChange={(checked) => handleStateToggle(vertical.id, state, checked as boolean)}
                                  />
                                  <Label 
                                    htmlFor={`${tempAgentSettings.agentId}-${vertical.id}-${state}`}
                                    className="text-xs cursor-pointer"
                                  >
                                    {state}
                                  </Label>
                                </div>
                              ))}
                            </div>
                            <div className="mt-2 p-2 bg-blue-50 rounded text-sm">
                              <strong>Selected States:</strong> {config.states.join(', ') || 'None'}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Dialog Actions */}
              <div className="flex justify-end gap-2 pt-4 border-t">
                <Button 
                  variant="outline" 
                  onClick={handleCloseDialog}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleSaveChanges}
                  disabled={!hasUnsavedChanges}
                >
                  Save Changes
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CallSettingsManagement;