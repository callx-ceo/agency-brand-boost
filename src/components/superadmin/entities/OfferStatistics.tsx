
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, TrendingUp, TrendingDown, Phone, DollarSign, Target, Users } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

interface OfferStatisticsProps {
  offerId: string;
  onBackToDashboard: () => void;
  onBackToOffers: () => void;
}

const OfferStatistics = ({ offerId, onBackToDashboard, onBackToOffers }: OfferStatisticsProps) => {
  // Mock data for the selected offer
  const offerData = {
    id: offerId,
    name: "Insurex - Search",
    type: "Bundle",
    category: "Final Expense Bundle",
    status: "active"
  };

  // Mock statistics data
  const dailyStats = [
    { date: "Jan 1", calls: 45, revenue: 2300, conversions: 38 },
    { date: "Jan 2", calls: 52, revenue: 2650, conversions: 44 },
    { date: "Jan 3", calls: 48, revenue: 2450, conversions: 41 },
    { date: "Jan 4", calls: 61, revenue: 3100, conversions: 52 },
    { date: "Jan 5", calls: 55, revenue: 2800, conversions: 47 },
    { date: "Jan 6", calls: 68, revenue: 3450, conversions: 58 },
    { date: "Jan 7", calls: 63, revenue: 3200, conversions: 54 }
  ];

  const publisherPerformance = [
    { name: "Publisher A", calls: 245, revenue: 12500, convRate: 85.2 },
    { name: "Publisher B", calls: 198, revenue: 10100, convRate: 78.4 },
    { name: "Publisher C", calls: 156, revenue: 7800, convRate: 72.1 },
    { name: "Publisher D", calls: 134, revenue: 6700, convRate: 69.8 },
    { name: "Publisher E", calls: 87, revenue: 4350, convRate: 65.5 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={onBackToOffers}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Offers
          </Button>
          <div>
            <h1 className="text-3xl font-bold">{offerData.name}</h1>
            <div className="flex items-center gap-2 mt-1">
              <Badge className="bg-green-100 text-green-800">
                {offerData.status.charAt(0).toUpperCase() + offerData.status.slice(1)}
              </Badge>
              <span className="text-gray-600">{offerData.category}</span>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Offer Details</Button>
          <Button variant="outline" onClick={onBackToDashboard}>
            Back to Dashboard
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Calls MTD</p>
                <p className="text-2xl font-bold">1,964</p>
                <div className="flex items-center text-green-600 text-sm">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  +12.5% vs last month
                </div>
              </div>
              <Phone className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Revenue MTD</p>
                <p className="text-2xl font-bold">$100,500</p>
                <div className="flex items-center text-green-600 text-sm">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  +8.3% vs last month
                </div>
              </div>
              <DollarSign className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Conversion Rate</p>
                <p className="text-2xl font-bold">85.28%</p>
                <div className="flex items-center text-red-600 text-sm">
                  <TrendingDown className="w-4 h-4 mr-1" />
                  -2.1% vs last month
                </div>
              </div>
              <Target className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Revenue/Call</p>
                <p className="text-2xl font-bold">$51.17</p>
                <div className="flex items-center text-green-600 text-sm">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  +3.7% vs last month
                </div>
              </div>
              <Users className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="statistics" className="space-y-6">
        <TabsList>
          <TabsTrigger value="statistics">Statistics</TabsTrigger>
          <TabsTrigger value="publishers">Publishers</TabsTrigger>
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="statistics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Daily Performance Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Daily Performance (Last 7 Days)</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={dailyStats}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="calls" stroke="#3b82f6" strokeWidth={2} />
                    <Line type="monotone" dataKey="conversions" stroke="#10b981" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Revenue Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Daily Revenue (Last 7 Days)</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={dailyStats}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
                    <Bar dataKey="revenue" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="publishers" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Publisher Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {publisherPerformance.map((publisher, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-medium">{publisher.name}</h3>
                      <p className="text-sm text-gray-600">{publisher.calls} calls this month</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">${publisher.revenue.toLocaleString()}</p>
                      <p className="text-sm text-gray-600">{publisher.convRate}% conv. rate</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="campaigns">
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-gray-600">Campaign details will be displayed here</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-gray-600">Offer settings will be displayed here</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OfferStatistics;
