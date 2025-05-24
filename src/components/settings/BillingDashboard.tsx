
import React, { useState } from "react";
import PlanOverview from "./PlanOverview";
import UsageSummary from "./UsageSummary";
import QuickActions from "./QuickActions";

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
      total: 3,
      assigned: 3,
      available: 0
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

  return (
    <div className="space-y-6">
      <PlanOverview currentPlan={currentPlan} />
      <UsageSummary 
        usageData={usageData}
        showCostBreakdown={showCostBreakdown}
        onToggleCostBreakdown={setShowCostBreakdown}
      />
      <QuickActions />
    </div>
  );
};

export default BillingDashboard;
