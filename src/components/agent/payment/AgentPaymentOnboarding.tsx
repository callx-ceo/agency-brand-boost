import React, { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { CreditCard, DollarSign, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AgentPaymentOnboardingProps {
  isOpen: boolean;
  onClose: () => void;
  platformFee: number;
  proratedAmount: number;
  billingCycleEnd: Date;
}

const AgentPaymentOnboarding = ({
  isOpen,
  onClose,
  platformFee,
  proratedAmount,
  billingCycleEnd,
}: AgentPaymentOnboardingProps) => {
  const [step, setStep] = useState(1);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const { toast } = useToast();

  const initialDeposit = 250;
  const totalDue = platformFee + initialDeposit;

  const handleNext = () => {
    if (step === 2 && !agreedToTerms) {
      toast({
        title: "Agreement Required",
        description: "Please confirm you understand the billing terms.",
        variant: "destructive",
      });
      return;
    }
    setStep(step + 1);
  };

  const handlePayment = () => {
    // This would integrate with Stripe
    toast({
      title: "Payment Successful!",
      description: `Your Agent Paid account is now active with $${initialDeposit.toFixed(2)} in call credits.`,
    });
    setStep(4);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <div className="space-y-6">
          <Progress value={(step / 4) * 100} className="h-2" />

          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold">You're Moving to Agent Paid</h2>
                <p className="text-muted-foreground">Take control of your subscription and call credits</p>
              </div>

              <Card>
                <CardContent className="pt-6 space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Manage Your Own Subscription</p>
                      <p className="text-sm text-muted-foreground">
                        You'll now manage your own subscription and call credits directly.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Prorated Platform Fee</p>
                      <p className="text-sm text-muted-foreground">
                        You'll be billed a prorated amount based on the remaining billing cycle.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">${initialDeposit} Initial Call Credits</p>
                      <p className="text-sm text-muted-foreground">
                        Your first deposit becomes call credits ready to use immediately.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Full Dashboard Access</p>
                      <p className="text-sm text-muted-foreground">
                        Manage your subscription, credits, and billing anytime from your dashboard.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Button onClick={handleNext} className="w-full">
                Review My Subscription Details
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold">Converting to Agent Paid</h2>
                <p className="text-muted-foreground">You are converting from Agency Paid to Agent Paid</p>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Your Initial Charge</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center py-3">
                    <div>
                      <p className="font-medium">Platform Fee</p>
                      <p className="text-sm text-muted-foreground">Monthly subscription</p>
                    </div>
                    <p className="text-lg font-semibold">${platformFee.toFixed(2)}</p>
                  </div>

                  <div className="flex justify-between items-center py-3">
                    <div>
                      <p className="font-medium">Initial Call Credits</p>
                      <p className="text-sm text-muted-foreground">Available immediately</p>
                    </div>
                    <p className="text-lg font-semibold">${initialDeposit.toFixed(2)}</p>
                  </div>

                  <div className="border-t pt-4 flex justify-between items-center">
                    <p className="text-xl font-bold">Total Charge Today</p>
                    <p className="text-2xl font-bold text-primary">${totalDue.toFixed(2)}</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="terms"
                      checked={agreedToTerms}
                      onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                      className="mt-0.5"
                    />
                    <label htmlFor="terms" className="text-sm cursor-pointer leading-relaxed">
                      You agree that Anthropic will charge your card in the amount above now and on a recurring annual basis until you cancel in accordance with our terms. You can cancel at any time in your account settings.
                    </label>
                  </div>
                </CardContent>
              </Card>

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                  Back
                </Button>
                <Button onClick={handleNext} className="flex-1" disabled={!agreedToTerms}>
                  Continue to Payment
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold">Confirm & Pay</h2>
                <p className="text-muted-foreground">Complete your payment to activate your account</p>
              </div>

              <Card className="border-primary">
                <CardContent className="pt-6 space-y-4">
                  <div className="flex items-center gap-3 p-4 bg-primary/10 rounded-lg">
                    <CreditCard className="h-8 w-8 text-primary" />
                    <div className="flex-1">
                      <p className="font-medium">Payment Method</p>
                      <p className="text-sm text-muted-foreground">Visa •••• 4242</p>
                    </div>
                    <Button variant="outline" size="sm">Change</Button>
                  </div>

                  <div className="space-y-2 p-4 bg-muted/50 rounded-lg">
                    <div className="flex justify-between text-sm">
                      <span>Platform Fee</span>
                      <span>${platformFee.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Initial Call Credits</span>
                      <span>${initialDeposit.toFixed(2)}</span>
                    </div>
                    <div className="border-t pt-2 flex justify-between font-bold">
                      <span>Total Charge</span>
                      <span>${totalDue.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="text-sm text-muted-foreground text-center">
                    By continuing, you'll be billed ${platformFee.toFixed(2)} platform fee and ${initialDeposit.toFixed(2)} in call credits today.
                  </div>
                </CardContent>
              </Card>

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
                  Back
                </Button>
                <Button onClick={handlePayment} className="flex-1">
                  Confirm & Activate My Account
                </Button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6 text-center py-8">
              <div className="flex justify-center">
                <div className="h-20 w-20 bg-primary/10 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="h-10 w-10 text-primary" />
                </div>
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl font-bold">You're All Set!</h2>
                <p className="text-muted-foreground">
                  You're now on the Agent Paid plan!<br />
                  Your ${initialDeposit} Call Credits are ready to use.
                </p>
              </div>

              <Card className="border-primary/20 bg-primary/5">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <DollarSign className="h-8 w-8 text-primary" />
                      <div className="text-left">
                        <p className="text-sm text-muted-foreground">Call Credits Balance</p>
                        <p className="text-2xl font-bold">${initialDeposit.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Button onClick={onClose} className="w-full">
                View My Subscription & Credits
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AgentPaymentOnboarding;
