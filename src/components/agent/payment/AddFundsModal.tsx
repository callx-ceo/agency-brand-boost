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
import { CreditCard, DollarSign } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AddFundsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentBalance: number;
}

// Mock payment methods - would come from Supabase agent_payment_methods
const mockPaymentMethods = [
  { id: "pm_1", brand: "Visa", last4: "4242", isDefault: true },
  { id: "pm_2", brand: "Mastercard", last4: "5555", isDefault: false },
];

const AddFundsModal = ({ isOpen, onClose, currentBalance }: AddFundsModalProps) => {
  const { toast } = useToast();
  const [amount, setAmount] = useState("100");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(mockPaymentMethods[0].id);
  const [isProcessing, setIsProcessing] = useState(false);

  const quickAmounts = [50, 100, 250, 500];

  const handleAddFunds = async () => {
    const fundAmount = parseFloat(amount);

    if (isNaN(fundAmount) || fundAmount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount greater than 0.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      // In production, this would:
      // 1. Call Stripe API to charge the payment method
      // 2. Create a transaction record in call_credits_transactions
      // 3. Update agent_payment_settings.call_credits_balance
      
      toast({
        title: "Funds Added Successfully",
        description: `$${fundAmount.toFixed(2)} has been added to your call credits balance.`,
      });

      setIsProcessing(false);
      onClose();
      setAmount("100"); // Reset to default
    }, 1500);
  };

  const newBalance = parseFloat(amount) + currentBalance;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Funds</DialogTitle>
          <DialogDescription>
            Add funds to your call credits balance to continue making calls.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Quick Amount Selection */}
          <div className="space-y-2">
            <Label>Quick Amount</Label>
            <div className="grid grid-cols-4 gap-2">
              {quickAmounts.map((quickAmount) => (
                <Button
                  key={quickAmount}
                  variant={amount === quickAmount.toString() ? "default" : "outline"}
                  size="sm"
                  onClick={() => setAmount(quickAmount.toString())}
                >
                  ${quickAmount}
                </Button>
              ))}
            </div>
          </div>

          {/* Custom Amount Input */}
          <div className="space-y-2">
            <Label htmlFor="custom-amount">Custom Amount</Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="custom-amount"
                type="number"
                min="1"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="pl-9"
                placeholder="Enter amount"
              />
            </div>
          </div>

          {/* Balance Preview */}
          <div className="p-4 bg-muted/50 rounded-lg space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Current Balance</span>
              <span className="font-medium">${currentBalance.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Amount to Add</span>
              <span className="font-medium">${parseFloat(amount || "0").toFixed(2)}</span>
            </div>
            <div className="pt-2 border-t border-border flex justify-between">
              <span className="font-medium">New Balance</span>
              <span className="font-bold text-primary">${newBalance.toFixed(2)}</span>
            </div>
          </div>

          {/* Payment Method Selection */}
          <div className="space-y-3">
            <Label>Payment Method</Label>
            <RadioGroup value={selectedPaymentMethod} onValueChange={setSelectedPaymentMethod}>
              {mockPaymentMethods.map((method) => (
                <div
                  key={method.id}
                  className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-muted/50"
                  onClick={() => setSelectedPaymentMethod(method.id)}
                >
                  <RadioGroupItem value={method.id} id={method.id} />
                  <Label
                    htmlFor={method.id}
                    className="flex items-center gap-2 flex-1 cursor-pointer"
                  >
                    <CreditCard className="h-4 w-4" />
                    <span className="font-medium">{method.brand}</span>
                    <span className="text-muted-foreground">••••{method.last4}</span>
                    {method.isDefault && (
                      <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">
                        Default
                      </span>
                    )}
                  </Label>
                </div>
              ))}
            </RadioGroup>
            <Button variant="link" className="p-0 h-auto text-sm">
              + Add new payment method
            </Button>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isProcessing}>
            Cancel
          </Button>
          <Button onClick={handleAddFunds} disabled={isProcessing}>
            {isProcessing ? "Processing..." : `Add $${parseFloat(amount || "0").toFixed(2)}`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddFundsModal;
