
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { toast } from "sonner";
import { Plus, Gift, DollarSign, Users, Calendar, Settings } from "lucide-react";
import BulkBonusDialog from "./BulkBonusDialog";

// Mock data for call balance in USD
const mockAgentBalances = [
  {
    agentId: "agent_user_123",
    agentName: "John Doe",
    agentEmail: "john.doe@example.com",
    baseBalance: 100.00,
    bonusBalance: 25.00,
    usedAmount: 67.50, // Used since last billing cycle (monthly)
    remainingBalance: 57.50,
    maxBidPerCall: 2.50
  },
  {
    agentId: "agent_user_456",
    agentName: "Jane Smith",
    agentEmail: "jane.smith@example.com",
    baseBalance: 50.00,
    bonusBalance: 0.00,
    usedAmount: 32.75,
    remainingBalance: 17.25,
    maxBidPerCall: 1.75
  },
  {
    agentId: "agent_user_789",
    agentName: "Michael Johnson",
    agentEmail: "michael.johnson@example.com",
    baseBalance: 200.00,
    bonusBalance: 50.00,
    usedAmount: 145.25,
    remainingBalance: 104.75,
    maxBidPerCall: 3.00
  }
];

const CallCreditsManagement = () => {
  const [selectedAgent, setSelectedAgent] = useState<string>("");
  const [bonusAmount, setBonusAmount] = useState<string>("");
  const [bulkDialogOpen, setBulkDialogOpen] = useState(false);
  const [editingBidAgent, setEditingBidAgent] = useState<string>("");
  const [newMaxBid, setNewMaxBid] = useState<string>("");

  const currentBillingPeriod = "December 2024"; // This would come from your billing system

  const handleAllocateBonus = () => {
    if (!selectedAgent || !bonusAmount) {
      toast.error("Please select an agent and enter bonus amount");
      return;
    }
    
    toast.success(`Allocated $${bonusAmount} bonus to ${mockAgentBalances.find(a => a.agentId === selectedAgent)?.agentName}`);
    setBonusAmount("");
    setSelectedAgent("");
  };

  const handleUpdateMaxBid = (agentId: string) => {
    if (!newMaxBid || parseFloat(newMaxBid) <= 0) {
      toast.error("Please enter a valid max bid amount");
      return;
    }

    const agent = mockAgentBalances.find(a => a.agentId === agentId);
    if (agent) {
      toast.success(`Updated max bid per call to $${newMaxBid} for ${agent.agentName}`);
      setEditingBidAgent("");
      setNewMaxBid("");
    }
  };

  const agencyBilledAgents = mockAgentBalances.filter(agent => agent.remainingBalance > 0);

  return (
    <div className="space-y-6">
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
              Bulk Allocate Bonus ({agencyBilledAgents.length} Agency-Billed Agents)
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Max Bid Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Max Bid Per Call Settings
          </CardTitle>
          <CardDescription>
            Set maximum bid amounts per call for each agent to control spending limits
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>Max Bid Per Call:</strong> This controls the maximum amount an agent can bid on each call. 
              Setting appropriate limits helps manage costs and prevent overspending.
            </p>
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Agent Name</TableHead>
                <TableHead>Current Max Bid</TableHead>
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
                    {editingBidAgent === agent.agentId ? (
                      <div className="flex items-center gap-2">
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input
                            type="number"
                            step="0.01"
                            min="0.01"
                            value={newMaxBid}
                            onChange={(e) => setNewMaxBid(e.target.value)}
                            placeholder={agent.maxBidPerCall.toFixed(2)}
                            className="w-32 pl-8"
                          />
                        </div>
                        <Button 
                          size="sm" 
                          onClick={() => handleUpdateMaxBid(agent.agentId)}
                        >
                          Save
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => {
                            setEditingBidAgent("");
                            setNewMaxBid("");
                          }}
                        >
                          Cancel
                        </Button>
                      </div>
                    ) : (
                      <span className="font-medium text-green-600">
                        ${agent.maxBidPerCall.toFixed(2)}
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    {editingBidAgent !== agent.agentId && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => {
                          setEditingBidAgent(agent.agentId);
                          setNewMaxBid(agent.maxBidPerCall.toString());
                        }}
                      >
                        Edit Max Bid
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Balance Overview Table */}
      <Card>
        <CardHeader>
          <CardTitle>Agent Call Management Overview</CardTitle>
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
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Agent Name</TableHead>
                <TableHead>Base Balance</TableHead>
                <TableHead>Bonus Balance</TableHead>
                <TableHead>Used This Period</TableHead>
                <TableHead>Remaining</TableHead>
                <TableHead>Max Bid/Call</TableHead>
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
                    <span className="font-medium text-blue-600">
                      ${agent.maxBidPerCall.toFixed(2)}
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

      <BulkBonusDialog 
        open={bulkDialogOpen}
        onOpenChange={setBulkDialogOpen}
        agents={mockAgentBalances}
      />
    </div>
  );
};

export default CallCreditsManagement;
