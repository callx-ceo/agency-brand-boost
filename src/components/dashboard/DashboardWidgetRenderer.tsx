
import React from "react";
import { DashboardWidget } from "./DashboardWidgetSelector";
import CallVolumeChart from "./CallVolumeChart";
import WalletPanel from "./WalletPanel";
import ApplicationsByCarrierWidget from "./widgets/ApplicationsByCarrierWidget";
import AgentLeaderboardWidget from "./widgets/AgentLeaderboardWidget";
import AgentStatusPanel from "./AgentStatusPanel";
import ActiveCampaignsTable from "./ActiveCampaignsTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DashboardWidgetRendererProps {
  widgets: DashboardWidget[];
  walletBalance: number;
  estimatedSpend: number;
}

const DashboardWidgetRenderer = ({ widgets, walletBalance, estimatedSpend }: DashboardWidgetRendererProps) => {
  const renderWidget = (widget: DashboardWidget) => {
    switch (widget.id) {
      case 'call-volume':
        return (
          <Card>
            <CardHeader>
              <CardTitle>7-Day Call Volume</CardTitle>
            </CardHeader>
            <CardContent>
              <CallVolumeChart />
            </CardContent>
          </Card>
        );
      
      case 'wallet-spending':
        return (
          <WalletPanel 
            balance={walletBalance}
            estimatedSpend={estimatedSpend}
          />
        );
      
      case 'applications-carrier':
        return <ApplicationsByCarrierWidget />;
      
      case 'agent-leaderboard':
        return <AgentLeaderboardWidget />;
      
      case 'agent-status':
        return <AgentStatusPanel />;
      
      case 'active-campaigns':
        return <ActiveCampaignsTable />;
      
      default:
        return (
          <Card>
            <CardContent className="p-6">
              <div className="text-center text-gray-500">
                Widget "{widget.title}" not implemented yet
              </div>
            </CardContent>
          </Card>
        );
    }
  };

  const getGridClass = (widget: DashboardWidget) => {
    switch (widget.size) {
      case 'small':
        return 'col-span-1';
      case 'medium':
        return 'col-span-1 lg:col-span-1';
      case 'large':
        return 'col-span-1 lg:col-span-2';
      default:
        return 'col-span-1';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {widgets.sort((a, b) => a.order - b.order).map((widget) => (
        <div key={widget.id} className={getGridClass(widget)}>
          {renderWidget(widget)}
        </div>
      ))}
    </div>
  );
};

export default DashboardWidgetRenderer;
