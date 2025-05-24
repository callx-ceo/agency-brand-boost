
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Phone, Brain, BarChart3, FileText, DollarSign, Calendar } from "lucide-react";

// Mock data for detailed cost breakdown
const mockAgentCostData = [
  {
    agentId: "agent_user_123",
    agentName: "John Doe",
    agentEmail: "john.doe@example.com",
    usage: {
      telephony: { minutes: 450, cost: 22.50 },
      transcription: { minutes: 430, cost: 4.30 },
      aiCoaching: { minutes: 200, cost: 2.00 },
      aiScoring: { minutes: 450, cost: 2.25 },
      callBalance: { cost: 25.00 }
    },
    totalCost: 56.05
  },
  {
    agentId: "agent_user_456",
    agentName: "Jane Smith",
    agentEmail: "jane.smith@example.com",
    usage: {
      telephony: { minutes: 320, cost: 16.00 },
      transcription: { minutes: 320, cost: 3.20 },
      aiCoaching: { minutes: 150, cost: 1.50 },
      aiScoring: { minutes: 320, cost: 1.60 },
      callBalance: { cost: 25.00 }
    },
    totalCost: 47.30
  },
  {
    agentId: "agent_user_789",
    agentName: "Michael Johnson",
    agentEmail: "michael.johnson@example.com",
    usage: {
      telephony: { minutes: 680, cost: 34.00 },
      transcription: { minutes: 650, cost: 6.50 },
      aiCoaching: { minutes: 300, cost: 3.00 },
      aiScoring: { minutes: 680, cost: 3.40 },
      callBalance: { cost: 25.00 }
    },
    totalCost: 71.90
  }
];

const mockAgencySummary = {
  totalCosts: {
    telephony: 72.50,
    transcription: 14.00,
    aiCoaching: 6.50,
    aiScoring: 7.25,
    callBalance: 75.00
  },
  totalAgents: 3,
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

  return (
    <div className="space-y-6">
      {/* Agency Cost Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Agency Cost Summary - {mockAgencySummary.billingPeriod}
          </CardTitle>
          <CardDescription>
            Total costs across all {mockAgencySummary.totalAgents} agents
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {Object.entries(mockAgencySummary.totalCosts).map(([service, cost]) => (
              <div key={service} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  {getServiceIcon(service)}
                  <span className="text-sm font-medium capitalize">
                    {service === 'callBalance' ? 'Seat Licenses' : service}
                  </span>
                </div>
                <div className="text-2xl font-bold">${cost.toFixed(2)}</div>
              </div>
            ))}
          </div>
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="text-lg font-semibold">
              Total Agency Cost: ${Object.values(mockAgencySummary.totalCosts).reduce((sum, cost) => sum + cost, 0).toFixed(2)}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Agent Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Agent Cost Breakdown</CardTitle>
          <CardDescription>
            Detailed usage and costs per agent for the current billing period
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
                    <TableHead>Telephony</TableHead>
                    <TableHead>Transcription</TableHead>
                    <TableHead>AI Coaching</TableHead>
                    <TableHead>AI Scoring</TableHead>
                    <TableHead>Seat License</TableHead>
                    <TableHead>Total Cost</TableHead>
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
                        <div className="text-sm">
                          <div className="font-medium">${agent.usage.telephony.cost.toFixed(2)}</div>
                          <div className="text-gray-500">{agent.usage.telephony.minutes} min</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div className="font-medium">${agent.usage.transcription.cost.toFixed(2)}</div>
                          <div className="text-gray-500">{agent.usage.transcription.minutes} min</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div className="font-medium">${agent.usage.aiCoaching.cost.toFixed(2)}</div>
                          <div className="text-gray-500">{agent.usage.aiCoaching.minutes} min</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div className="font-medium">${agent.usage.aiScoring.cost.toFixed(2)}</div>
                          <div className="text-gray-500">{agent.usage.aiScoring.minutes} min</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">${agent.usage.callBalance.cost.toFixed(2)}</div>
                      </TableCell>
                      <TableCell>
                        <div className="font-bold text-lg">${agent.totalCost.toFixed(2)}</div>
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
                      <CardTitle className="text-lg">{agent.agentName}</CardTitle>
                      <CardDescription>{agent.agentEmail}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {Object.entries(agent.usage).map(([service, data]) => (
                          <div key={service} className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              {getServiceIcon(service)}
                              <span className="text-sm capitalize">
                                {service === 'callBalance' ? 'Seat License' : service}
                              </span>
                            </div>
                            <div className="text-sm">
                              <span className="font-medium">${data.cost.toFixed(2)}</span>
                              {'minutes' in data && (
                                <span className="text-gray-500 ml-1">({data.minutes}m)</span>
                              )}
                            </div>
                          </div>
                        ))}
                        <div className="pt-2 border-t flex justify-between items-center">
                          <span className="font-medium">Total:</span>
                          <span className="font-bold text-lg">${agent.totalCost.toFixed(2)}</span>
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
