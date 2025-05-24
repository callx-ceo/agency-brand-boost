
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, DollarSign, TrendingUp, Target, Search, BarChart3 } from "lucide-react";

// Mock data for agents
const mockAgents = [
  {
    id: 1,
    name: "John Smith",
    status: "Active",
    retailPrice: 147,
    callxCost: 97,
    concurrencyCap: 5,
    callUsageYTD: 1250
  },
  {
    id: 2,
    name: "Sarah Johnson",
    status: "Active",
    retailPrice: 167,
    callxCost: 97,
    concurrencyCap: 8,
    callUsageYTD: 2100
  },
  {
    id: 3,
    name: "Mike Wilson",
    status: "Pending",
    retailPrice: 147,
    callxCost: 97,
    concurrencyCap: 3,
    callUsageYTD: 450
  },
  {
    id: 4,
    name: "Lisa Chen",
    status: "Active",
    retailPrice: 197,
    callxCost: 97,
    concurrencyCap: 10,
    callUsageYTD: 3200
  },
  {
    id: 5,
    name: "David Rodriguez",
    status: "Inactive",
    retailPrice: 147,
    callxCost: 97,
    concurrencyCap: 5,
    callUsageYTD: 800
  }
];

// Mock MRR trends data
const mockTrendsData = [
  { month: "Jul 2024", revenue: 12600, cost: 8730, profit: 3870 },
  { month: "Aug 2024", revenue: 14700, cost: 9700, profit: 5000 },
  { month: "Sep 2024", revenue: 16800, cost: 10670, profit: 6130 },
  { month: "Oct 2024", revenue: 18900, cost: 11640, profit: 7260 },
  { month: "Nov 2024", revenue: 21000, cost: 12610, profit: 8390 },
  { month: "Dec 2024", revenue: 22050, cost: 13580, profit: 8470 }
];

const chartConfig = {
  revenue: {
    label: "Monthly Revenue",
    color: "#10b981"
  },
  cost: {
    label: "CallX Cost",
    color: "#ef4444"
  },
  profit: {
    label: "Monthly Profit",
    color: "#3b82f6"
  }
};

const ReportingTab = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [averageRetailPrice, setAverageRetailPrice] = useState(147);

  // Calculate summary metrics
  const activeAgents = mockAgents.filter(agent => agent.status === "Active");
  const pendingAgents = mockAgents.filter(agent => agent.status === "Pending");
  const totalActiveAgents = activeAgents.length;
  const totalMonthlyRevenue = activeAgents.reduce((sum, agent) => sum + agent.retailPrice, 0);
  const totalCallxCost = totalActiveAgents * 97;
  const grossMonthlyProfit = totalMonthlyRevenue - totalCallxCost;
  const projectedMRR = totalMonthlyRevenue + (pendingAgents.length * averageRetailPrice);

  // Filter agents based on search and status
  const filteredAgents = mockAgents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || agent.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Agents</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalActiveAgents}</div>
            <p className="text-xs text-muted-foreground">
              +{pendingAgents.length} pending
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Retail Seat Price</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(totalActiveAgents > 0 ? totalMonthlyRevenue / totalActiveAgents : 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              Per agent monthly
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalMonthlyRevenue)}</div>
            <p className="text-xs text-muted-foreground">
              From {totalActiveAgents} active agents
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">CallX Cost</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalCallxCost)}</div>
            <p className="text-xs text-muted-foreground">
              $97 × {totalActiveAgents} agents
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Profit</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{formatCurrency(grossMonthlyProfit)}</div>
            <p className="text-xs text-muted-foreground">
              {((grossMonthlyProfit / totalMonthlyRevenue) * 100).toFixed(1)}% margin
            </p>
          </CardContent>
        </Card>
      </div>

      {/* MRR Growth Trends Chart */}
      <Card>
        <CardHeader>
          <CardTitle>MRR Growth Trends</CardTitle>
          <CardDescription>Monthly revenue, costs, and profit over the last 6 months</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockTrendsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="var(--color-revenue)" 
                  strokeWidth={2}
                  name="Monthly Revenue"
                />
                <Line 
                  type="monotone" 
                  dataKey="cost" 
                  stroke="var(--color-cost)" 
                  strokeWidth={2}
                  name="CallX Cost"
                />
                <Line 
                  type="monotone" 
                  dataKey="profit" 
                  stroke="var(--color-profit)" 
                  strokeWidth={2}
                  name="Monthly Profit"
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Projected MRR Section */}
      <Card>
        <CardHeader>
          <CardTitle>MRR Projection</CardTitle>
          <CardDescription>Revenue forecast including pending agents</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label className="text-sm text-muted-foreground">Current MRR</Label>
              <div className="text-2xl font-bold">{formatCurrency(totalMonthlyRevenue)}</div>
            </div>
            <div className="space-y-2">
              <Label className="text-sm text-muted-foreground">Pending Agents</Label>
              <div className="text-2xl font-bold">{pendingAgents.length}</div>
              <div className="space-y-1">
                <Label htmlFor="avgPrice" className="text-xs">Avg. Agent Value</Label>
                <Input
                  id="avgPrice"
                  type="number"
                  value={averageRetailPrice}
                  onChange={(e) => setAverageRetailPrice(Number(e.target.value))}
                  className="w-20 h-8"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-sm text-muted-foreground">Projected MRR</Label>
              <div className="text-2xl font-bold text-blue-600">{formatCurrency(projectedMRR)}</div>
              <p className="text-xs text-muted-foreground">
                +{formatCurrency(projectedMRR - totalMonthlyRevenue)} potential
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Per-Agent Profitability Table */}
      <Card>
        <CardHeader>
          <CardTitle>Agent Profitability</CardTitle>
          <CardDescription>Per-agent margins and call usage breakdown</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Search and Filter Controls */}
          <div className="flex gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search agents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Agents Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Agent Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Retail Price</TableHead>
                  <TableHead>CallX Cost</TableHead>
                  <TableHead>Monthly Margin</TableHead>
                  <TableHead>Concurrency Cap</TableHead>
                  <TableHead>Call Usage YTD</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAgents.map((agent) => (
                  <TableRow key={agent.id}>
                    <TableCell className="font-medium">{agent.name}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={
                          agent.status === "Active" ? "default" : 
                          agent.status === "Pending" ? "secondary" : "outline"
                        }
                      >
                        {agent.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{formatCurrency(agent.retailPrice)}</TableCell>
                    <TableCell>{formatCurrency(agent.callxCost)}</TableCell>
                    <TableCell className="text-green-600 font-medium">
                      {formatCurrency(agent.retailPrice - agent.callxCost)}
                    </TableCell>
                    <TableCell>{agent.concurrencyCap}</TableCell>
                    <TableCell>{agent.callUsageYTD.toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportingTab;
