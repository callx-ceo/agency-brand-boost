
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Clock, Target, Building2, Users } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: React.ReactNode;
}

const MetricCard = ({ title, value, change, changeType, icon }: MetricCardProps) => {
  const changeColor = changeType === 'positive' ? 'text-green-600' : 
                     changeType === 'negative' ? 'text-red-600' : 'text-gray-600';
  const ChangeIcon = changeType === 'positive' ? TrendingUp : TrendingDown;

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
            <div className={`flex items-center gap-1 text-sm ${changeColor}`}>
              <ChangeIcon className="w-3 h-3" />
              {change}
            </div>
          </div>
          <div className="text-blue-500">{icon}</div>
        </div>
      </CardContent>
    </Card>
  );
};

const ApplicationMetricsDashboard = () => {
  const metrics = [
    {
      title: "Approval Rate",
      value: "76.3%",
      change: "+2.1%",
      changeType: 'positive' as const,
      icon: <Target className="w-8 h-8" />
    },
    {
      title: "Avg Processing Time",
      value: "4.2 days",
      change: "-0.5 days",
      changeType: 'positive' as const,
      icon: <Clock className="w-8 h-8" />
    },
    {
      title: "Total Applications",
      value: "127",
      change: "+15",
      changeType: 'positive' as const,
      icon: <Building2 className="w-8 h-8" />
    },
    {
      title: "Active Agents",
      value: "23",
      change: "+3",
      changeType: 'positive' as const,
      icon: <Users className="w-8 h-8" />
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Application Analytics</h3>
        <Badge variant="outline" className="bg-blue-50 text-blue-700">
          Last 30 days
        </Badge>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>
    </div>
  );
};

export default ApplicationMetricsDashboard;
