import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CreditCard,
  DollarSign,
  Calendar,
  TrendingUp,
  Plus,
  Download,
  AlertCircle,
  CheckCircle2,
  Settings,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import CallCreditsHistory from "./CallCreditsHistory";
import PaymentMethodsManager from "./PaymentMethodsManager";
import SubscriptionInvoices from "./SubscriptionInvoices";

const AgentSubscriptionDashboard = () => {
  const { toast } = useToast();
  const [autoRefillEnabled, setAutoRefillEnabled] = useState(false);

  // Mock data - would come from Supabase
  const subscription = {
    status: "active",
    planName: "Agent Paid Plan",
    platformFee: 99.0,
    renewalDate: new Date(2025, 11, 1),
    callCreditsBalance: 73.45,
    autoRefillThreshold: 25.0,
    autoRefillAmount: 100.0,
  };

  const creditsPercentage = (subscription.callCreditsBalance / 100) * 100;
  const isLowBalance = subscription.callCreditsBalance < subscription.autoRefillThreshold;

  const handleAddFunds = () => {
    toast({
      title: "Add Funds",
      description: "Opening payment modal...",
    });
  };

  const handleToggleAutoRefill = (enabled: boolean) => {
    setAutoRefillEnabled(enabled);
    toast({
      title: enabled ? "Auto-Refill Enabled" : "Auto-Refill Disabled",
      description: enabled
        ? `Your balance will auto-refill with $${subscription.autoRefillAmount} when it drops below $${subscription.autoRefillThreshold}.`
        : "You'll need to manually add funds when your balance is low.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Subscription & Credits</h2>
          <p className="text-muted-foreground">Manage your billing and call credits</p>
        </div>
        <Badge variant={subscription.status === "active" ? "default" : "secondary"} className="text-sm">
          {subscription.status === "active" ? "Active" : "Inactive"}
        </Badge>
      </div>

      {/* Low Balance Alert */}
      {isLowBalance && (
        <Card className="border-yellow-500/50 bg-yellow-500/10">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5" />
              <div className="flex-1">
                <p className="font-medium">Low Call Credits Balance</p>
                <p className="text-sm text-muted-foreground">
                  Your balance is below ${subscription.autoRefillThreshold}. Add funds to continue making calls.
                </p>
              </div>
              <Button onClick={handleAddFunds} size="sm">
                Add Funds
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Call Credits Balance */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Call Credits Balance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-end gap-2">
              <span className="text-4xl font-bold">${subscription.callCreditsBalance.toFixed(2)}</span>
              <span className="text-muted-foreground mb-1">available</span>
            </div>
            <Progress value={creditsPercentage} className="h-3" />
            <div className="flex gap-3">
              <Button onClick={handleAddFunds} className="flex-1">
                <Plus className="h-4 w-4 mr-2" />
                Add Funds
              </Button>
              <Button variant="outline" className="flex-1">
                <Settings className="h-4 w-4 mr-2" />
                Configure
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Current Plan */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5" />
              Current Plan
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Plan</p>
              <p className="text-xl font-bold">{subscription.planName}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Platform Fee</p>
              <p className="text-2xl font-bold">${subscription.platformFee}/mo</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Next Billing</p>
              <div className="flex items-center gap-2 mt-1">
                <Calendar className="h-4 w-4" />
                <p className="font-medium">
                  {subscription.renewalDate.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Auto-Refill Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Auto-Refill Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="font-medium">Enable Auto-Refill</p>
              <p className="text-sm text-muted-foreground">
                Automatically add ${subscription.autoRefillAmount} when balance drops below $
                {subscription.autoRefillThreshold}
              </p>
            </div>
            <Switch checked={autoRefillEnabled} onCheckedChange={handleToggleAutoRefill} />
          </div>
          {autoRefillEnabled && (
            <div className="p-4 bg-muted/50 rounded-lg space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Refill Threshold</span>
                <span className="font-medium">${subscription.autoRefillThreshold}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Refill Amount</span>
                <span className="font-medium">${subscription.autoRefillAmount}</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Detailed Tabs */}
      <Tabs defaultValue="history" className="w-full">
        <TabsList>
          <TabsTrigger value="history">Transaction History</TabsTrigger>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
          <TabsTrigger value="payment-methods">Payment Methods</TabsTrigger>
        </TabsList>

        <TabsContent value="history">
          <CallCreditsHistory />
        </TabsContent>

        <TabsContent value="invoices">
          <SubscriptionInvoices />
        </TabsContent>

        <TabsContent value="payment-methods">
          <PaymentMethodsManager />
        </TabsContent>
      </Tabs>

      {/* Cancel/Pause Options */}
      <Card className="border-destructive/20">
        <CardHeader>
          <CardTitle className="text-destructive">Subscription Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="outline" className="w-full justify-start">
            Pause Subscription
          </Button>
          <Button variant="outline" className="w-full justify-start text-destructive hover:text-destructive">
            Cancel Subscription
          </Button>
          <p className="text-xs text-muted-foreground">
            Pausing stops new call routing but keeps your data. Canceling removes access after the current billing period.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AgentSubscriptionDashboard;
