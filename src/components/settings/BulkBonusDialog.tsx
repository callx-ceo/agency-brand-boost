
import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { toast } from "sonner";
import { DollarSign, Users } from "lucide-react";

interface Agent {
  agentId: string;
  agentName: string;
  agentEmail: string;
  baseBalance: number;
  bonusBalance: number;
  usedAmount: number;
  remainingBalance: number;
}

interface BulkBonusDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  agents: Agent[];
}

const BulkBonusDialog = ({ open, onOpenChange, agents }: BulkBonusDialogProps) => {
  const [selectedAgents, setSelectedAgents] = useState<string[]>([]);
  const [bonusAmount, setBonusAmount] = useState<string>("");
  const [showPreview, setShowPreview] = useState(false);

  const agencyBilledAgents = agents.filter(agent => agent.remainingBalance > 0); // Filter for agency-billed agents

  const handleAgentToggle = (agentId: string) => {
    setSelectedAgents(prev => 
      prev.includes(agentId) 
        ? prev.filter(id => id !== agentId)
        : [...prev, agentId]
    );
  };

  const handleSelectAll = () => {
    if (selectedAgents.length === agencyBilledAgents.length) {
      setSelectedAgents([]);
    } else {
      setSelectedAgents(agencyBilledAgents.map(agent => agent.agentId));
    }
  };

  const handlePreview = () => {
    if (selectedAgents.length === 0) {
      toast.error("Please select at least one agent");
      return;
    }
    if (!bonusAmount || parseFloat(bonusAmount) <= 0) {
      toast.error("Please enter a valid bonus amount");
      return;
    }
    setShowPreview(true);
  };

  const handleConfirmAllocation = () => {
    const totalAmount = selectedAgents.length * parseFloat(bonusAmount);
    toast.success(`Successfully allocated $${bonusAmount} bonus to ${selectedAgents.length} agents. Total: $${totalAmount.toFixed(2)}`);
    setSelectedAgents([]);
    setBonusAmount("");
    setShowPreview(false);
    onOpenChange(false);
  };

  const selectedAgentDetails = agencyBilledAgents.filter(agent => 
    selectedAgents.includes(agent.agentId)
  );

  const totalAllocation = selectedAgents.length * (parseFloat(bonusAmount) || 0);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Bulk Bonus Allocation
          </DialogTitle>
          <DialogDescription>
            Select multiple agency-billed agents and allocate bonus balance
          </DialogDescription>
        </DialogHeader>

        {!showPreview ? (
          <div className="space-y-6">
            {/* Bonus Amount Input */}
            <div className="space-y-2">
              <Label htmlFor="bulk-bonus-amount">Bonus Amount per Agent (USD)</Label>
              <div className="relative max-w-xs">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="bulk-bonus-amount"
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

            {/* Agent Selection */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-base font-medium">Select Agency-Billed Agents</Label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSelectAll}
                >
                  {selectedAgents.length === agencyBilledAgents.length ? "Deselect All" : "Select All"}
                </Button>
              </div>

              <div className="border rounded-lg max-h-64 overflow-y-auto">
                <Table>
                  <TableHeader className="sticky top-0 bg-white">
                    <TableRow>
                      <TableHead className="w-12">Select</TableHead>
                      <TableHead>Agent Name</TableHead>
                      <TableHead>Current Balance</TableHead>
                      <TableHead>Remaining</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {agencyBilledAgents.map((agent) => (
                      <TableRow key={agent.agentId}>
                        <TableCell>
                          <Checkbox
                            checked={selectedAgents.includes(agent.agentId)}
                            onCheckedChange={() => handleAgentToggle(agent.agentId)}
                          />
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{agent.agentName}</div>
                            <div className="text-sm text-gray-500">{agent.agentEmail}</div>
                          </div>
                        </TableCell>
                        <TableCell>${(agent.baseBalance + agent.bonusBalance).toFixed(2)}</TableCell>
                        <TableCell>${agent.remainingBalance.toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Summary */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex justify-between items-center text-sm">
                  <span>Selected Agents: <strong>{selectedAgents.length}</strong></span>
                  <span>Bonus per Agent: <strong>${bonusAmount || '0.00'}</strong></span>
                  <span>Total Allocation: <strong>${totalAllocation.toFixed(2)}</strong></span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Preview Mode */
          <div className="space-y-6">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h3 className="font-medium text-yellow-800 mb-2">Allocation Preview</h3>
              <p className="text-sm text-yellow-700">
                You are about to allocate <strong>${bonusAmount}</strong> bonus to <strong>{selectedAgents.length}</strong> agents.
                Total cost: <strong>${totalAllocation.toFixed(2)}</strong>
              </p>
            </div>

            <div className="border rounded-lg max-h-64 overflow-y-auto">
              <Table>
                <TableHeader className="sticky top-0 bg-white">
                  <TableRow>
                    <TableHead>Agent Name</TableHead>
                    <TableHead>Current Bonus</TableHead>
                    <TableHead>New Bonus</TableHead>
                    <TableHead>Total After</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedAgentDetails.map((agent) => {
                    const newBonus = agent.bonusBalance + parseFloat(bonusAmount);
                    const newTotal = agent.remainingBalance + parseFloat(bonusAmount);
                    return (
                      <TableRow key={agent.agentId}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{agent.agentName}</div>
                            <div className="text-sm text-gray-500">{agent.agentEmail}</div>
                          </div>
                        </TableCell>
                        <TableCell>${agent.bonusBalance.toFixed(2)}</TableCell>
                        <TableCell className="text-green-600 font-medium">
                          ${newBonus.toFixed(2)}
                        </TableCell>
                        <TableCell className="font-medium">
                          ${newTotal.toFixed(2)}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </div>
        )}

        <DialogFooter>
          {!showPreview ? (
            <>
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button onClick={handlePreview} disabled={selectedAgents.length === 0 || !bonusAmount}>
                Preview Allocation
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" onClick={() => setShowPreview(false)}>
                Back to Edit
              </Button>
              <Button onClick={handleConfirmAllocation} className="bg-green-600 hover:bg-green-700">
                Confirm Allocation
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BulkBonusDialog;
