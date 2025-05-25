
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";

interface DashboardHeaderProps {
  totalCallsToday: number;
  fallbackCallsToday: number;
  onCustomizeKPIs: () => void;
}

const DashboardHeader = ({ 
  totalCallsToday, 
  fallbackCallsToday, 
  onCustomizeKPIs 
}: DashboardHeaderProps) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold">Agency Dashboard</h1>
        <p className="text-gray-600">Real-time KPIs and operational insights</p>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={onCustomizeKPIs}>
          <Settings className="w-4 h-4 mr-2" />
          Customize KPIs
        </Button>
        <Badge variant="secondary">{totalCallsToday} calls today</Badge>
        {fallbackCallsToday > 0 && (
          <Badge variant="destructive">{fallbackCallsToday} fallbacks</Badge>
        )}
      </div>
    </div>
  );
};

export default DashboardHeader;
