
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Activity, Server, Database, Wifi, AlertTriangle, CheckCircle } from "lucide-react";

interface SystemHealthMonitorProps {
  onBackToDashboard: () => void;
}

const SystemHealthMonitor = ({ onBackToDashboard }: SystemHealthMonitorProps) => {
  const systemServices = [
    { name: "API Gateway", status: "healthy", uptime: "99.98%", responseTime: "45ms" },
    { name: "Database Cluster", status: "healthy", uptime: "99.95%", responseTime: "12ms" },
    { name: "Call Processing", status: "warning", uptime: "98.76%", responseTime: "180ms" },
    { name: "Authentication", status: "healthy", uptime: "100%", responseTime: "23ms" },
    { name: "File Storage", status: "healthy", uptime: "99.92%", responseTime: "67ms" },
    { name: "Message Queue", status: "healthy", uptime: "99.89%", responseTime: "8ms" }
  ];

  const infrastructureMetrics = [
    { name: "CPU Usage", value: 45, max: 100, unit: "%" },
    { name: "Memory Usage", value: 67, max: 100, unit: "%" },
    { name: "Disk Usage", value: 52, max: 100, unit: "%" },
    { name: "Network I/O", value: 38, max: 100, unit: "%" }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "healthy": return <CheckCircle className="h-5 w-5 text-green-600" />;
      case "warning": return <AlertTriangle className="h-5 w-5 text-orange-600" />;
      default: return <AlertTriangle className="h-5 w-5 text-red-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "healthy": return <Badge variant="default" className="bg-green-100 text-green-800">Healthy</Badge>;
      case "warning": return <Badge variant="secondary" className="bg-orange-100 text-orange-800">Warning</Badge>;
      default: return <Badge variant="destructive">Critical</Badge>;
    }
  };

  const getMetricColor = (value: number) => {
    if (value >= 80) return "bg-red-500";
    if (value >= 60) return "bg-orange-500";
    return "bg-green-500";
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">System Health Monitor</h1>
          <p className="text-gray-600">Real-time infrastructure monitoring and alerts</p>
        </div>
        <Button variant="outline" onClick={onBackToDashboard}>
          Back to Dashboard
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">System Uptime</p>
                <p className="text-2xl font-bold text-green-600">99.97%</p>
              </div>
              <Activity className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Services</p>
                <p className="text-2xl font-bold">6/6</p>
              </div>
              <Server className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Database Health</p>
                <p className="text-2xl font-bold text-green-600">Optimal</p>
              </div>
              <Database className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Network Status</p>
                <p className="text-2xl font-bold text-green-600">Stable</p>
              </div>
              <Wifi className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>System Services</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {systemServices.map((service, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(service.status)}
                    <div>
                      <div className="font-medium">{service.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {service.uptime} uptime • {service.responseTime} avg response
                      </div>
                    </div>
                  </div>
                  {getStatusBadge(service.status)}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Infrastructure Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {infrastructureMetrics.map((metric, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{metric.name}</span>
                    <span className="font-medium">{metric.value}{metric.unit}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${getMetricColor(metric.value)}`}
                      style={{ width: `${metric.value}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SystemHealthMonitor;
