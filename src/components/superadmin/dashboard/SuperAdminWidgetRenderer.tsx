
import React from "react";
import { SuperAdminWidget } from "./SuperAdminWidgetSelector";
import GlobalCallVolumeChart from "../widgets/GlobalCallVolumeChart";
import PlatformRevenueWidget from "../widgets/PlatformRevenueWidget";
import AgencyPerformanceLeaderboard from "../widgets/AgencyPerformanceLeaderboard";
import AgentPerformanceLeaderboardWidget from "../widgets/AgentPerformanceLeaderboardWidget";
import SystemCapacityWidget from "../widgets/SystemCapacityWidget";
import ComplianceMonitorWidget from "../widgets/ComplianceMonitorWidget";
import FraudDetectionWidget from "../widgets/FraudDetectionWidget";
import AdvertiserSpendAnalytics from "../widgets/AdvertiserSpendAnalytics";
import PublisherRevenueWidget from "../widgets/PublisherRevenueWidget";
import UserActivityWidget from "../widgets/UserActivityWidget";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SuperAdminWidgetRendererProps {
  widgets: SuperAdminWidget[];
  platformRevenue: number;
  systemMetrics: {
    uptime: number;
    capacity: number;
    compliance: number;
    alerts: number;
  };
}

const SuperAdminWidgetRenderer = ({ widgets, platformRevenue, systemMetrics }: SuperAdminWidgetRendererProps) => {
  console.log('SuperAdmin - Rendering widgets:', widgets);
  console.log('SuperAdmin - Platform revenue:', platformRevenue, 'System metrics:', systemMetrics);

  const renderWidget = (widget: SuperAdminWidget) => {
    console.log('SuperAdmin - Rendering widget:', widget.id, widget.title);
    
    switch (widget.id) {
      case 'global-call-volume':
        return (
          <div key={widget.id} className="h-full">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-lg">Global Call Volume</CardTitle>
              </CardHeader>
              <CardContent>
                <GlobalCallVolumeChart />
              </CardContent>
            </Card>
          </div>
        );
      
      case 'platform-revenue':
        return (
          <div key={widget.id} className="h-full">
            <PlatformRevenueWidget revenue={platformRevenue} />
          </div>
        );
      
      case 'agency-leaderboard':
        return (
          <div key={widget.id} className="h-full">
            <AgencyPerformanceLeaderboard />
          </div>
        );
      
      case 'agent-performance-leaderboard':
        return (
          <div key={widget.id} className="h-full">
            <AgentPerformanceLeaderboardWidget />
          </div>
        );
      
      case 'system-capacity':
        return (
          <div key={widget.id} className="h-full">
            <SystemCapacityWidget 
              capacity={systemMetrics.capacity}
              uptime={systemMetrics.uptime}
            />
          </div>
        );
      
      case 'compliance-monitor':
        return (
          <div key={widget.id} className="h-full">
            <ComplianceMonitorWidget score={systemMetrics.compliance} />
          </div>
        );
      
      case 'fraud-detection':
        return (
          <div key={widget.id} className="h-full">
            <FraudDetectionWidget alerts={systemMetrics.alerts} />
          </div>
        );
      
      case 'advertiser-spend':
        return (
          <div key={widget.id} className="h-full">
            <AdvertiserSpendAnalytics />
          </div>
        );
      
      case 'publisher-revenue':
        return (
          <div key={widget.id} className="h-full">
            <PublisherRevenueWidget />
          </div>
        );
      
      case 'user-activity':
        return (
          <div key={widget.id} className="h-full">
            <UserActivityWidget />
          </div>
        );
      
      default:
        return (
          <div key={widget.id} className="h-full">
            <Card className="h-full">
              <CardContent className="p-6 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  Widget "{widget.title}" not implemented yet
                </div>
              </CardContent>
            </Card>
          </div>
        );
    }
  };

  const getGridClass = (widget: SuperAdminWidget) => {
    console.log('SuperAdmin - Getting grid class for widget:', widget.id, 'size:', widget.size);
    
    switch (widget.size) {
      case 'small':
        return 'col-span-1';
      case 'medium':
        return 'col-span-1 lg:col-span-1';
      case 'large':
        return 'col-span-1 lg:col-span-2';
      case 'extra-large':
        return 'col-span-1 lg:col-span-3 xl:col-span-2';
      default:
        return 'col-span-1';
    }
  };

  const enabledWidgets = widgets
    .filter(widget => widget.enabled)
    .sort((a, b) => a.order - b.order);

  console.log('SuperAdmin - Enabled widgets to render:', enabledWidgets);

  if (enabledWidgets.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        No widgets selected. Click "Customize Widgets" to add widgets to your dashboard.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {enabledWidgets.map((widget) => (
        <div key={`${widget.id}-${widget.order}`} className={getGridClass(widget)}>
          {renderWidget(widget)}
        </div>
      ))}
    </div>
  );
};

export default SuperAdminWidgetRenderer;
