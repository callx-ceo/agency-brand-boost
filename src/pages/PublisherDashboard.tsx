import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DollarSign, Phone, ShoppingCart, TrendingUp, Calendar, BarChart3, FileText, Settings, Zap, Users } from "lucide-react";
import PublisherKPICards from "@/components/publisher/PublisherKPICards";
import PublisherOverviewChart from "@/components/publisher/PublisherOverviewChart";
import PublisherCampaignsTable from "@/components/publisher/PublisherCampaignsTable";
import PublisherSidebar from "@/components/publisher/PublisherSidebar";
import PublisherSettings from "@/components/publisher/PublisherSettings";
import PublisherCampaignsView from "@/components/publisher/PublisherCampaignsView";

const PublisherDashboard = () => {
  const [activeView, setActiveView] = useState("dashboard");
  const [dateRange, setDateRange] = useState("today");

  const handleViewChange = (view: string) => {
    setActiveView(view);
  };

  return (
    <div className="flex h-screen bg-background">
      <PublisherSidebar activeView={activeView} onViewChange={handleViewChange} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="border-b bg-card px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Zap className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">CallX</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>Publisher: RingMax Ltd.</span>
              </div>
            </div>
            
            <Tabs defaultValue="dashboard" className="w-auto">
              <TabsList>
                <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                <TabsTrigger value="realtime">Real Time</TabsTrigger>
                <TabsTrigger value="reports">Reports</TabsTrigger>
                <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
                <TabsTrigger value="integrations">Integrations</TabsTrigger>
                <TabsTrigger value="account">Account</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-6">
          {activeView === "dashboard" ? (
            <div className="space-y-6">
              {/* Date Range and Filters */}
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold text-foreground">
                  Sep 12, 2025 - Sep 12, 2025
                </h1>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">Today</Button>
                  <Button variant="secondary" size="sm">Yesterday</Button>
                  <Button variant="outline" size="sm">Last 7 days</Button>
                  <Button variant="outline" size="sm">Last 30 days</Button>
                  <Button variant="outline" size="sm">Last Month</Button>
                  <Button variant="outline" size="sm">This Month</Button>
                  <Button variant="outline" size="sm">This Year</Button>
                </div>
              </div>

              {/* KPI Cards */}
              <PublisherKPICards />

              {/* Overview Chart */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Overview</h2>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">Calls</Button>
                    <Button variant="secondary" size="sm">Earnings</Button>
                  </div>
                </div>
                <PublisherOverviewChart />
              </div>

              {/* Campaigns Table */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Campaigns</h2>
                <PublisherCampaignsTable />
              </div>
            </div>
          ) : activeView === "settings" ? (
            <PublisherSettings />
          ) : activeView === "campaigns" ? (
            <PublisherCampaignsView />
          ) : (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <h2 className="text-xl font-semibold mb-2">Coming Soon</h2>
                <p className="text-muted-foreground">
                  The {activeView} section is under development.
                </p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default PublisherDashboard;