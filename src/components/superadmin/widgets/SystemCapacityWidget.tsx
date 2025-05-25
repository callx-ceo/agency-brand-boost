
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Server, Database, Cpu } from "lucide-react";

interface SystemCapacityWidgetProps {
  capacity: number;
  uptime: number;
}

const SystemCapacityWidget = ({ capacity, uptime }: SystemCapacityWidgetProps) => {
  const metrics = [
    { label: "CPU Usage", value: 45, icon: <Cpu className="h-4 w-4" />, color: "bg-blue-500" },
    { label: "Memory", value: 67, icon: <Server className="h-4 w-4" />, color: "bg-green-500" },
    { label: "Database", value: 52, icon: <Database className="h-4 w-4" />, color: "bg-purple-500" },
    { label: "Network", value: 38, icon: <Activity className="h-4 w-4" />, color: "bg-orange-500" }
  ];

  const getStatusColor = (value: number) => {
    if (value >= 80) return "text-red-600";
    if (value >= 60) return "text-orange-600";
    return "text-green-600";
  };

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">System Capacity</CardTitle>
        <Activity className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <div className="text-2xl font-bold">{capacity}%</div>
          <p className="text-xs text-muted-foreground">Overall Utilization</p>
        </div>

        <div className="space-y-3">
          {metrics.map((metric) => (
            <div key={metric.label} className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  {metric.icon}
                  <span>{metric.label}</span>
                </div>
                <span className={`font-medium ${getStatusColor(metric.value)}`}>
                  {metric.value}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${metric.color}`} 
                  style={{ width: `${metric.value}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-2 border-t text-center">
          <div className="text-sm">
            <span className="text-muted-foreground">Uptime: </span>
            <span className="font-medium text-green-600">{uptime}%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SystemCapacityWidget;
