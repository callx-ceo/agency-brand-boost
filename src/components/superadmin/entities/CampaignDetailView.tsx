
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, DollarSign, Phone, PhoneCall, RotateCcw, Plus } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface Campaign {
  id: string;
  name: string;
  type: string;
  category: string;
  accepts: string;
  approvedPublishers: number;
  pendingPublishers: number;
  callsToday: number;
  callsMTD: number;
  revenueToday: number;
  revenueMTD: number;
  conversionRateMTD: number;
  status: "active" | "paused" | "pending";
}

interface CampaignDetailViewProps {
  campaign: Campaign;
  onBack: () => void;
}

// Mock data for the chart
const mockChartData = [
  { day: 2, revenue: 0 },
  { day: 4, revenue: 0 },
  { day: 6, revenue: 0 },
  { day: 8, revenue: 0 },
  { day: 10, revenue: 0 },
  { day: 12, revenue: 0 },
  { day: 14, revenue: 0 },
  { day: 16, revenue: 0 },
  { day: 18, revenue: 0 },
  { day: 20, revenue: 0 },
  { day: 22, revenue: 0 },
  { day: 24, revenue: 0 },
];

// Mock publishers data
const mockPublishers = [
  { id: "01607", name: "HealthQuotes, LLC", promoNumbers: 0, calls: 0, paidCalls: 0, revenue: 0, cost: 0, profit: 0, convRate: 0, status: "Approved" },
  { id: "01594", name: "Palo Media Group", promoNumbers: 0, calls: 0, paidCalls: 0, revenue: 0, cost: 0, profit: 0, convRate: 0, status: "Approved" },
  { id: "01525", name: "PerformanceBuy LLC", promoNumbers: 0, calls: 0, paidCalls: 0, revenue: 0, cost: 0, profit: 0, convRate: 0, status: "Approved" },
  { id: "01509", name: "Scale Up Media Agency Inc", promoNumbers: 0, calls: 0, paidCalls: 0, revenue: 0, cost: 0, profit: 0, convRate: 0, status: "Approved" },
  { id: "01490", name: "Gold Mine Leads", promoNumbers: 0, calls: 0, paidCalls: 0, revenue: 0, cost: 0, profit: 0, convRate: 0, status: "Approved" },
];

const CampaignDetailView = ({ campaign, onBack }: CampaignDetailViewProps) => {
  const [activeTab, setActiveTab] = useState("campaign-statistics");
  const [dateRange, setDateRange] = useState("Today");

  const dateRangeOptions = ["Today", "Yesterday", "Last 7 days", "Last 30 days", "Last Month", "This Month", "This Year"];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            BACK TO LIST
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Campaign: {campaign.name}</h1>
          </div>
        </div>
      </div>

      {/* Date Range and Status */}
      <div className="flex items-center justify-between">
        <div className="text-gray-600">
          May 25, 2025 - May 25, 2025
        </div>
        <div className="flex gap-2">
          {dateRangeOptions.map((option) => (
            <Button
              key={option}
              variant={dateRange === option ? "default" : "outline"}
              size="sm"
              onClick={() => setDateRange(option)}
            >
              {option}
            </Button>
          ))}
        </div>
      </div>

      {/* Tabs Navigation */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="border-b">
          <TabsList className="h-auto p-0 bg-transparent">
            <TabsTrigger 
              value="campaign-statistics" 
              className="data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none px-4 py-2"
            >
              CAMPAIGN STATISTICS
            </TabsTrigger>
            <TabsTrigger 
              value="campaign-details"
              className="data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none px-4 py-2"
            >
              CAMPAIGN DETAILS
            </TabsTrigger>
            <TabsTrigger 
              value="promo-numbers"
              className="data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none px-4 py-2"
            >
              PROMO NUMBERS
            </TabsTrigger>
            <TabsTrigger 
              value="manage-publishers"
              className="data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none px-4 py-2"
            >
              MANAGE PUBLISHERS
            </TabsTrigger>
            <TabsTrigger 
              value="manage-advertisers"
              className="data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none px-4 py-2"
            >
              MANAGE ADVERTISERS
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="campaign-statistics" className="space-y-6">
          {/* Campaign Status and KPIs */}
          <div className="flex items-center gap-4">
            <Badge className="bg-green-100 text-green-800 px-3 py-1">
              {campaign.name} Active
            </Badge>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-green-500 text-white">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <DollarSign className="w-8 h-8" />
                  <div>
                    <div className="text-2xl font-bold">$ {campaign.revenueToday}</div>
                    <div className="text-sm opacity-90">Revenue</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-blue-500 text-white">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <RotateCcw className="w-8 h-8" />
                  <div>
                    <div className="text-2xl font-bold">{campaign.callsToday}</div>
                    <div className="text-sm opacity-90">Calls</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-orange-500 text-white">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <PhoneCall className="w-8 h-8" />
                  <div>
                    <div className="text-2xl font-bold">0</div>
                    <div className="text-sm opacity-90">Paid Calls</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-purple-500 text-white">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <RotateCcw className="w-8 h-8" />
                  <div>
                    <div className="text-2xl font-bold">{campaign.conversionRateMTD}%</div>
                    <div className="text-sm opacity-90">Conv. Rate</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Overview Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={mockChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis 
                      domain={[0, 1]}
                      tickFormatter={(value) => `$${value}`}
                    />
                    <Tooltip 
                      formatter={(value) => [`$${value}`, "Revenue"]}
                      labelFormatter={(label) => `Day ${label}`}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="#22c55e" 
                      strokeWidth={2}
                      dot={{ fill: '#22c55e', strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Publishers Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <span className="text-gray-400">👥</span>
                  Publishers
                </CardTitle>
                <Button size="sm" className="bg-gray-800 text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  INVITE PUBLISHERS
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Publisher Name</TableHead>
                    <TableHead>Publisher ID</TableHead>
                    <TableHead>Promo Number(s)</TableHead>
                    <TableHead>Calls</TableHead>
                    <TableHead>Paid Calls</TableHead>
                    <TableHead>Revenue</TableHead>
                    <TableHead>Cost</TableHead>
                    <TableHead>Profit</TableHead>
                    <TableHead>Conv. Rate</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockPublishers.map((publisher) => (
                    <TableRow key={publisher.id}>
                      <TableCell className="font-medium">{publisher.name}</TableCell>
                      <TableCell>{publisher.id}</TableCell>
                      <TableCell>{publisher.promoNumbers}</TableCell>
                      <TableCell>{publisher.calls}</TableCell>
                      <TableCell>{publisher.paidCalls}</TableCell>
                      <TableCell>${publisher.revenue.toFixed(2)}</TableCell>
                      <TableCell>${publisher.cost.toFixed(2)}</TableCell>
                      <TableCell>${publisher.profit.toFixed(2)}</TableCell>
                      <TableCell>{publisher.convRate}%</TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800">
                          {publisher.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="campaign-details">
          <Card>
            <CardHeader>
              <CardTitle>Campaign Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Campaign Name</label>
                  <p className="text-lg">{campaign.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Category</label>
                  <p className="text-lg">{campaign.category}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Type</label>
                  <p className="text-lg">{campaign.type}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Accepts</label>
                  <p className="text-lg">{campaign.accepts}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="promo-numbers">
          <Card>
            <CardHeader>
              <CardTitle>Promo Numbers</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Promo numbers management coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="manage-publishers">
          <Card>
            <CardHeader>
              <CardTitle>Manage Publishers</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Publisher management coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="manage-advertisers">
          <Card>
            <CardHeader>
              <CardTitle>Manage Advertisers</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Advertiser management coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CampaignDetailView;
