
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Info, TrendingUp, Users, Phone, DollarSign, Bot, Clock, Zap, CheckCircle, ArrowUpCircle } from "lucide-react";
import { toast } from "sonner";

const BillingDashboard = () => {
  const [showCostBreakdown, setShowCostBreakdown] = useState(false);

  // Mock data - changed to starter to show upgrade flow
  const currentPlan = {
    name: "Agency Starter",
    tier: "agency_starter",
    price: 497,
    billingCycle: "monthly",
    nextBillingDate: "2024-06-15",
    status: "active",
    licenses: {
      total: 5,
      assigned: 3,
      available: 2
    }
  };

  // Mock usage data
  const usageData = {
    totalCalls: 782,
    qualifiedCalls: 614,
    avgCallDurationMinutes: 3.6,
    callConversionRate: 78.5,
    estimatedCallSpend: {
      total: 4515,
      agencyPaid: 3215,
      agentPaid: 1300
    },
    aiToolSpend: {
      total: 259,
      agencyPaid: 186.75,
      agentPaid: 72.25
    },
    telephonyCharges: {
      total: 123,
      agencyPaid: 94.10,
      agentPaid: 28.90
    },
    activeAgents: 11,
    concurrencyUtilization: 63
  };

  const isStarter = currentPlan.tier === "agency_starter";

  const handleUpgrade = () => {
    toast.success("Upgrade initiated! Redirecting to payment...");
  };

  const handleDowngrade = () => {
    toast.info("Downgrade request submitted for review");
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  const upgradeFeatures = [
    "Unlimited agent licenses",
    "White-label branding options",
    "Custom domain setup",
    "Advanced analytics & reporting",
    "Priority support",
    "Referral program access"
  ];

  return (
    <div className="space-y-6">
      {/* Plan Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Current Plan
            <Badge variant={currentPlan.status === "active" ? "default" : "secondary"}>
              {currentPlan.status}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h3 className="text-2xl font-bold">{currentPlan.name}</h3>
              <p className="text-muted-foreground">
                ${currentPlan.price}/{currentPlan.billingCycle}
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Next billing: {currentPlan.nextBillingDate}
              </p>
              
              {/* License Information */}
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Agent Licenses</span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Number of agents who can access the platform</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex-1">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Used</span>
                      <span>{currentPlan.licenses.assigned} of {currentPlan.licenses.total}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${(currentPlan.licenses.assigned / currentPlan.licenses.total) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  {currentPlan.licenses.available} licenses available
                </p>
              </div>
            </div>
            
            {/* Upgrade Benefits */}
            {isStarter && (
              <div className="border-l pl-6">
                <div className="flex items-center space-x-2 mb-3">
                  <ArrowUpCircle className="h-5 w-5 text-primary" />
                  <h4 className="font-semibold text-primary">Why Upgrade to Pro?</h4>
                </div>
                <ul className="space-y-2 mb-4">
                  {upgradeFeatures.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full">Upgrade to Pro - $997/month</Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Upgrade to Agency Pro</DialogTitle>
                      <DialogDescription>
                        Unlock advanced features and scale your agency
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                      <div className="space-y-4">
                        <h4 className="font-semibold">Current: Agency Starter</h4>
                        <ul className="space-y-2 text-sm">
                          <li>• Up to 5 agent licenses</li>
                          <li>• Basic analytics</li>
                          <li>• Standard support</li>
                          <li>• CallX branding</li>
                        </ul>
                        <p className="text-2xl font-bold">$497/month</p>
                      </div>
                      <div className="space-y-4 border-l pl-6">
                        <h4 className="font-semibold text-primary">Upgrade: Agency Pro</h4>
                        <ul className="space-y-2 text-sm">
                          <li>• Unlimited agent licenses</li>
                          <li>• Advanced analytics & reporting</li>
                          <li>• Priority support</li>
                          <li>• White-label options</li>
                          <li>• Custom domain</li>
                          <li>• Referral program</li>
                        </ul>
                        <p className="text-2xl font-bold text-primary">$997/month</p>
                      </div>
                    </div>
                    <div className="flex justify-end gap-3 mt-6">
                      <DialogTrigger asChild>
                        <Button variant="outline">Cancel</Button>
                      </DialogTrigger>
                      <Button onClick={handleUpgrade}>
                        Upgrade Now - $997/month
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            )}
            
            {!isStarter && (
              <div className="flex justify-end">
                <Button variant="outline" onClick={handleDowngrade}>
                  Request Downgrade
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Usage Summary */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Usage Summary</CardTitle>
            <div className="flex items-center space-x-2">
              <Label htmlFor="cost-breakdown">Show Full Cost Breakdown</Label>
              <Switch
                id="cost-breakdown"
                checked={showCostBreakdown}
                onCheckedChange={setShowCostBreakdown}
              />
            </div>
          </div>
          <CardDescription>Agency-paid usage for current billing period</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {/* Call Performance */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Card className="cursor-help">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">Total Calls</span>
                      </div>
                      <p className="text-2xl font-bold">{usageData.totalCalls}</p>
                    </CardContent>
                  </Card>
                </TooltipTrigger>
                <TooltipContent>
                  <p>All inbound calls received this period</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Card className="cursor-help">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">Qualified Calls</span>
                      </div>
                      <p className="text-2xl font-bold">{usageData.qualifiedCalls}</p>
                    </CardContent>
                  </Card>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Calls that met qualification criteria</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Card className="cursor-help">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">Avg Duration</span>
                      </div>
                      <p className="text-2xl font-bold">{usageData.avgCallDurationMinutes}m</p>
                    </CardContent>
                  </Card>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Average duration of qualified calls in minutes</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Card className="cursor-help">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2">
                        <Zap className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">Conversion Rate</span>
                      </div>
                      <p className="text-2xl font-bold">{usageData.callConversionRate}%</p>
                    </CardContent>
                  </Card>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Percentage of calls that were qualified</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {/* Billing Related */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Card className="cursor-help">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">Call Spend</span>
                      </div>
                      <p className="text-2xl font-bold">
                        ${showCostBreakdown ? usageData.estimatedCallSpend.total : usageData.estimatedCallSpend.agencyPaid}
                      </p>
                      {showCostBreakdown && (
                        <div className="text-xs text-muted-foreground mt-1">
                          <div>Agency: ${usageData.estimatedCallSpend.agencyPaid}</div>
                          <div>Agents: ${usageData.estimatedCallSpend.agentPaid}</div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Shows only costs currently paid by the agency. Agent-paid usage is excluded.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Card className="cursor-help">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2">
                        <Bot className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">AI Tools</span>
                      </div>
                      <p className="text-2xl font-bold">
                        ${showCostBreakdown ? usageData.aiToolSpend.total : usageData.aiToolSpend.agencyPaid}
                      </p>
                      {showCostBreakdown && (
                        <div className="text-xs text-muted-foreground mt-1">
                          <div>Agency: ${usageData.aiToolSpend.agencyPaid}</div>
                          <div>Agents: ${usageData.aiToolSpend.agentPaid}</div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Estimated cost from AI features like transcription and scoring</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Card className="cursor-help">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">Telephony</span>
                      </div>
                      <p className="text-2xl font-bold">
                        ${showCostBreakdown ? usageData.telephonyCharges.total : usageData.telephonyCharges.agencyPaid}
                      </p>
                      {showCostBreakdown && (
                        <div className="text-xs text-muted-foreground mt-1">
                          <div>Agency: ${usageData.telephonyCharges.agencyPaid}</div>
                          <div>Agents: ${usageData.telephonyCharges.agentPaid}</div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Estimated cost of telephony usage</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Card className="cursor-help">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">Active Agents</span>
                      </div>
                      <p className="text-2xl font-bold">{usageData.activeAgents}</p>
                    </CardContent>
                  </Card>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Agents who received at least 1 call this billing period</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-4">
          <Button variant="outline" onClick={() => copyToClipboard("invoice-123456")}>
            Download Latest Invoice
          </Button>
          <Button variant="outline">Update Payment Method</Button>
          <Button variant="outline">View Usage Details</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default BillingDashboard;
