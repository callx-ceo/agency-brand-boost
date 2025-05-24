
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Phone, Brain, BarChart3, FileText, DollarSign, Calendar, TrendingUp } from "lucide-react";
import BillingPeriodSelector from "./BillingPeriodSelector";

// Enhanced mock data with agency profit tracking
const mockAgentCostData = [
  {
    agentId: "agent_user_123",
    agentName: "John Doe",
    agentEmail: "john.doe@example.com",
    billingType: "agent-paid", // agent pays their own bills
    usage: {
      telephony: { minutes: 450, baseCost: 22.50, markup: 10, chargedCost: 24.75, agencyProfit: 2.25 },
      transcription: { minutes: 430, baseCost: 4.30, markup: 15, chargedCost: 4.95, agencyProfit: 0.65 },
      aiCoaching: { minutes: 200, baseCost: 2.00, markup: 20, chargedCost: 2.40, agencyProfit: 0.40 },
      aiScoring: { minutes: 450, baseCost: 2.25, markup: 15, chargedCost: 2.59, agencyProfit: 0.34 },
      callBalance: { baseCost: 25.00, markup: 0, chargedCost: 25.00, agencyProfit: 0 }
    },
    totalBaseCost: 56.05,
    totalChargedCost: 59.69,
    totalAgencyProfit: 3.64
  },
  {
    agentId: "agent_user_456",
    agentName: "Jane Smith",
    agentEmail: "jane.smith@example.com",
    billingType: "agency-paid", // agency pays for this agent
    usage: {
      telephony: { minutes: 320, baseCost: 16.00, markup: 0, chargedCost: 16.00, agencyProfit: 0 },
      transcription: { minutes: 320, baseCost: 3.20, markup: 0, chargedCost: 3.20, agencyProfit: 0 },
      aiCoaching: { minutes: 150, baseCost: 1.50, markup: 0, chargedCost: 1.50, agencyProfit: 0 },
      aiScoring: { minutes: 320, baseCost: 1.60, markup: 0, chargedCost: 1.60, agencyProfit: 0 },
      callBalance: { baseCost: 25.00, markup: 0, chargedCost: 25.00, agencyProfit: 0 }
    },
    totalBaseCost: 47.30,
    totalChargedCost: 47.30,
    totalAgencyProfit: 0
  },
  {
    agentId: "agent_user_789",
    agentName: "Michael Johnson",
    agentEmail: "michael.johnson@example.com",
    billingType: "agent-paid",
    usage: {
      telephony: { minutes: 680, baseCost: 34.00, markup: 10, chargedCost: 37.40, agencyProfit: 3.40 },
      transcription: { minutes: 650, baseCost: 6.50, markup: 15, chargedCost: 7.48, agencyProfit: 0.98 },
      aiCoaching: { minutes: 300, baseCost: 3.00, markup: 20, chargedCost: 3.60, agencyProfit: 0.60 },
      aiScoring: { minutes: 680, baseCost: 3.40, markup: 15, chargedCost: 3.91, agencyProfit: 0.51 },
      callBalance: { baseCost: 25.00, markup: 0, chargedCost: 25.00, agencyProfit: 0 }
    },
    totalBaseCost: 71.90,
    totalChargedCost: 77.39,
    totalAgencyProfit: 5.49
  }
];

const mockAgencyFinancials = {
  agencyPaidCosts: 47.30, // what agency pays for agency-billed agents
  agentPaidRevenue: 137.08, // what agency collects from agent-billed agents
  totalAgencyProfit: 9.13, // markup profit from agent-billed agents
  totalBaseCosts: 175.25, // total base costs across all agents
  billingPeriod: "December 2024"
};

const CostBreakdownDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("current");

  const getServiceIcon = (service: string) => {
    switch(service) {
      case 'telephony': return <Phone className="h-4 w-4" />;
      case 'transcription': return <FileText className="h-4 w-4" />;
      case 'aiCoaching': return <Brain className="h-4 w-4" />;
      case 'aiScoring': return <BarChart3 className="h-4 w-4" />;
      case 'callBalance': return <DollarSign className="h-4 w-4" />;
      default: return <DollarSign className="h-4 w-4" />;
    }
  };

  const getBillingBadge = (billingType: string) => {
    return billingType === "agent-paid" ? (
      <Badge variant="default" className="bg-green-100 text-green-800">Agent Paid</Badge>
    ) : (
      <Badge variant="secondary" className="bg-blue-100 text-blue-800">Agency Paid</Badge>
    );
  };

  return (
    <div className="space-y-6">
      <BillingPeriodSelector 
        selectedPeriod={selectedPeriod} 
        onPeriodChange={setSelectedPeriod} 
      />

      {/* Agency Financial Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Agency Financial Summary - {mockAgencyFinancials.billingPeriod}
          </CardTitle>
          <CardDescription>
            Breakdown of agency costs, revenue, and profit
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="text-sm font-medium text-red-700 mb-1">Agency Paid Costs</div>
              <div className="text-2xl font-bold text-red-800">
                -${mockAgencyFinancials.agencyPaidCosts.toFixed(2)}
              </div>
              <div className="text-xs text-red-600">Costs for agency-billed agents</div>
            </div>
            
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="text-sm font-medium text-blue-700 mb-1">Agent Revenue</div>
              <div className="text-2xl font-bold text-blue-800">
                +${mockAgencyFinancials.agentPaidRevenue.toFixed(2)}
              </div>
              <div className="text-xs text-blue-600">Revenue from agent-billed services</div>
            </div>
            
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="text-sm font-medium text-green-700 mb-1">Markup Profit</div>
              <div className="text-2xl font-bold text-green-800">
                +${mockAgencyFinancials.totalAgencyProfit.toFixed(2)}
              </div>
              <div className="text-xs text-green-600">Profit from markups</div>
            </div>
            
            <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
              <div className="text-sm font-medium text-purple-700 mb-1">Net Profit</div>
              <div className="text-2xl font-bold text-purple-800">
                +${(mockAgencyFinancials.totalAgencyProfit - mockAgencyFinancials.agencyPaidCosts + mockAgencyFinancials.agentPaidRevenue - (mockAgencyFinancials.totalBaseCosts - mockAgencyFinancials.agencyPaidCosts)).toFixed(2)}
              </div>
              <div className="text-xs text-purple-600">Total agency profit</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Agent Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Agent Cost & Profit Breakdown</CardTitle>
          <CardDescription>
            Detailed breakdown showing base costs, markups, and agency profits
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="table-view">
            <TabsList className="mb-4">
              <TabsTrigger value="table-view">Table View</TabsTrigger>
              <TabsTrigger value="summary-view">Summary View</TabsTrigger>
            </TabsList>
            
            <TabsContent value="table-view">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Agent</TableHead>
                    <TableHead>Billing Type</TableHead>
                    <TableHead>Base Cost</TableHead>
                    <TableHead>Charged Amount</TableHead>
                    <TableHead>Agency Profit</TableHead>
                    <TableHead>Profit Margin</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockAgentCostData.map((agent) => (
                    <TableRow key={agent.agentId}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{agent.agentName}</div>
                          <div className="text-sm text-gray-500">{agent.agentEmail}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {getBillingBadge(agent.billingType)}
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">${agent.totalBaseCost.toFixed(2)}</div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">${agent.totalChargedCost.toFixed(2)}</div>
                      </TableCell>
                      <TableCell>
                        <div className={`font-medium ${agent.totalAgencyProfit > 0 ? 'text-green-600' : 'text-gray-500'}`}>
                          ${agent.totalAgencyProfit.toFixed(2)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className={`font-medium ${agent.totalAgencyProfit > 0 ? 'text-green-600' : 'text-gray-500'}`}>
                          {agent.totalBaseCost > 0 ? ((agent.totalAgencyProfit / agent.totalBaseCost) * 100).toFixed(1) : '0.0'}%
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            
            <TabsContent value="summary-view">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mockAgentCostData.map((agent) => (
                  <Card key={agent.agentId}>
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{agent.agentName}</CardTitle>
                          <CardDescription>{agent.agentEmail}</CardDescription>
                        </div>
                        {getBillingBadge(agent.billingType)}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                          <span className="text-sm">Base Cost:</span>
                          <span className="font-medium">${agent.totalBaseCost.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-blue-50 rounded">
                          <span className="text-sm">Charged Amount:</span>
                          <span className="font-medium">${agent.totalChargedCost.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                          <span className="text-sm">Agency Profit:</span>
                          <span className={`font-bold ${agent.totalAgencyProfit > 0 ? 'text-green-600' : 'text-gray-500'}`}>
                            ${agent.totalAgencyProfit.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default CostBreakdownDashboard;
