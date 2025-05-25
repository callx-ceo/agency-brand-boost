
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users, 
  Phone, 
  Target,
  Clock,
  Shield,
  Activity,
  Zap
} from "lucide-react";

const metricsData = [
  {
    title: "Total Platform Revenue",
    value: "$3.4M",
    change: "+18.5%",
    trend: "up",
    icon: <DollarSign className="w-6 h-6" />,
    color: "text-green-600",
    bgColor: "bg-green-50"
  },
  {
    title: "Active Agencies",
    value: "127",
    change: "+8",
    trend: "up",
    icon: <Users className="w-6 h-6" />,
    color: "text-blue-600",
    bgColor: "bg-blue-50"
  },
  {
    title: "Total Agent Count",
    value: "2,847",
    change: "+124",
    trend: "up",
    icon: <Users className="w-6 h-6" />,
    color: "text-purple-600",
    bgColor: "bg-purple-50"
  },
  {
    title: "Platform-wide Calls",
    value: "22.3K",
    change: "+12.3%",
    trend: "up",
    icon: <Phone className="w-6 h-6" />,
    color: "text-orange-600",
    bgColor: "bg-orange-50"
  },
  {
    title: "Average Conversion Rate",
    value: "26.8%",
    change: "+2.1%",
    trend: "up",
    icon: <Target className="w-6 h-6" />,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50"
  },
  {
    title: "Avg Call Duration",
    value: "4.2 min",
    change: "+0.3 min",
    trend: "up",
    icon: <Clock className="w-6 h-6" />,
    color: "text-indigo-600",
    bgColor: "bg-indigo-50"
  },
  {
    title: "Compliance Score",
    value: "98.7%",
    change: "-0.2%",
    trend: "down",
    icon: <Shield className="w-6 h-6" />,
    color: "text-red-600",
    bgColor: "bg-red-50"
  },
  {
    title: "System Uptime",
    value: "99.9%",
    change: "0%",
    trend: "stable",
    icon: <Activity className="w-6 h-6" />,
    color: "text-green-600",
    bgColor: "bg-green-50"
  },
  {
    title: "API Response Time",
    value: "142ms",
    change: "-18ms",
    trend: "up",
    icon: <Zap className="w-6 h-6" />,
    color: "text-yellow-600",
    bgColor: "bg-yellow-50"
  }
];

const AnalyticsMetrics = () => {
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-4 h-4 text-green-600" />;
      case "down":
        return <TrendingDown className="w-4 h-4 text-red-600" />;
      default:
        return <div className="w-4 h-4" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "up":
        return "text-green-600 bg-green-100";
      case "down":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
      {metricsData.map((metric, index) => (
        <Card key={index} className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${metric.bgColor}`}>
                <div className={metric.color}>
                  {metric.icon}
                </div>
              </div>
              <Badge variant="outline" className={getTrendColor(metric.trend)}>
                <div className="flex items-center gap-1">
                  {getTrendIcon(metric.trend)}
                  <span className="text-xs font-medium">{metric.change}</span>
                </div>
              </Badge>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 mb-1">
                {metric.value}
              </p>
              <p className="text-sm text-gray-600">
                {metric.title}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AnalyticsMetrics;
