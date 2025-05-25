
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, DownloadIcon, TrendingUp, Calendar } from "lucide-react";

interface AdvancedAnalyticsProps {
  onBackToDashboard: () => void;
}

const AdvancedAnalytics = ({ onBackToDashboard }: AdvancedAnalyticsProps) => {
  const [reportType, setReportType] = useState("revenue");
  const [dateRange, setDateRange] = useState("30d");

  const reportTypes = [
    { value: "revenue", label: "Revenue Analytics" },
    { value: "performance", label: "Performance Metrics" },
    { value: "compliance", label: "Compliance Reports" },
    { value: "user-activity", label: "User Activity" }
  ];

  const dateRanges = [
    { value: "7d", label: "Last 7 Days" },
    { value: "30d", label: "Last 30 Days" },
    { value: "90d", label: "Last 90 Days" },
    { value: "1y", label: "Last Year" }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Advanced Analytics</h1>
          <p className="text-gray-600">Comprehensive reporting and business intelligence</p>
        </div>
        <Button variant="outline" onClick={onBackToDashboard}>
          Back to Dashboard
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <BarChart className="w-5 h-5" />
              Analytics Dashboard
            </CardTitle>
            <div className="flex gap-2">
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  {reportTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="Date range" />
                </SelectTrigger>
                <SelectContent>
                  {dateRanges.map((range) => (
                    <SelectItem key={range.value} value={range.value}>
                      {range.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button size="sm" className="flex items-center gap-2">
                <DownloadIcon className="w-4 h-4" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Revenue</p>
                    <p className="text-2xl font-bold">$2.4M</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-green-600" />
                </div>
                <Badge variant="default" className="mt-2 bg-green-100 text-green-800">
                  +18.5%
                </Badge>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Platform Calls</p>
                    <p className="text-2xl font-bold">15.8K</p>
                  </div>
                  <BarChart className="h-8 w-8 text-blue-600" />
                </div>
                <Badge variant="secondary" className="mt-2">
                  +12.3%
                </Badge>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Active Users</p>
                    <p className="text-2xl font-bold">2,847</p>
                  </div>
                  <Calendar className="h-8 w-8 text-purple-600" />
                </div>
                <Badge variant="outline" className="mt-2">
                  +8.7%
                </Badge>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Conversion</p>
                    <p className="text-2xl font-bold">23.4%</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-emerald-600" />
                </div>
                <Badge variant="default" className="mt-2 bg-emerald-100 text-emerald-800">
                  +2.1%
                </Badge>
              </CardContent>
            </Card>
          </div>

          <div className="text-center py-12">
            <BarChart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Advanced Analytics Dashboard</h3>
            <p className="text-gray-600 mb-4">
              Interactive charts and detailed reports will be displayed here based on your selections.
            </p>
            <Button variant="outline">
              Generate Detailed Report
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdvancedAnalytics;
