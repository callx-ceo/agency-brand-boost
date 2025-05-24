
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { toast } from "sonner";
import { Plus, Gift } from "lucide-react";

// Mock data for call credits
const mockAgentCredits = [
  {
    agentId: "agent_user_123",
    agentName: "John Doe",
    agentEmail: "john.doe@example.com",
    baseCredits: 100,
    bonusCredits: 25,
    usedCredits: 67,
    remainingCredits: 58
  },
  {
    agentId: "agent_user_456",
    agentName: "Jane Smith",
    agentEmail: "jane.smith@example.com",
    baseCredits: 50,
    bonusCredits: 0,
    usedCredits: 32,
    remainingCredits: 18
  },
  {
    agentId: "agent_user_789",
    agentName: "Michael Johnson",
    agentEmail: "michael.johnson@example.com",
    baseCredits: 200,
    bonusCredits: 50,
    usedCredits: 145,
    remainingCredits: 105
  }
];

const CallCreditsManagement = () => {
  const [selectedAgent, setSelectedAgent] = useState<string>("");
  const [bonusAmount, setBonusAmount] = useState<string>("");

  const handleAllocateBonus = () => {
    if (!selectedAgent || !bonusAmount) {
      toast.error("Please select an agent and enter bonus amount");
      return;
    }
    
    toast.success(`Allocated ${bonusAmount} bonus credits to ${mockAgentCredits.find(a => a.agentId === selectedAgent)?.agentName}`);
    setBonusAmount("");
    setSelectedAgent("");
  };

  const handleBulkCredit = () => {
    toast.success("Bulk credits allocated to all agency-billed agents");
  };

  return (
    <div className="space-y-6">
      {/* Credit Allocation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gift className="h-5 w-5" />
            Allocate Bonus Credits
          </CardTitle>
          <CardDescription>
            Provide additional call credits to specific agents as bonuses or incentives
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
                {mockAgentCredits.map((agent) => (
                  <option key={agent.agentId} value={agent.agentId}>
                    {agent.agentName}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="bonus-amount">Bonus Credits</Label>
              <Input
                id="bonus-amount"
                type="number"
                placeholder="Enter credits"
                value={bonusAmount}
                onChange={(e) => setBonusAmount(e.target.value)}
              />
            </div>
            <div className="flex items-end">
              <Button onClick={handleAllocateBonus} className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Allocate Bonus
              </Button>
            </div>
          </div>
          
          <div className="pt-4 border-t">
            <Button variant="outline" onClick={handleBulkCredit}>
              Bulk Allocate Credits to All Agency-Billed Agents
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Credits Overview Table */}
      <Card>
        <CardHeader>
          <CardTitle>Agent Call Credits Overview</CardTitle>
          <CardDescription>
            Track call credit allocation and usage across all agents
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Agent Name</TableHead>
                <TableHead>Base Credits</TableHead>
                <TableHead>Bonus Credits</TableHead>
                <TableHead>Used Credits</TableHead>
                <TableHead>Remaining</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockAgentCredits.map((agent) => (
                <TableRow key={agent.agentId}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{agent.agentName}</div>
                      <div className="text-sm text-gray-500">{agent.agentEmail}</div>
                    </div>
                  </TableCell>
                  <TableCell>{agent.baseCredits}</TableCell>
                  <TableCell>
                    {agent.bonusCredits > 0 ? (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <Gift className="h-3 w-3 mr-1" />
                        {agent.bonusCredits}
                      </span>
                    ) : (
                      <span className="text-gray-400">0</span>
                    )}
                  </TableCell>
                  <TableCell>{agent.usedCredits}</TableCell>
                  <TableCell>
                    <span className={`font-medium ${
                      agent.remainingCredits < 20 ? 'text-red-600' : 
                      agent.remainingCredits < 50 ? 'text-yellow-600' : 'text-green-600'
                    }`}>
                      {agent.remainingCredits}
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
    </div>
  );
};

export default CallCreditsManagement;
