import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from "recharts";
import { Download, TrendingUp, TrendingDown, Phone, DollarSign, Target, FileCheck, Percent } from "lucide-react";
import DateRangeSelector from "../dashboard/DateRangeSelector";

// Mock performance data over time
const mockPerformanceData = [
  { date: "Nov 1", callsReceived: 12, paidCalls: 8, submitted: 3, spend: 240, submittedAP: 2850 },
  { date: "Nov 8", callsReceived: 15, paidCalls: 11, submitted: 5, spend: 330, submittedAP: 4120 },
  { date: "Nov 15", callsReceived: 18, paidCalls: 14, submitted: 6, spend: 420, submittedAP: 5280 },
  { date: "Nov 22", callsReceived: 14, paidCalls: 10, submitted: 4, spend: 300, submittedAP: 3640 },
  { date: "Nov 29", callsReceived: 20, paidCalls: 16, submitted: 7, spend: 480, submittedAP: 6110 },
  { date: "Dec 6", callsReceived: 22, paidCalls: 18, submitted: 8, spend: 540, submittedAP: 7200 },
  { date: "Dec 13", callsReceived: 19, paidCalls: 15, submitted: 6, spend: 450, submittedAP: 5850 },
];

// Current period metrics
const currentMetrics = {
  totalCalls: 120,
  paidCalls: 92,
  totalSubmitted: 39,
  submitPercent: 32.5,
  closePercent: 32.5,
  scpa: 156.41,
  totalSpend: 5760,
  totalSubmittedAP: 35050,
};

// Previous period for comparison
const previousMetrics = {
  totalCalls: 95,
  paidCalls: 68,
  totalSubmitted: 28,
  submitPercent: 29.5,
};

const chartConfig = {
  callsReceived: {
    label: "Calls Received",
    color: "hsl(var(--primary))",
  },
  paidCalls: {
    label: "Paid Calls",
    color: "hsl(var(--chart-2))",
  },
  submitted: {
    label: "Submitted Apps",
    color: "hsl(var(--chart-3))",
  },
  spend: {
    label: "Spend",
    color: "hsl(var(--chart-4))",
  },
  submittedAP: {
    label: "Submitted AP",
    color: "hsl(var(--chart-5))",
  },
};

const AgentPerformanceReports = () => {
  const [dateRange, setDateRange] = useState({
    from: new Date(2025, 10, 1),
    to: new Date(2025, 11, 13),
  });

  const calculateChange = (current: number, previous: number) => {
    const change = ((current - previous) / previous) * 100;
    return change.toFixed(1);
  };

  const MetricCard = ({ 
    title, 
    value, 
    icon: Icon, 
    format = "number",
    previousValue,
    suffix = ""
  }: { 
    title: string; 
    value: number; 
    icon: any; 
    format?: "number" | "currency" | "percent";
    previousValue?: number;
    suffix?: string;
  }) => {
    let displayValue = value.toString();
    if (format === "currency") displayValue = `$${value.toLocaleString()}`;
    if (format === "percent") displayValue = `${value.toFixed(2)}%`;
    if (format === "number") displayValue = value.toLocaleString();
    
    const change = previousValue ? calculateChange(value, previousValue) : null;
    const isPositive = change ? parseFloat(change) > 0 : false;

    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          <Icon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{displayValue}{suffix}</div>
          {change && (
            <p className={`text-xs flex items-center gap-1 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
              {change}% vs previous period
            </p>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-3xl font-bold">My Performance</h2>
          <p className="text-muted-foreground">Track your call activity and conversion metrics</p>
        </div>
        <div className="flex gap-2">
          <DateRangeSelector value={dateRange} onChange={setDateRange} />
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Calls"
          value={currentMetrics.totalCalls}
          icon={Phone}
          previousValue={previousMetrics.totalCalls}
        />
        <MetricCard
          title="Paid Calls"
          value={currentMetrics.paidCalls}
          icon={Phone}
          previousValue={previousMetrics.paidCalls}
        />
        <MetricCard
          title="Total Submitted"
          value={currentMetrics.totalSubmitted}
          icon={FileCheck}
          previousValue={previousMetrics.totalSubmitted}
        />
        <MetricCard
          title="Submit %"
          value={currentMetrics.submitPercent}
          icon={Percent}
          format="percent"
          previousValue={previousMetrics.submitPercent}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Close %"
          value={currentMetrics.closePercent}
          icon={Target}
          format="percent"
        />
        <MetricCard
          title="SCPA"
          value={currentMetrics.scpa}
          icon={DollarSign}
          format="currency"
        />
        <MetricCard
          title="Total Spend"
          value={currentMetrics.totalSpend}
          icon={DollarSign}
          format="currency"
        />
        <MetricCard
          title="Total Submitted AP"
          value={currentMetrics.totalSubmittedAP}
          icon={DollarSign}
          format="currency"
        />
      </div>

      {/* Calls & Conversions Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Call Volume & Conversions</CardTitle>
          <CardDescription>Weekly breakdown of calls received vs submitted applications</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Bar dataKey="callsReceived" fill="var(--color-callsReceived)" name="Calls Received" />
                <Bar dataKey="paidCalls" fill="var(--color-paidCalls)" name="Paid Calls" />
                <Bar dataKey="submitted" fill="var(--color-submitted)" name="Submitted" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Financial Performance Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Financial Performance</CardTitle>
          <CardDescription>Weekly spend and submitted annual premium trends</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="spend" 
                  stroke="var(--color-spend)" 
                  strokeWidth={2}
                  name="Total Spend ($)"
                />
                <Line 
                  type="monotone" 
                  dataKey="submittedAP" 
                  stroke="var(--color-submittedAP)" 
                  strokeWidth={2}
                  name="Submitted AP ($)"
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Performance Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Summary</CardTitle>
          <CardDescription>Key insights from your recent activity</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">Conversion Rate</p>
                <p className="text-sm text-muted-foreground">Paid calls to submitted applications</p>
              </div>
              <div className="text-2xl font-bold text-primary">
                {((currentMetrics.totalSubmitted / currentMetrics.paidCalls) * 100).toFixed(1)}%
              </div>
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">Average AP per Submission</p>
                <p className="text-sm text-muted-foreground">Annual premium per submitted application</p>
              </div>
              <div className="text-2xl font-bold text-primary">
                ${(currentMetrics.totalSubmittedAP / currentMetrics.totalSubmitted).toLocaleString(undefined, { 
                  minimumFractionDigits: 0, 
                  maximumFractionDigits: 0 
                })}
              </div>
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">Cost per Call</p>
                <p className="text-sm text-muted-foreground">Average spend per paid call</p>
              </div>
              <div className="text-2xl font-bold text-primary">
                ${(currentMetrics.totalSpend / currentMetrics.paidCalls).toFixed(2)}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AgentPerformanceReports;
