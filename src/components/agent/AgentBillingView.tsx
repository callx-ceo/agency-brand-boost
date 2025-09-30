import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CreditCard, DollarSign, Phone, TrendingUp, Clock, CheckCircle2, Calendar } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const AgentBillingView = () => {
  // Mock agent billing data
  const agentPlan = {
    name: "Agent Pro",
    price: 49,
    billingCycle: "monthly",
    nextBillingDate: "2024-06-15",
    status: "active"
  };

  const callCharges = {
    totalCalls: 156,
    qualifiedCalls: 124,
    avgCallDuration: 4.2,
    totalCallCost: 872,
    agentResponsibleAmount: 348, // What agent pays
    agencyCoversAmount: 524, // What agency covers
    costPerQualifiedCall: 7.03
  };

  const currentPeriod = {
    periodStart: "May 1, 2024",
    periodEnd: "May 31, 2024",
    callMinutesUsed: 654,
    callMinutesIncluded: 1000,
    aiToolUsage: 45.50,
    telephonyCharges: 23.80
  };

  return (
    <div className="space-y-6">
      {/* Current Plan Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Your Billing Plan
              </CardTitle>
              <CardDescription className="mt-2">
                Manage your personal agent billing and call charges
              </CardDescription>
            </div>
            <Badge variant="default" className="h-fit">
              <CheckCircle2 className="w-3 h-3 mr-1" />
              {agentPlan.status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-baseline justify-between">
            <div>
              <h3 className="text-2xl font-bold">{agentPlan.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">Base subscription fee</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">${agentPlan.price}</div>
              <div className="text-sm text-muted-foreground">per month</div>
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Billing Cycle</div>
              <div className="font-medium capitalize">{agentPlan.billingCycle}</div>
            </div>
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                Next Billing Date
              </div>
              <div className="font-medium">{agentPlan.nextBillingDate}</div>
            </div>
          </div>

          <Button variant="outline" className="w-full">
            Upgrade Plan
          </Button>
        </CardContent>
      </Card>

      {/* Call Charges Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Phone className="w-5 h-5" />
            Call Charges (Current Period)
          </CardTitle>
          <CardDescription>
            {currentPeriod.periodStart} - {currentPeriod.periodEnd}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Total Calls</div>
              <div className="text-2xl font-bold">{callCharges.totalCalls}</div>
              <div className="text-xs text-muted-foreground">
                {callCharges.qualifiedCalls} qualified
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Avg Duration</div>
              <div className="text-2xl font-bold flex items-baseline gap-1">
                {callCharges.avgCallDuration}
                <span className="text-sm font-normal text-muted-foreground">min</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Cost Per Call</div>
              <div className="text-2xl font-bold">${callCharges.costPerQualifiedCall}</div>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div>
                <div className="font-medium">Total Call Costs</div>
                <div className="text-sm text-muted-foreground mt-1">
                  All charges for this billing period
                </div>
              </div>
              <div className="text-2xl font-bold">${callCharges.totalCallCost.toFixed(2)}</div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">Agency Covers</div>
                <div className="font-medium text-green-600">
                  -${callCharges.agencyCoversAmount.toFixed(2)}
                </div>
              </div>
              <div className="flex items-center justify-between text-lg">
                <div className="font-semibold">You Pay</div>
                <div className="font-bold">${callCharges.agentResponsibleAmount.toFixed(2)}</div>
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Call Minutes Used</span>
              <span className="text-sm font-medium">
                {currentPeriod.callMinutesUsed} / {currentPeriod.callMinutesIncluded}
              </span>
            </div>
            <Progress 
              value={(currentPeriod.callMinutesUsed / currentPeriod.callMinutesIncluded) * 100} 
            />
          </div>
        </CardContent>
      </Card>

      {/* Additional Charges Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="w-5 h-5" />
            Additional Charges
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="font-medium">AI Tool Usage</div>
                <div className="text-sm text-muted-foreground">Speech recognition, AI insights</div>
              </div>
            </div>
            <div className="font-bold">${currentPeriod.aiToolUsage.toFixed(2)}</div>
          </div>

          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Phone className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="font-medium">Telephony Charges</div>
                <div className="text-sm text-muted-foreground">Inbound/outbound minutes</div>
              </div>
            </div>
            <div className="font-bold">${currentPeriod.telephonyCharges.toFixed(2)}</div>
          </div>

          <Separator />

          <div className="flex items-center justify-between p-4 bg-primary/5 rounded-lg">
            <div className="font-semibold">Estimated Total This Period</div>
            <div className="text-xl font-bold">
              ${(agentPlan.price + callCharges.agentResponsibleAmount + currentPeriod.aiToolUsage + currentPeriod.telephonyCharges).toFixed(2)}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Method Card */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Method</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <CreditCard className="w-5 h-5" />
              <div>
                <div className="font-medium">•••• •••• •••• 4242</div>
                <div className="text-sm text-muted-foreground">Expires 12/2025</div>
              </div>
            </div>
            <Button variant="outline" size="sm">Update</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AgentBillingView;
