
import React from "react";
import { SuperAdminViewType } from "@/types/superAdminTypes";
import SuperAdminDashboardHeader from "./SuperAdminDashboardHeader";
import GlobalNavigationTabs from "./GlobalNavigationTabs";
import ExecutiveKPIGrid from "./ExecutiveKPIGrid";
import SuperAdminWidgetRenderer from "./SuperAdminWidgetRenderer";
import { ExecutiveKPIConfig } from "./ExecutiveKPISelector";
import { SuperAdminWidget } from "./SuperAdminWidgetSelector";
import { mockExecutiveDashboardData, getKPIValue } from "../data/mockExecutiveData";
import AIRecommendationsWidget from "../widgets/AIRecommendationsWidget";

interface SuperAdminDashboardContentProps {
  activeView: SuperAdminViewType;
  selectedKPIs: ExecutiveKPIConfig[];
  selectedWidgets: SuperAdminWidget[];
  onViewChange: (view: SuperAdminViewType) => void;
  onCustomizeKPIs: () => void;
  onCustomizeWidgets: () => void;
}

const SuperAdminDashboardContent = ({
  activeView,
  selectedKPIs,
  selectedWidgets,
  onViewChange,
  onCustomizeKPIs,
  onCustomizeWidgets
}: SuperAdminDashboardContentProps) => {
  return (
    <div className="space-y-6">
      <SuperAdminDashboardHeader
        totalCallsToday={mockExecutiveDashboardData.totalCallVolume}
        liveCalls={mockExecutiveDashboardData.liveCalls}
        endedCalls={mockExecutiveDashboardData.endedCalls}
        activeAgencies={mockExecutiveDashboardData.activeAgencies}
        systemUptime={mockExecutiveDashboardData.systemUptime}
        activeAlerts={mockExecutiveDashboardData.activeSecurityAlerts}
        onCustomizeKPIs={onCustomizeKPIs}
        onCustomizeWidgets={onCustomizeWidgets}
      />

      <GlobalNavigationTabs
        activeView={activeView}
        onViewChange={onViewChange}
      />

      <ExecutiveKPIGrid
        selectedKPIs={selectedKPIs}
        getKPIValue={getKPIValue}
      />

      <AIRecommendationsWidget />

      <SuperAdminWidgetRenderer
        widgets={selectedWidgets}
        platformRevenue={mockExecutiveDashboardData.totalPlatformRevenue}
        systemMetrics={{
          uptime: mockExecutiveDashboardData.systemUptime,
          capacity: mockExecutiveDashboardData.systemCapacityUtilization,
          compliance: mockExecutiveDashboardData.complianceScore,
          alerts: mockExecutiveDashboardData.activeSecurityAlerts
        }}
      />
    </div>
  );
};

export default SuperAdminDashboardContent;
