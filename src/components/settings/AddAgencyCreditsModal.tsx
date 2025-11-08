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
import { DollarSign, Loader2, CreditCard, Building2 } from "lucide-react";
import { toast } from "sonner";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface AddAgencyCreditsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentBalance: number;
  onSuccess: (newBalance: number) => void;
  paymentMethod: "credit_card" | "invoicing";
}

const AddAgencyCreditsModal: React.FC<AddAgencyCreditsModalProps> = ({
  isOpen,
  onClose,
  currentBalance,
  onSuccess,
  paymentMethod,
}) => {
  const [amount, setAmount] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState<string>("");

  const presetAmounts = ["1000", "5000", "10000", "25000", "50000"];

  const handleSelectPreset = (value: string) => {
    setSelectedAmount(value);
    setAmount(value);
  };

  const handleAddCredits = async () => {
    const creditsAmount = parseFloat(amount);
    
    if (isNaN(creditsAmount) || creditsAmount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    setIsLoading(true);
    
    // Simulate API call - In production, this would process payment/create invoice
    setTimeout(() => {
      const newBalance = currentBalance + creditsAmount;
      onSuccess(newBalance);
      
      if (paymentMethod === "invoicing") {
        toast.success(`Invoice created for $${creditsAmount.toFixed(2)}. Credits will be available once payment is received.`);
      } else {
        toast.success(`Added $${creditsAmount.toFixed(2)} to agency credits`);
      }
      
      setAmount("");
      setSelectedAmount("");
      setIsLoading(false);
      onClose();
    }, 800);
  };

  const handleClose = () => {
    setAmount("");
    setSelectedAmount("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add Agency Credits</DialogTitle>
          <DialogDescription>
            Add call credits to your agency account for funding agency-paid agents
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div>
              <Label className="text-sm text-muted-foreground">Current Balance</Label>
              <div className="flex items-center text-2xl font-bold mt-1">
                <DollarSign className="h-6 w-6 mr-1" />
                <span>{currentBalance.toFixed(2)}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              {paymentMethod === "credit_card" ? (
                <>
                  <CreditCard className="h-4 w-4" />
                  <span>Credit Card</span>
                </>
              ) : (
                <>
                  <Building2 className="h-4 w-4" />
                  <span>Invoicing</span>
                </>
              )}
            </div>
          </div>

          <div className="space-y-3">
            <Label>Quick Select Amount</Label>
            <RadioGroup value={selectedAmount} onValueChange={handleSelectPreset}>
              <div className="grid grid-cols-2 gap-3">
                {presetAmounts.map((preset) => (
                  <Label
                    key={preset}
                    htmlFor={`preset-${preset}`}
                    className="flex items-center space-x-3 border-2 rounded-lg p-3 cursor-pointer hover:bg-accent transition-colors [&:has([data-state=checked])]:border-primary"
                  >
                    <RadioGroupItem value={preset} id={`preset-${preset}`} />
                    <span className="font-medium">${parseFloat(preset).toLocaleString()}</span>
                  </Label>
                ))}
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Or Enter Custom Amount</Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="amount"
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                  setSelectedAmount("");
                }}
                className="pl-9"
                step="0.01"
                min="0"
                disabled={isLoading}
              />
            </div>
          </div>

          {amount && !isNaN(parseFloat(amount)) && parseFloat(amount) > 0 && (
            <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg space-y-2">
              <Label>New Balance</Label>
              <div className="flex items-center text-2xl font-bold text-primary">
                <DollarSign className="h-6 w-6 mr-1" />
                <span>{(currentBalance + parseFloat(amount)).toFixed(2)}</span>
              </div>
            </div>
          )}

          {paymentMethod === "invoicing" && (
            <div className="p-3 bg-muted rounded-lg text-sm text-muted-foreground">
              <strong>Note:</strong> An invoice will be generated and sent to your billing email. Credits will be available once payment is received.
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button onClick={handleAddCredits} disabled={isLoading || !amount || parseFloat(amount) <= 0}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {paymentMethod === "invoicing" ? "Generate Invoice" : "Add Credits"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddAgencyCreditsModal;
