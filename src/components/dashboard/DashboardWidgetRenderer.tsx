
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
  console.log('Rendering widgets:', widgets);
  console.log('Wallet balance:', walletBalance, 'Estimated spend:', estimatedSpend);

  const renderWidget = (widget: DashboardWidget) => {
    console.log('Rendering widget:', widget.id, widget.title);
    
    switch (widget.id) {
      case 'call-volume':
        return (
          <div key={widget.id} className="h-full">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>7-Day Call Volume</CardTitle>
              </CardHeader>
              <CardContent>
                <CallVolumeChart />
              </CardContent>
            </Card>
          </div>
        );
      
      case 'wallet-spending':
        return (
          <div key={widget.id} className="h-full">
            <WalletPanel 
              balance={walletBalance}
              estimatedSpend={estimatedSpend}
            />
          </div>
        );
      
      case 'applications-carrier':
        return (
          <div key={widget.id} className="h-full">
            <ApplicationsByCarrierWidget />
          </div>
        );
      
      case 'agent-leaderboard':
        return (
          <div key={widget.id} className="h-full">
            <AgentLeaderboardWidget />
          </div>
        );
      
      case 'agent-status':
        return (
          <div key={widget.id} className="h-full">
            <AgentStatusPanel />
          </div>
        );
      
      case 'active-campaigns':
        return (
          <div key={widget.id} className="h-full">
            <ActiveCampaignsTable />
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

  const getGridClass = (widget: DashboardWidget) => {
    console.log('Getting grid class for widget:', widget.id, 'size:', widget.size);
    
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

  // Sort widgets by order and filter only enabled ones
  const enabledWidgets = widgets
    .filter(widget => widget.enabled)
    .sort((a, b) => a.order - b.order);

  console.log('Enabled widgets to render:', enabledWidgets);

  if (enabledWidgets.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        No widgets selected. Click "Customize Widgets" to add widgets to your dashboard.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {enabledWidgets.map((widget) => (
        <div key={`${widget.id}-${widget.order}`} className={getGridClass(widget)}>
          {renderWidget(widget)}
        </div>
      ))}
    </div>
  );
};

export default DashboardWidgetRenderer;
