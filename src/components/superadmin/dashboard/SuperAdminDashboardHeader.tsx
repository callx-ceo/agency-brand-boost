
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Settings, Layout, AlertTriangle, Activity } from "lucide-react";

interface SuperAdminDashboardHeaderProps {
  totalCallsToday: number;
  activeAgencies: number;
  systemUptime: number;
  activeAlerts: number;
  onCustomizeKPIs: () => void;
  onCustomizeWidgets: () => void;
}

const SuperAdminDashboardHeader = ({ 
  totalCallsToday, 
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
        <div className="flex items-center gap-6 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4" />
            Today: {totalCallsToday.toLocaleString()} calls
          </div>
          <div className="flex items-center gap-2">
            System Uptime: <Badge variant="outline" className="text-green-600">{systemUptime}%</Badge>
          </div>
          <div className="flex items-center gap-2">
            Active Agencies: <Badge variant="secondary">{activeAgencies}</Badge>
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
