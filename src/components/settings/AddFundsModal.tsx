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
import { DollarSign, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface AddFundsModalProps {
  isOpen: boolean;
  onClose: () => void;
  agentId: string;
  agentName: string;
  currentBalance: number;
  onSuccess: (agentId: string, newBalance: number) => void;
}

const AddFundsModal: React.FC<AddFundsModalProps> = ({
  isOpen,
  onClose,
  agentId,
  agentName,
  currentBalance,
  onSuccess,
}) => {
  const [amount, setAmount] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAddFunds = async () => {
    const fundsAmount = parseFloat(amount);
    
    if (isNaN(fundsAmount) || fundsAmount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    setIsLoading(true);
    
    // Simulate API call - In production, this would update the database
    setTimeout(() => {
      const newBalance = currentBalance + fundsAmount;
      onSuccess(agentId, newBalance);
      toast.success(`Added $${fundsAmount.toFixed(2)} to ${agentName}'s account`);
      setAmount("");
      setIsLoading(false);
      onClose();
    }, 500);
  };

  const handleClose = () => {
    setAmount("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Funds</DialogTitle>
          <DialogDescription>
            Add call credits to {agentName}'s account
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Current Balance</Label>
            <div className="flex items-center text-lg font-semibold">
              <DollarSign className="h-5 w-5 mr-1 text-muted-foreground" />
              <span>{currentBalance.toFixed(2)}</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Amount to Add</Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="amount"
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="pl-9"
                step="0.01"
                min="0"
                disabled={isLoading}
              />
            </div>
          </div>

          {amount && !isNaN(parseFloat(amount)) && parseFloat(amount) > 0 && (
            <div className="space-y-2 p-3 bg-muted rounded-lg">
              <Label>New Balance</Label>
              <div className="flex items-center text-lg font-semibold">
                <DollarSign className="h-5 w-5 mr-1 text-muted-foreground" />
                <span>{(currentBalance + parseFloat(amount)).toFixed(2)}</span>
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button onClick={handleAddFunds} disabled={isLoading || !amount || parseFloat(amount) <= 0}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Add Funds
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddFundsModal;
