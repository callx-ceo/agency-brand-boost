
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
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

  // Mock publisher data based on the reference image
  const publisherData = [
    { name: "HealthQuotes, LLC", id: "01845", promoNumbers: 0, calls: 0, paidCalls: 0, earnings: "$0.00", cost: "$0.00", profit: "$0.00", convRate: "0%", payout: "78.00%", status: "Approved" },
    { name: "Paid Media Group", id: "01944", promoNumbers: 0, calls: 0, paidCalls: 0, earnings: "$0.00", cost: "$0.00", profit: "$0.00", convRate: "0%", payout: "72.86%", status: "Approved" },
    { name: "ZacSmedia", id: "01838", promoNumbers: 0, calls: 0, paidCalls: 0, earnings: "$0.00", cost: "$0.00", profit: "$0.00", convRate: "0%", payout: "76.00%", status: "Approved" },
    { name: "Performancebuy LLC", id: "01428", promoNumbers: 0, calls: 0, paidCalls: 0, earnings: "$0.00", cost: "$0.00", profit: "$0.00", convRate: "0%", payout: "76.00%", status: "Approved" },
    { name: "Scale Up Media Agency Inc", id: "01650", promoNumbers: 0, calls: 0, paidCalls: 0, earnings: "$0.00", cost: "$0.00", profit: "$0.00", convRate: "0%", payout: "64.82%", status: "Approved" },
    { name: "Gold Mine Leads", id: "01850", promoNumbers: 0, calls: 0, paidCalls: 0, earnings: "$0.00", cost: "$0.00", profit: "$0.00", convRate: "0%", payout: "64.82%", status: "Approved" },
    { name: "Leads Capital LLC", id: "01840", promoNumbers: 0, calls: 0, paidCalls: 0, earnings: "$0.00", cost: "$0.00", profit: "$0.00", convRate: "0%", payout: "70.00%", status: "Approved" },
    { name: "Adsent Media", id: "01471", promoNumbers: 0, calls: 0, paidCalls: 0, earnings: "$0.00", cost: "$0.00", profit: "$0.00", convRate: "0%", payout: "61.54%", status: "Approved" },
    { name: "Leadsmax", id: "01473", promoNumbers: 0, calls: 0, paidCalls: 0, earnings: "$0.00", cost: "$0.00", profit: "$0.00", convRate: "0%", payout: "61.54%", status: "Approved" },
    { name: "Excel Impact", id: "01459", promoNumbers: 0, calls: 0, paidCalls: 0, earnings: "$0.00", cost: "$0.00", profit: "$0.00", convRate: "0%", payout: "72.30%", status: "Approved" },
    { name: "Bellwise Digital", id: "01454", promoNumbers: 0, calls: 0, paidCalls: 0, earnings: "$0.00", cost: "$0.00", profit: "$0.00", convRate: "0%", payout: "70.00%", status: "Approved" },
    { name: "Infinity LLC", id: "01433", promoNumbers: 0, calls: 0, paidCalls: 0, earnings: "$0.00", cost: "$0.00", profit: "$0.00", convRate: "0%", payout: "60.00%", status: "Approved" },
    { name: "Anomaly Squared", id: "01228", promoNumbers: 0, calls: 0, paidCalls: 0, earnings: "$0.00", cost: "$0.00", profit: "$0.00", convRate: "0%", payout: "70.00%", status: "Approved" },
    { name: "Everquote", id: "01252", promoNumbers: 0, calls: 0, paidCalls: 0, earnings: "$0.00", cost: "$0.00", profit: "$0.00", convRate: "0%", payout: "70.00%", status: "Approved" },
    { name: "Ringplus Ltd", id: "01980", promoNumbers: 0, calls: 0, paidCalls: 0, earnings: "$0.00", cost: "$0.00", profit: "$0.00", convRate: "0%", payout: "50.00%", status: "Approved" },
    { name: "Zhan Peng", id: "01067", promoNumbers: 0, calls: 0, paidCalls: 0, earnings: "$0.00", cost: "$0.00", profit: "$0.00", convRate: "0%", payout: "61.54%", status: "Approved" },
    { name: "Chartwell Media Group", id: "00330", promoNumbers: 0, calls: 0, paidCalls: 0, earnings: "$0.00", cost: "$0.00", profit: "$0.00", convRate: "0%", payout: "76.93%", status: "Approved" },
    { name: "Facebook", id: "00257", promoNumbers: 0, calls: 0, paidCalls: 0, earnings: "$0.00", cost: "$0.00", profit: "$0.00", convRate: "0%", payout: "70.00%", status: "Approved" },
    { name: "Ringmaxfin LLC", id: "00476", promoNumbers: 0, calls: 0, paidCalls: 0, earnings: "$0.00", cost: "$0.00", profit: "$0.00", convRate: "0%", payout: "70.00%", status: "Approved" },
    { name: "Click Or Call LLC", id: "00478", promoNumbers: 0, calls: 0, paidCalls: 0, earnings: "$0.00", cost: "$0.00", profit: "$0.00", convRate: "0%", payout: "77.00%", status: "Approved" }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={onBackToOffers}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to List
          </Button>
          <div>
            <h1 className="text-3xl font-bold">{offerData.name}</h1>
            <div className="flex items-center gap-2 mt-1">
              <Badge className="bg-green-100 text-green-800">
                {offerData.status.charAt(0).toUpperCase() + offerData.status.slice(1)}
              </Badge>
              <Badge variant="outline">{offerData.type}</Badge>
              <span className="text-gray-600">{offerData.category}</span>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Offer Details</Button>
        </div>
      </div>

      {/* Date Range Selector */}
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">May 25, 2025 - May 25, 2025</span>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">Yesterday</Button>
          <Button variant="outline" size="sm">Last 7 days</Button>
          <Button variant="outline" size="sm">Last 30 days</Button>
          <Button variant="outline" size="sm">Last Month</Button>
          <Button variant="outline" size="sm">This Month</Button>
          <Button variant="outline" size="sm">This Year</Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-green-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">$0</p>
                <p className="text-xs text-gray-500">Rev</p>
              </div>
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-blue-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">0</p>
                <p className="text-xs text-gray-500">Calls</p>
              </div>
              <Phone className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-orange-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">0</p>
                <p className="text-xs text-gray-500">Paid Calls</p>
              </div>
              <Target className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-purple-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">0</p>
                <p className="text-xs text-gray-500">Conv Rate</p>
              </div>
              <Users className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Overview Section */}
      <Card>
        <CardHeader>
          <CardTitle>Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-32 bg-gray-50 rounded-lg flex items-center justify-center">
            <span className="text-gray-500">Chart will be displayed here</span>
          </div>
        </CardContent>
      </Card>

      {/* Publishers Section */}
      <Card>
        <CardHeader>
          <CardTitle>Publishers</CardTitle>
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
                <TableHead>Earnings</TableHead>
                <TableHead>Cost</TableHead>
                <TableHead>Profit</TableHead>
                <TableHead>Conv Rate</TableHead>
                <TableHead>Payout</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {publisherData.map((publisher, index) => (
                <TableRow key={index}>
                  <TableCell>{publisher.name}</TableCell>
                  <TableCell>{publisher.id}</TableCell>
                  <TableCell className="text-center">{publisher.promoNumbers}</TableCell>
                  <TableCell className="text-center">{publisher.calls}</TableCell>
                  <TableCell className="text-center">{publisher.paidCalls}</TableCell>
                  <TableCell className="text-center">{publisher.earnings}</TableCell>
                  <TableCell className="text-center">{publisher.cost}</TableCell>
                  <TableCell className="text-center">{publisher.profit}</TableCell>
                  <TableCell className="text-center">{publisher.convRate}</TableCell>
                  <TableCell className="text-center">{publisher.payout}</TableCell>
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
    </div>
  );
};

export default OfferStatistics;
