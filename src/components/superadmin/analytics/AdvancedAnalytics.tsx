
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, TrendingUp, Users, DollarSign } from "lucide-react";
import AnalyticsMetrics from "./AnalyticsMetrics";
import AnalyticsCharts from "./AnalyticsCharts";
import AnalyticsFilters from "./AnalyticsFilters";
import { toast } from "sonner";

interface AdvancedAnalyticsProps {
  onBackToDashboard: () => void;
}

const AdvancedAnalytics = ({ onBackToDashboard }: AdvancedAnalyticsProps) => {
  const [reportType, setReportType] = useState("overview");
  const [dateRange, setDateRange] = useState("30d");
  const [activeTab, setActiveTab] = useState("overview");

  const handleRefresh = () => {
    toast.success("Analytics data refreshed");
  };

  const handleExport = () => {
    toast.success("Analytics report exported");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Advanced Analytics</h1>
          <p className="text-gray-600">Comprehensive reporting and business intelligence across the platform</p>
        </div>
        <Button variant="outline" onClick={onBackToDashboard}>
          Back to Dashboard
        </Button>
      </div>

      <AnalyticsFilters
        reportType={reportType}
        dateRange={dateRange}
        onReportTypeChange={setReportType}
        onDateRangeChange={setDateRange}
        onRefresh={handleRefresh}
        onExport={handleExport}
      />

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="revenue" className="flex items-center gap-2">
            <DollarSign className="w-4 h-4" />
            Revenue
          </TabsTrigger>
          <TabsTrigger value="performance" className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Performance
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Users
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <AnalyticsMetrics />
          <AnalyticsCharts />
        </TabsContent>

        <TabsContent value="revenue" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Monthly Revenue</p>
                    <p className="text-2xl font-bold">$3.4M</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-green-600" />
                </div>
                <p className="text-xs text-green-600 mt-2">+18.5% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Average Revenue Per Agency</p>
                    <p className="text-2xl font-bold">$26.8K</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-blue-600" />
                </div>
                <p className="text-xs text-blue-600 mt-2">+12.3% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Revenue Per Call</p>
                    <p className="text-2xl font-bold">$152</p>
                  </div>
                  <BarChart3 className="h-8 w-8 text-purple-600" />
                </div>
                <p className="text-xs text-purple-600 mt-2">+5.2% from last month</p>
              </CardContent>
            </Card>
          </div>
          <AnalyticsCharts />
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Avg Conversion Rate</p>
                    <p className="text-2xl font-bold">26.8%</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Avg Call Duration</p>
                    <p className="text-2xl font-bold">4.2 min</p>
                  </div>
                  <BarChart3 className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Lead Quality Score</p>
                    <p className="text-2xl font-bold">8.4/10</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Agent Efficiency</p>
                    <p className="text-2xl font-bold">92%</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>
          </div>
          <AnalyticsCharts />
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Active Users</p>
                    <p className="text-2xl font-bold">2,847</p>
                  </div>
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <p className="text-xs text-blue-600 mt-2">+124 new this month</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Daily Active Users</p>
                    <p className="text-2xl font-bold">1,243</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-green-600" />
                </div>
                <p className="text-xs text-green-600 mt-2">+8.7% from yesterday</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">User Retention Rate</p>
                    <p className="text-2xl font-bold">94.2%</p>
                  </div>
                  <BarChart3 className="h-8 w-8 text-purple-600" />
                </div>
                <p className="text-xs text-purple-600 mt-2">+2.1% from last month</p>
              </CardContent>
            </Card>
          </div>
          <AnalyticsCharts />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdvancedAnalytics;
