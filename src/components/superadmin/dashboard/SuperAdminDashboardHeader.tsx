
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Settings, Layout, AlertTriangle, Activity, Phone, CheckCircle } from "lucide-react";

interface SuperAdminDashboardHeaderProps {
  totalCallsToday: number;
  liveCalls: number;
  endedCalls: number;
  activeAgencies: number;
  systemUptime: number;
  activeAlerts: number;
  onCustomizeKPIs: () => void;
  onCustomizeWidgets: () => void;
}

const SuperAdminDashboardHeader = ({ 
  totalCallsToday,
  liveCalls,
  endedCalls,
  activeAgencies,
  systemUptime,
  activeAlerts,
  onCustomizeKPIs,
  onCustomizeWidgets 
}: SuperAdminDashboardHeaderProps) => {
  return (
    <div className="flex justify-between items-start">
      <div>
        <h1 className="text-3xl font-bold mb-2">SuperAdmin Dashboard</h1>
        <div className="flex items-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-green-500" />
            <span className="text-foreground font-medium">Live:</span>
            <span className="text-green-600 font-semibold">{liveCalls}</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-blue-500" />
            <span className="text-foreground font-medium">Ended:</span>
            <span className="text-blue-600 font-semibold">{endedCalls}</span>
          </div>
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4" />
            <span className="text-foreground font-medium">Today:</span>
            <span className="font-semibold">{totalCallsToday.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-foreground font-medium">Uptime:</span>
            <Badge variant="outline" className="text-green-600">{systemUptime}%</Badge>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-foreground font-medium">Agencies:</span>
            <Badge variant="secondary">{activeAgencies}</Badge>
          </div>
          {activeAlerts > 0 && (
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-500" />
              <Badge variant="destructive">{activeAlerts} active alerts</Badge>
            </div>
          )}
        </div>
      </div>
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onCustomizeKPIs}
          className="flex items-center gap-2"
        >
          <Settings className="w-4 h-4" />
          Customize KPIs
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onCustomizeWidgets}
          className="flex items-center gap-2"
        >
          <Layout className="w-4 h-4" />
          Customize Widgets
        </Button>
      </div>
    </div>
  );
};

export default SuperAdminDashboardHeader;
