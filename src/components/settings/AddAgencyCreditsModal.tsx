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
import { DollarSign, Loader2, CreditCard, Building2, Plus, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import PaymentMethodCard from "./PaymentMethodCard";
import AddPaymentMethodForm from "./AddPaymentMethodForm";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface PaymentMethod {
  id: string;
  brand: string;
  last4: string;
  exp_month: number;
  exp_year: number;
  isDefault: boolean;
}

interface AddAgencyCreditsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentBalance: number;
  onSuccess: (addedAmount: number) => void;
  allowedPaymentMethod: "credit_card" | "invoice" | "both";
  existingPaymentMethods?: PaymentMethod[];
  onPaymentMethodAdded?: (method: PaymentMethod) => void;
}

const AddAgencyCreditsModal: React.FC<AddAgencyCreditsModalProps> = ({
  isOpen,
  onClose,
  currentBalance,
  onSuccess,
  allowedPaymentMethod,
  existingPaymentMethods = [],
  onPaymentMethodAdded,
}) => {
  const [amount, setAmount] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState<string>("");
  const [showAddPaymentForm, setShowAddPaymentForm] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>(existingPaymentMethods);
  const [selectedPaymentMethodId, setSelectedPaymentMethodId] = useState<string>(
    existingPaymentMethods.find(pm => pm.isDefault)?.id || existingPaymentMethods[0]?.id || ""
  );
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedPaymentType, setSelectedPaymentType] = useState<"credit_card" | "invoice">(
    allowedPaymentMethod === "both" ? "credit_card" : (allowedPaymentMethod as "credit_card" | "invoice")
  );

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

    // For credit card payments, show confirmation dialog
    if (selectedPaymentType === "credit_card") {
      if (paymentMethods.length === 0) {
        toast.error("Please add a payment method first");
        return;
      }
      if (!selectedPaymentMethodId) {
        toast.error("Please select a payment method");
        return;
      }
      setShowConfirmation(true);
      return;
    }

    // For invoicing, process immediately
    processPayment();
  };

  const processPayment = async () => {
    const creditsAmount = parseFloat(amount);
    setIsLoading(true);
    
    // Simulate API call - In production, this would process payment/create invoice
    setTimeout(() => {
      onSuccess(creditsAmount); // Pass the added amount, not the new balance
      
      if (selectedPaymentType === "invoice") {
        toast.success(`Invoice generated for $${creditsAmount.toFixed(2)}. Credits are now available and payment is due per invoice terms.`);
      } else {
        const pm = paymentMethods.find(p => p.id === selectedPaymentMethodId);
        toast.success(`Charged $${creditsAmount.toFixed(2)} to ${pm?.brand} •••• ${pm?.last4}`);
      }
      
      setAmount("");
      setSelectedAmount("");
      setShowConfirmation(false);
      setIsLoading(false);
      onClose();
    }, 800);
  };

  const handlePaymentMethodAdded = (newPaymentMethod: PaymentMethod) => {
    setPaymentMethods([...paymentMethods, newPaymentMethod]);
    setSelectedPaymentMethodId(newPaymentMethod.id);
    setShowAddPaymentForm(false);
    if (onPaymentMethodAdded) {
      onPaymentMethodAdded(newPaymentMethod);
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      setAmount("");
      setSelectedAmount("");
      setShowAddPaymentForm(false);
      setShowConfirmation(false);
      onClose();
    }
  };

  const selectedPaymentMethod = paymentMethods.find(pm => pm.id === selectedPaymentMethodId);

  return (
    <>
      <AlertDialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Payment</AlertDialogTitle>
            <AlertDialogDescription className="space-y-4">
              <div>
                You are about to charge <strong>${parseFloat(amount || "0").toFixed(2)}</strong> to:
              </div>
              {selectedPaymentMethod && (
                <div className="p-3 bg-muted rounded-lg">
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4" />
                    <span className="font-medium capitalize">
                      {selectedPaymentMethod.brand} •••• {selectedPaymentMethod.last4}
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    Expires {selectedPaymentMethod.exp_month.toString().padStart(2, '0')}/{selectedPaymentMethod.exp_year}
                  </div>
                </div>
              )}
              <div className="text-sm">
                This charge will be processed immediately and credits will be added to your agency account.
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={processPayment} disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Confirm & Charge
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {showAddPaymentForm ? "Add Payment Method" : "Add Agency Credits"}
          </DialogTitle>
          <DialogDescription>
            {showAddPaymentForm 
              ? "Enter your credit card information to add a payment method"
              : "Add call credits to your agency account for funding agency-paid agents"
            }
          </DialogDescription>
        </DialogHeader>
        
        {showAddPaymentForm ? (
          <AddPaymentMethodForm
            onSuccess={handlePaymentMethodAdded}
            onCancel={() => setShowAddPaymentForm(false)}
          />
        ) : (
          <>
            <div className="space-y-6 py-4">
          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div>
              <Label className="text-sm text-muted-foreground">Current Balance</Label>
              <div className="flex items-center text-2xl font-bold mt-1">
                <DollarSign className="h-6 w-6 mr-1" />
                <span>{currentBalance.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {allowedPaymentMethod === "both" && (
            <div className="space-y-3">
              <Label>Payment Method</Label>
              <RadioGroup value={selectedPaymentType} onValueChange={(value: "credit_card" | "invoice") => setSelectedPaymentType(value)}>
                <div className="grid grid-cols-2 gap-3">
                  <Label
                    htmlFor="pay-credit"
                    className="flex items-center space-x-3 border-2 rounded-lg p-3 cursor-pointer hover:bg-accent transition-colors [&:has([data-state=checked])]:border-primary"
                  >
                    <RadioGroupItem value="credit_card" id="pay-credit" />
                    <CreditCard className="h-4 w-4" />
                    <span className="font-medium">Credit Card</span>
                  </Label>
                  <Label
                    htmlFor="pay-invoice"
                    className="flex items-center space-x-3 border-2 rounded-lg p-3 cursor-pointer hover:bg-accent transition-colors [&:has([data-state=checked])]:border-primary"
                  >
                    <RadioGroupItem value="invoice" id="pay-invoice" />
                    <Building2 className="h-4 w-4" />
                    <span className="font-medium">Invoice</span>
                  </Label>
                </div>
              </RadioGroup>
            </div>
          )}

          {(allowedPaymentMethod === "credit_card" || (allowedPaymentMethod === "both" && selectedPaymentType === "credit_card")) && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>Payment Method</Label>
                {paymentMethods.length > 0 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowAddPaymentForm(true)}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add New
                  </Button>
                )}
              </div>

              {paymentMethods.length === 0 ? (
                <div className="p-6 border-2 border-dashed rounded-lg text-center space-y-3">
                  <CreditCard className="h-12 w-12 mx-auto text-muted-foreground" />
                  <div>
                    <div className="font-medium">No Payment Method</div>
                    <div className="text-sm text-muted-foreground">
                      Add a credit card to process payments
                    </div>
                  </div>
                  <Button onClick={() => setShowAddPaymentForm(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Credit Card
                  </Button>
                </div>
              ) : (
                <RadioGroup value={selectedPaymentMethodId} onValueChange={setSelectedPaymentMethodId}>
                  <div className="space-y-2">
                    {paymentMethods.map((pm) => (
                      <Label
                        key={pm.id}
                        htmlFor={pm.id}
                        className="flex items-center space-x-3 cursor-pointer"
                      >
                        <RadioGroupItem value={pm.id} id={pm.id} />
                        <div className="flex-1">
                          <PaymentMethodCard
                            brand={pm.brand}
                            last4={pm.last4}
                            expMonth={pm.exp_month}
                            expYear={pm.exp_year}
                            isDefault={pm.isDefault}
                          />
                        </div>
                      </Label>
                    ))}
                  </div>
                </RadioGroup>
              )}
            </div>
          )}

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

          {(allowedPaymentMethod === "invoice" || (allowedPaymentMethod === "both" && selectedPaymentType === "invoice")) && (
            <div className="p-3 bg-primary/10 border border-primary/20 rounded-lg text-sm">
              <div className="font-medium mb-1">Invoice Payment Terms</div>
              <p className="text-muted-foreground">
                An invoice will be generated for $<span className="font-semibold">{parseFloat(amount || "0").toFixed(2)}</span>. 
                Credits are <strong>available immediately</strong> for distribution to agents. 
                Payment is due according to your invoice terms (typically Net 30).
              </p>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button 
            onClick={handleAddCredits} 
            disabled={isLoading || !amount || parseFloat(amount) <= 0 || (selectedPaymentType === "credit_card" && paymentMethods.length === 0)}
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {selectedPaymentType === "credit_card" && (
              <ShieldCheck className="mr-2 h-4 w-4" />
            )}
            {selectedPaymentType === "invoice" ? "Generate Invoice" : "Continue to Payment"}
          </Button>
        </DialogFooter>
        </>
        )}
      </DialogContent>
    </Dialog>
    </>
  );
};

export default AddAgencyCreditsModal;
