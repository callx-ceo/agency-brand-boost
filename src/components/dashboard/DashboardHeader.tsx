
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Settings, Layout, Phone, CheckCircle } from "lucide-react";

interface DashboardHeaderProps {
  liveCalls: number;
  completedCalls: number;
  fallbackCallsToday: number;
  onCustomizeKPIs: () => void;
  onCustomizeWidgets?: () => void;
}

const DashboardHeader = ({ 
  liveCalls, 
  completedCalls,
  fallbackCallsToday, 
  onCustomizeKPIs,
  onCustomizeWidgets 
}: DashboardHeaderProps) => {
  return (
    <div className="flex justify-between items-start">
      <div>
        <h1 className="text-3xl font-bold mb-2">Agency Dashboard</h1>
        <div className="flex items-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-green-500" />
            <span className="text-foreground font-medium">Live:</span>
            <span className="text-green-600 font-semibold">{liveCalls}</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-blue-500" />
            <span className="text-foreground font-medium">Completed:</span>
            <span className="text-blue-600 font-semibold">{completedCalls}</span>
          </div>
          {fallbackCallsToday > 0 && (
            <Badge variant="destructive">{fallbackCallsToday} fallback calls</Badge>
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
        {onCustomizeWidgets && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onCustomizeWidgets}
            className="flex items-center gap-2"
          >
            <Layout className="w-4 h-4" />
            Customize Widgets
          </Button>
        )}
      </div>
    </div>
  );
};

export default DashboardHeader;
