
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Area, AreaChart } from "recharts";
import { TrendingUp, TrendingDown, DollarSign, Users, Phone, Target } from "lucide-react";

const revenueData = [
  { month: "Jan", revenue: 2400000, calls: 15000, conversion: 23.4 },
  { month: "Feb", revenue: 2100000, calls: 13500, conversion: 24.1 },
  { month: "Mar", revenue: 2800000, calls: 18000, conversion: 25.2 },
  { month: "Apr", revenue: 3200000, calls: 20500, conversion: 26.8 },
  { month: "May", revenue: 2900000, calls: 19200, conversion: 24.9 },
  { month: "Jun", revenue: 3400000, calls: 22000, conversion: 27.3 },
];

const agencyPerformanceData = [
  { name: "Elite Insurance", revenue: 450000, agents: 28, calls: 3200 },
  { name: "Premier Coverage", revenue: 380000, agents: 22, calls: 2800 },
  { name: "Guardian Life", revenue: 320000, agents: 24, calls: 2400 },
  { name: "ProTech Insurance", revenue: 280000, agents: 17, calls: 2100 },
  { name: "Dynasty Coverage", revenue: 260000, agents: 20, calls: 1900 },
];

const conversionFunnelData = [
  { stage: "Total Calls", count: 22000, percentage: 100 },
  { stage: "Qualified Leads", count: 18500, percentage: 84 },
  { stage: "Applications Started", count: 12400, percentage: 56 },
  { stage: "Applications Submitted", count: 8900, percentage: 40 },
  { stage: "Approved", count: 6200, percentage: 28 },
];

const channelDistributionData = [
  { name: "Direct Marketing", value: 35, color: "#3b82f6" },
  { name: "Social Media", value: 25, color: "#10b981" },
  { name: "Referrals", value: 20, color: "#f59e0b" },
  { name: "Search Ads", value: 15, color: "#ef4444" },
  { name: "Other", value: 5, color: "#8b5cf6" },
];

const AnalyticsCharts = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Revenue Trend */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-600" />
            Revenue & Call Volume Trend
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{
            revenue: { label: "Revenue", color: "#3b82f6" },
            calls: { label: "Calls", color: "#10b981" }
          }} className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area yAxisId="left" type="monotone" dataKey="revenue" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                <Area yAxisId="right" type="monotone" dataKey="calls" stackId="2" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Agency Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-600" />
            Top Agency Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{
            revenue: { label: "Revenue", color: "#3b82f6" }
          }} className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={agencyPerformanceData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={100} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="revenue" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Channel Distribution */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-purple-600" />
            Lead Source Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{
            direct: { label: "Direct Marketing", color: "#3b82f6" },
            social: { label: "Social Media", color: "#10b981" },
            referrals: { label: "Referrals", color: "#f59e0b" },
            search: { label: "Search Ads", color: "#ef4444" },
            other: { label: "Other", color: "#8b5cf6" }
          }} className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={channelDistributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {channelDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Conversion Funnel */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Phone className="w-5 h-5 text-orange-600" />
            Conversion Funnel Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {conversionFunnelData.map((stage, index) => (
              <div key={stage.stage} className="flex items-center gap-4">
                <div className="w-32 text-sm font-medium">{stage.stage}</div>
                <div className="flex-1 bg-gray-200 rounded-full h-8 relative">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-8 rounded-full flex items-center justify-end pr-4 text-white text-sm font-medium"
                    style={{ width: `${stage.percentage}%` }}
                  >
                    {stage.count.toLocaleString()}
                  </div>
                </div>
                <div className="w-16 text-sm text-gray-600">{stage.percentage}%</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsCharts;
