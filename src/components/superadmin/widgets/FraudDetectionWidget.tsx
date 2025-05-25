
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Shield, Eye, TrendingDown } from "lucide-react";

interface FraudDetectionWidgetProps {
  alerts: number;
}

const FraudDetectionWidget = ({ alerts }: FraudDetectionWidgetProps) => {
  const recentAlerts = [
    { id: 1, type: "Suspicious Login", severity: "high", time: "5 min ago", location: "Unknown IP" },
    { id: 2, type: "Unusual Call Pattern", severity: "medium", time: "1 hour ago", location: "Agency #23" },
    { id: 3, type: "Payment Anomaly", severity: "low", time: "3 hours ago", location: "Advertiser Portal" }
  ];

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "high": return <Badge variant="destructive">High</Badge>;
      case "medium": return <Badge variant="secondary" className="bg-orange-100 text-orange-800">Medium</Badge>;
      case "low": return <Badge variant="outline">Low</Badge>;
      default: return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "high": return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case "medium": return <Eye className="h-4 w-4 text-orange-600" />;
      case "low": return <Shield className="h-4 w-4 text-green-600" />;
      default: return <AlertTriangle className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Fraud Detection</CardTitle>
        <AlertTriangle className="h-4 w-4 text-red-600" />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <div className={`text-2xl font-bold ${alerts > 0 ? 'text-red-600' : 'text-green-600'}`}>
            {alerts}
          </div>
          <p className="text-xs text-muted-foreground">Active Alerts</p>
        </div>

        <div className="space-y-2">
          <div className="text-sm font-medium mb-2">Recent Alerts</div>
          {recentAlerts.map((alert) => (
            <div key={alert.id} className="flex items-start justify-between p-2 border rounded hover:bg-gray-50">
              <div className="flex items-start gap-2">
                {getSeverityIcon(alert.severity)}
                <div>
                  <div className="text-sm font-medium">{alert.type}</div>
                  <div className="text-xs text-muted-foreground">{alert.location}</div>
                </div>
              </div>
              <div className="text-right">
                {getSeverityBadge(alert.severity)}
                <div className="text-xs text-muted-foreground mt-1">{alert.time}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-2 border-t">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">24h Trend</span>
            <div className="flex items-center text-green-600">
              <TrendingDown className="h-3 w-3 mr-1" />
              <span>-23%</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FraudDetectionWidget;
