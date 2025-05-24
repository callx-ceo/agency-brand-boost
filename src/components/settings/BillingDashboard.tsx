import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { CheckCircle, Users, Crown, Zap, HelpCircle, Phone, Clock, TrendingUp, DollarSign, Bot, Headphones } from "lucide-react";
import DowngradeModal from "./DowngradeModal";

// Mock data for billing overview with new Agency pricing tiers
const mockBillingOverview = {
  currentBalance: 125.50,
  nextInvoiceDate: "2023-11-01",
  billingCycle: "1st - 30th of month",
  currentPlan: { 
    tier: "agency_pro", // agency_starter or agency_pro
    name: "Agency Pro (White Label)", 
    price: 1000, 
    currency: "USD", 
    includedSeats: 10,
    usedSeats: 13,
    extraSeatPrice: 97,
    whiteLabelEnabled: true,
    description: "Includes 10 agent seats. White label, custom domains, full branding."
  },
  primaryPaymentMethod: { type: "card", last4: "1234", brand: "Visa", expiryMonth: "08", expiryYear: "2024", isAutoPayEnabled: true },
  usageSummary: { 
    totalCalls: 782,
    qualifiedCalls: 614,
    billableMinutes: 7800,
    avgCallDurationMinutes: 3.6,
    callConversionRate: 78.5,
    estimatedCallSpend: 4125.00,
    aiUsageCost: 186.75,
    telephonyCharges: 94.10,
    activeAgents: 11,
    concurrencyUtilization: 63
  },
  wallet: { balance: 50.00, currency: "USD" }
};

const BillingDashboard = () => {
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [showDowngradeModal, setShowDowngradeModal] = useState(false);
  const { currentPlan, usageSummary } = mockBillingOverview;
  
  const extraSeats = Math.max(0, currentPlan.usedSeats - currentPlan.includedSeats);
  const totalMonthlyCharges = currentPlan.price + (extraSeats * currentPlan.extraSeatPrice);

  const isStarter = currentPlan.tier === "agency_starter";
  const isPro = currentPlan.tier === "agency_pro";

  const handleUpgrade = () => {
    // This would typically call Stripe checkout or billing portal
    console.log("Initiating upgrade to Pro plan");
    setShowUpgradeModal(false);
  };

  const MetricCard = ({ 
    icon: Icon, 
    label, 
    value, 
    tooltip,
    className = ""
  }: {
    icon: React.ElementType;
    label: string;
    value: string | number;
    tooltip: string;
    className?: string;
  }) => (
    <div className={`p-4 bg-gray-50 rounded-md ${className}`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Icon className="h-4 w-4 text-gray-600" />
          <div className="text-sm text-gray-500">{label}</div>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <HelpCircle className="h-3 w-3 text-gray-400" />
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-xs text-xs">{tooltip}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="text-xl font-medium">{value}</div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Current Balance Card */}
        <Card>
          <CardHeader>
            <CardTitle>Current Balance</CardTitle>
            <CardDescription>Your current billing status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              ${mockBillingOverview.currentBalance.toFixed(2)}
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Next invoice on {mockBillingOverview.nextInvoiceDate}
            </p>
            <p className="text-sm text-gray-500">
              Billing cycle: {mockBillingOverview.billingCycle}
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="outline">Pay Now</Button>
          </CardFooter>
        </Card>

        {/* Current Plan Card - Updated with Agency Tiers */}
        <Card>
          <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-3">
            <div>
              <CardTitle className="flex items-center gap-2">
                {isPro ? <Crown className="h-5 w-5 text-yellow-500" /> : <Users className="h-5 w-5 text-blue-500" />}
                {currentPlan.name}
              </CardTitle>
              <CardDescription className="mt-1">
                {currentPlan.description}
              </CardDescription>
            </div>
            {isPro && (
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                <CheckCircle className="h-3 w-3 mr-1" />
                White Label
              </Badge>
            )}
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="text-2xl font-bold">
                ${currentPlan.price.toLocaleString()}/month
              </div>
              <p className="text-sm text-gray-600">
                {currentPlan.includedSeats} agent seats included
              </p>
              <p className="text-xs text-gray-500">
                Additional seats: ${currentPlan.extraSeatPrice}/month each
              </p>
            </div>
            
            <div className="p-3 bg-gray-50 rounded-md">
              <div className="text-sm">
                <span className="font-medium">Currently using:</span>{" "}
                <span className="text-lg font-semibold">{currentPlan.usedSeats}</span> of{" "}
                <span className="font-medium">{currentPlan.includedSeats}</span> included seats
              </div>
              {extraSeats > 0 && (
                <div className="text-sm mt-1 text-orange-600">
                  {extraSeats} additional seat{extraSeats > 1 ? 's' : ''} billed at ${currentPlan.extraSeatPrice}/month
                </div>
              )}
              <div className="text-sm mt-2 pt-2 border-t border-gray-200">
                <span className="font-medium">Total monthly charges: ${totalMonthlyCharges.toLocaleString()}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            {isStarter ? (
              <Dialog open={showUpgradeModal} onOpenChange={setShowUpgradeModal}>
                <DialogTrigger asChild>
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    <Zap className="h-4 w-4 mr-2" />
                    Upgrade to Pro
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Upgrade to Agency Pro</DialogTitle>
                    <DialogDescription>
                      Unlock white label features and get more agent seats included.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <h4 className="font-semibold text-lg">Agency Pro Benefits:</h4>
                      <ul className="mt-2 space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          10 agent seats included (vs 3 in Starter)
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          Full white label platform access
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          Custom domain configuration
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          Complete branding customization
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          Priority support
                        </li>
                      </ul>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="text-lg font-semibold">$1,000/month</div>
                      <div className="text-sm text-gray-600">Save $191/month vs paying per seat</div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setShowUpgradeModal(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleUpgrade}>
                      Upgrade Now
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            ) : (
              <div className="w-full space-y-3">
                <div className="text-center">
                  <Badge variant="outline" className="text-green-700 border-green-200 bg-green-50">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    On White Label Plan
                  </Badge>
                  <p className="text-xs text-gray-500 mt-2">
                    Contact support to upgrade to Enterprise
                  </p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full text-red-600 border-red-200 hover:bg-red-50"
                  onClick={() => setShowDowngradeModal(true)}
                >
                  Request Downgrade
                </Button>
              </div>
            )}
          </CardFooter>
        </Card>
      </div>

      {/* Enhanced Usage Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Usage Summary (Current Period)</CardTitle>
          <CardDescription>Comprehensive view of your agency's performance and billing metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {/* Call Performance Metrics */}
            <MetricCard
              icon={Phone}
              label="Total Calls Received"
              value={usageSummary.totalCalls.toLocaleString()}
              tooltip="All inbound calls received this period, including unqualified or short-duration calls."
            />
            
            <MetricCard
              icon={CheckCircle}
              label="Qualified Calls"
              value={usageSummary.qualifiedCalls.toLocaleString()}
              tooltip="Calls that met your qualification criteria and generated billable activity."
            />
            
            <MetricCard
              icon={Clock}
              label="Avg Call Duration"
              value={`${usageSummary.avgCallDurationMinutes}m`}
              tooltip="Average duration of qualified calls in minutes."
            />
            
            <MetricCard
              icon={TrendingUp}
              label="Call Conversion Rate"
              value={`${usageSummary.callConversionRate}%`}
              tooltip="Percentage of calls that were considered qualified."
            />
            
            {/* Billing-Related Usage */}
            <MetricCard
              icon={DollarSign}
              label="Estimated Call Spend"
              value={`$${usageSummary.estimatedCallSpend.toFixed(2)}`}
              tooltip="Estimated cost of all qualified calls based on campaign pricing or minute rates."
            />
            
            <MetricCard
              icon={Bot}
              label="AI Tool Spend"
              value={`$${usageSummary.aiUsageCost.toFixed(2)}`}
              tooltip="Estimated cost from AI features like transcription, scoring, or coaching."
            />
            
            <MetricCard
              icon={Phone}
              label="Telephony Charges"
              value={`$${usageSummary.telephonyCharges.toFixed(2)}`}
              tooltip="Estimated cost of telephony usage (if metered)."
            />
            
            {/* Agent Metrics */}
            <MetricCard
              icon={Users}
              label="Active Agents"
              value={usageSummary.activeAgents}
              tooltip="Agents who received at least 1 call this billing period."
            />
            
            <MetricCard
              icon={Headphones}
              label="Concurrency Utilization"
              value={`${usageSummary.concurrencyUtilization}%`}
              tooltip="Average percentage of max call concurrency used across agents."
            />
            
            {/* Legacy metric for backward compatibility */}
            <MetricCard
              icon={Clock}
              label="Billable Minutes"
              value={usageSummary.billableMinutes.toLocaleString()}
              tooltip="Total billable minutes across all qualified calls."
            />
          </div>
        </CardContent>
      </Card>

      {/* Wallet Balance */}
      <Card>
        <CardHeader>
          <CardTitle>Prepaid Wallet</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-between items-center">
          <div>
            <div className="text-sm text-gray-500">Current Balance</div>
            <div className="text-2xl font-medium mt-1">
              ${mockBillingOverview.wallet.balance.toFixed(2)}
            </div>
          </div>
          <Button>Add Funds</Button>
        </CardContent>
      </Card>

      {/* Primary Payment Method */}
      <Card>
        <CardHeader>
          <CardTitle>Primary Payment Method</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="bg-gray-100 h-12 w-16 rounded flex items-center justify-center">
              {mockBillingOverview.primaryPaymentMethod.brand}
            </div>
            <div>
              <div className="font-medium">
                {mockBillingOverview.primaryPaymentMethod.brand} **** {mockBillingOverview.primaryPaymentMethod.last4}
              </div>
              <div className="text-sm text-gray-500">
                Expires {mockBillingOverview.primaryPaymentMethod.expiryMonth}/{mockBillingOverview.primaryPaymentMethod.expiryYear}
              </div>
            </div>
          </div>
          <Button variant="outline">Manage Payment Methods</Button>
        </CardContent>
      </Card>

      {/* Downgrade Modal */}
      <DowngradeModal
        open={showDowngradeModal}
        onOpenChange={setShowDowngradeModal}
        currentPlan={currentPlan.tier}
        agencyId="mock-agency-id"
      />
    </div>
  );
};

export default BillingDashboard;
