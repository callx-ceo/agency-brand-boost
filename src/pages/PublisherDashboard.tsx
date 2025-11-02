import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import PublisherSidebar from "@/components/publisher/PublisherSidebar";
import { BarChart3, Phone, DollarSign, TrendingUp, Clock, Calendar } from "lucide-react";

const PublisherDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [activeView, setActiveView] = useState("dashboard");

  // Mock data for publisher campaigns
  const campaigns = [
    {
      id: "1",
      name: "Final Expense - Medicare Advantage",
      status: "active",
      trackingNumber: "+1 (555) 123-4567",
      callsToday: 47,
      callsThisMonth: 1284,
      revenue: 12840,
      avgCallDuration: "4:32",
      conversionRate: 68,
      qualityScore: 92,
    },
    {
      id: "2",
      name: "Auto Insurance - State Farm",
      status: "active",
      trackingNumber: "+1 (555) 987-6543",
      callsToday: 23,
      callsThisMonth: 687,
      revenue: 6870,
      avgCallDuration: "3:18",
      conversionRate: 72,
      qualityScore: 88,
    },
  ];

  const todayStats = {
    totalCalls: 70,
    connectedCalls: 63,
    revenue: 630,
    avgDuration: "4:05",
  };

  return (
    <div className="flex h-screen bg-background">
      <PublisherSidebar activeView={activeView} onViewChange={setActiveView} />
      
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Publisher Dashboard</h1>
            <p className="text-muted-foreground">
              Track your campaigns, monitor call quality, and optimize performance
            </p>
          </div>

          {/* Today's Stats */}
          <div className="grid gap-4 md:grid-cols-4 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Calls Today</CardTitle>
                <Phone className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{todayStats.totalCalls}</div>
                <p className="text-xs text-muted-foreground">
                  {todayStats.connectedCalls} connected
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Today's Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${todayStats.revenue}</div>
                <p className="text-xs text-muted-foreground">
                  Based on connected calls
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Call Duration</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{todayStats.avgDuration}</div>
                <p className="text-xs text-muted-foreground">
                  Across all campaigns
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Connection Rate</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {Math.round((todayStats.connectedCalls / todayStats.totalCalls) * 100)}%
                </div>
                <p className="text-xs text-muted-foreground">
                  Quality indicator
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Campaigns */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Active Campaigns</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="payouts">Payouts</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              {campaigns.map((campaign) => (
                <Card key={campaign.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          {campaign.name}
                          <Badge variant={campaign.status === "active" ? "default" : "secondary"}>
                            {campaign.status}
                          </Badge>
                        </CardTitle>
                        <CardDescription className="flex items-center gap-2 mt-2">
                          <Phone className="h-4 w-4" />
                          {campaign.trackingNumber}
                        </CardDescription>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground">Quality Score</div>
                        <div className="text-2xl font-bold">{campaign.qualityScore}</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                      <div>
                        <div className="text-sm text-muted-foreground">Calls Today</div>
                        <div className="text-xl font-semibold">{campaign.callsToday}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Calls MTD</div>
                        <div className="text-xl font-semibold">{campaign.callsThisMonth}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Revenue MTD</div>
                        <div className="text-xl font-semibold">${campaign.revenue.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Avg Duration</div>
                        <div className="text-xl font-semibold">{campaign.avgCallDuration}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Conv. Rate</div>
                        <div className="text-xl font-semibold">{campaign.conversionRate}%</div>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" size="sm">
                        <BarChart3 className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                      <Button variant="outline" size="sm">
                        <Calendar className="h-4 w-4 mr-2" />
                        Call History
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="performance">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Analytics</CardTitle>
                  <CardDescription>
                    Detailed performance metrics across all campaigns
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center py-8">
                    Performance analytics coming soon
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="payouts">
              <Card>
                <CardHeader>
                  <CardTitle>Payout History</CardTitle>
                  <CardDescription>
                    View your earnings and payment history
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center py-8">
                    Payout history coming soon
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default PublisherDashboard;
