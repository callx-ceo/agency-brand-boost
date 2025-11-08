import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { DollarSign, Loader2, Users, Wallet, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

interface AgentBillingData {
  agentId: string;
  agentName: string;
  agentEmail: string;
  callCreditsBalance: number;
}

interface BulkAddFundsModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedAgents: AgentBillingData[];
  agencyCreditsBalance: number;
  onSuccess: (updates: { agentId: string; newBalance: number }[]) => void;
}

type DistributionMode = "equal" | "custom";

const BulkAddFundsModal: React.FC<BulkAddFundsModalProps> = ({
  isOpen,
  onClose,
  selectedAgents,
  agencyCreditsBalance,
  onSuccess,
}) => {
  const [distributionMode, setDistributionMode] = useState<DistributionMode>("equal");
  const [totalAmount, setTotalAmount] = useState<string>("");
  const [customAmounts, setCustomAmounts] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleAddFunds = async () => {
    let updates: { agentId: string; newBalance: number }[] = [];

    if (distributionMode === "equal") {
      const total = parseFloat(totalAmount);
      if (isNaN(total) || total <= 0) {
        toast.error("Please enter a valid total amount");
        return;
      }

      if (total > agencyCreditsBalance) {
        toast.error(`Insufficient funds. Available: $${agencyCreditsBalance.toFixed(2)}`);
        return;
      }

      const amountPerAgent = total / selectedAgents.length;
      updates = selectedAgents.map(agent => ({
        agentId: agent.agentId,
        newBalance: agent.callCreditsBalance + amountPerAgent
      }));
    } else {
      // Custom amounts
      updates = selectedAgents.map(agent => {
        const customAmount = parseFloat(customAmounts[agent.agentId] || "0");
        return {
          agentId: agent.agentId,
          newBalance: agent.callCreditsBalance + customAmount
        };
      });

      const totalCustom = updates.reduce((sum, u) => {
        const agent = selectedAgents.find(a => a.agentId === u.agentId);
        return sum + (u.newBalance - (agent?.callCreditsBalance || 0));
      }, 0);

      if (totalCustom <= 0) {
        toast.error("Please enter valid amounts for agents");
        return;
      }

      if (totalCustom > agencyCreditsBalance) {
        toast.error(`Insufficient funds. Available: $${agencyCreditsBalance.toFixed(2)}`);
        return;
      }
    }

    setIsLoading(true);
    
    // Simulate API call - In production, this would update the database
    setTimeout(() => {
      onSuccess(updates);
      const totalAdded = updates.reduce((sum, u) => {
        const agent = selectedAgents.find(a => a.agentId === u.agentId);
        return sum + (u.newBalance - (agent?.callCreditsBalance || 0));
      }, 0);
      toast.success(`Added $${totalAdded.toFixed(2)} to ${selectedAgents.length} agents`);
      setTotalAmount("");
      setCustomAmounts({});
      setIsLoading(false);
      onClose();
    }, 500);
  };

  const handleClose = () => {
    setTotalAmount("");
    setCustomAmounts({});
    setDistributionMode("equal");
    onClose();
  };

  const getTotalDistribution = () => {
    if (distributionMode === "equal") {
      return parseFloat(totalAmount) || 0;
    } else {
      return Object.values(customAmounts).reduce((sum, val) => sum + (parseFloat(val) || 0), 0);
    }
  };

  const getAmountPerAgent = () => {
    if (distributionMode === "equal" && totalAmount) {
      return parseFloat(totalAmount) / selectedAgents.length;
    }
    return 0;
  };

  const getRemainingBalance = () => {
    return agencyCreditsBalance - getTotalDistribution();
  };

  const hasInsufficientFunds = getTotalDistribution() > agencyCreditsBalance;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Bulk Add Funds</DialogTitle>
          <DialogDescription>
            Distribute funds to {selectedAgents.length} selected agent{selectedAgents.length !== 1 ? 's' : ''}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
              <Users className="h-5 w-5 text-muted-foreground" />
              <div>
                <div className="text-xs text-muted-foreground">Agents Selected</div>
                <div className="font-medium">{selectedAgents.length}</div>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 bg-primary/10 border border-primary/20 rounded-lg">
              <Wallet className="h-5 w-5 text-primary" />
              <div>
                <div className="text-xs text-muted-foreground">Available Funds</div>
                <div className="font-medium">${agencyCreditsBalance.toFixed(2)}</div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Label>Distribution Method</Label>
            <RadioGroup value={distributionMode} onValueChange={(value) => setDistributionMode(value as DistributionMode)}>
              <div className="flex items-start space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-accent">
                <RadioGroupItem value="equal" id="equal" className="mt-1" />
                <Label htmlFor="equal" className="cursor-pointer flex-1">
                  <div className="font-medium">Equal Distribution</div>
                  <div className="text-sm text-muted-foreground">
                    Distribute funds equally among all selected agents
                  </div>
                </Label>
              </div>
              <div className="flex items-start space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-accent">
                <RadioGroupItem value="custom" id="custom" className="mt-1" />
                <Label htmlFor="custom" className="cursor-pointer flex-1">
                  <div className="font-medium">Custom Amounts</div>
                  <div className="text-sm text-muted-foreground">
                    Specify different amounts for each agent
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </div>

          {distributionMode === "equal" ? (
            <div className="space-y-3">
              <Label htmlFor="totalAmount">Total Amount to Distribute</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="totalAmount"
                  type="number"
                  placeholder="0.00"
                  value={totalAmount}
                  onChange={(e) => setTotalAmount(e.target.value)}
                  className="pl-9"
                  step="0.01"
                  min="0"
                  disabled={isLoading}
                />
              </div>
              {totalAmount && parseFloat(totalAmount) > 0 && (
                <div className="p-3 bg-muted rounded-lg space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Amount per agent:</span>
                    <span className="font-medium">${getAmountPerAgent().toFixed(2)}</span>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              <Label>Custom Amounts</Label>
              <ScrollArea className="h-[250px] border rounded-lg p-3">
                <div className="space-y-3">
                  {selectedAgents.map((agent) => (
                    <div key={agent.agentId} className="space-y-2">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="font-medium text-sm">{agent.agentName}</div>
                          <div className="text-xs text-muted-foreground">
                            Current: ${agent.callCreditsBalance.toFixed(2)}
                          </div>
                        </div>
                        <div className="relative w-32">
                          <DollarSign className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-muted-foreground" />
                          <Input
                            type="number"
                            placeholder="0.00"
                            value={customAmounts[agent.agentId] || ""}
                            onChange={(e) => setCustomAmounts({
                              ...customAmounts,
                              [agent.agentId]: e.target.value
                            })}
                            className="pl-7 h-8 text-sm"
                            step="0.01"
                            min="0"
                            disabled={isLoading}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          )}

          {hasInsufficientFunds && getTotalDistribution() > 0 && (
            <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg flex items-start gap-2">
              <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <div className="font-medium text-destructive">Insufficient Funds</div>
                <div className="text-muted-foreground">
                  You're trying to distribute ${getTotalDistribution().toFixed(2)} but only have ${agencyCreditsBalance.toFixed(2)} available.
                </div>
              </div>
            </div>
          )}

          <div className="p-4 bg-muted rounded-lg space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Available Funds:</span>
              <div className="flex items-center font-medium">
                <DollarSign className="h-4 w-4 mr-1" />
                <span>{agencyCreditsBalance.toFixed(2)}</span>
              </div>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Total Distribution:</span>
              <div className="flex items-center font-medium">
                <DollarSign className="h-4 w-4 mr-1" />
                <span>{getTotalDistribution().toFixed(2)}</span>
              </div>
            </div>
            <div className="h-px bg-border" />
            <div className="flex justify-between items-center">
              <span className="font-medium">Remaining Balance:</span>
              <div className={`flex items-center text-lg font-bold ${getRemainingBalance() < 0 ? 'text-destructive' : 'text-primary'}`}>
                <DollarSign className="h-5 w-5 mr-1" />
                <span>{getRemainingBalance().toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button 
            onClick={handleAddFunds} 
            disabled={isLoading || getTotalDistribution() <= 0 || hasInsufficientFunds}
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Distribute Funds
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BulkAddFundsModal;
