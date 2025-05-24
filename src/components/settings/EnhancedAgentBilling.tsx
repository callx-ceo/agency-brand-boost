
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Settings, CreditCard, Phone, Brain, BarChart3 } from "lucide-react";

// Enhanced mock data with granular billing control
const mockEnhancedAgents = [
  {
    agentId: "agent_user_123",
    agentName: "John Doe",
    agentEmail: "john.doe@example.com",
    billingSettings: {
      callCredits: "AGENCY_BILLED",
      telephonyFees: "AGENCY_BILLED", 
      aiCoaching: "AGENT_BILLED",
      aiCallScoring: "AGENCY_BILLED"
    },
    balance: 250.75,
    creditAllocation: {
      base: 100,
      bonus: 25,
      used: 67,
      remaining: 58
    }
  },
  {
    agentId: "agent_user_456", 
    agentName: "Jane Smith",
    agentEmail: "jane.smith@example.com",
    billingSettings: {
      callCredits: "AGENT_BILLED",
      telephonyFees: "AGENT_BILLED",
      aiCoaching: "AGENT_BILLED", 
      aiCallScoring: "AGENT_BILLED"
    },
    balance: 0,
    creditAllocation: null
  },
  {
    agentId: "agent_user_789",
    agentName: "Michael Johnson", 
    agentEmail: "michael.johnson@example.com",
    billingSettings: {
      callCredits: "AGENCY_BILLED",
      telephonyFees: "AGENCY_BILLED",
      aiCoaching: "AGENCY_BILLED",
      aiCallScoring: "AGENT_BILLED"
    },
    balance: 125.50,
    creditAllocation: {
      base: 200,
      bonus: 50,
      used: 145,
      remaining: 105
    }
  }
];

const EnhancedAgentBilling = () => {
  const [expandedAgent, setExpandedAgent] = useState<string | null>(null);
  
  const getBillingBadge = (billingModel: string) => {
    return billingModel === "AGENCY_BILLED" ? (
      <span className="px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">
        Agency
      </span>
    ) : (
      <span className="px-2 py-1 rounded text-xs font-medium bg-purple-100 text-purple-800">
        Agent
      </span>
    );
  };

  const handleBillingChange = (agentId: string, service: string, model: string) => {
    toast.success(`Updated ${service} billing for agent to ${model}`);
  };

  const getServiceIcon = (service: string) => {
    switch(service) {
      case 'callCredits': return <CreditCard className="h-4 w-4" />;
      case 'telephonyFees': return <Phone className="h-4 w-4" />;
      case 'aiCoaching': return <Brain className="h-4 w-4" />;
      case 'aiCallScoring': return <BarChart3 className="h-4 w-4" />;
      default: return <Settings className="h-4 w-4" />;
    }
  };

  const getServiceLabel = (service: string) => {
    switch(service) {
      case 'callCredits': return 'Call Credits';
      case 'telephonyFees': return 'Telephony Fees';
      case 'aiCoaching': return 'AI Real-time Coaching';
      case 'aiCallScoring': return 'AI Call Scoring';
      default: return service;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Enhanced Agent Billing Management</h3>
        <div className="flex gap-2">
          <Input className="w-60" placeholder="Search agents..." />
          <Button variant="outline">Filter</Button>
        </div>
      </div>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Agent Name</TableHead>
            <TableHead>Call Credits</TableHead>
            <TableHead>Telephony</TableHead>
            <TableHead>AI Coaching</TableHead>
            <TableHead>AI Scoring</TableHead>
            <TableHead>Balance/Credits</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockEnhancedAgents.map((agent) => (
            <React.Fragment key={agent.agentId}>
              <TableRow>
                <TableCell>
                  <div>
                    <div className="font-medium">{agent.agentName}</div>
                    <div className="text-sm text-gray-500">{agent.agentEmail}</div>
                  </div>
                </TableCell>
                <TableCell>{getBillingBadge(agent.billingSettings.callCredits)}</TableCell>
                <TableCell>{getBillingBadge(agent.billingSettings.telephonyFees)}</TableCell>
                <TableCell>{getBillingBadge(agent.billingSettings.aiCoaching)}</TableCell>
                <TableCell>{getBillingBadge(agent.billingSettings.aiCallScoring)}</TableCell>
                <TableCell>
                  {agent.creditAllocation ? (
                    <div className="text-sm">
                      <div className="font-medium">{agent.creditAllocation.remaining} credits left</div>
                      <div className="text-gray-500">
                        ${agent.balance.toFixed(2)} balance
                      </div>
                    </div>
                  ) : (
                    <span className="text-gray-400">Self-managed</span>
                  )}
                </TableCell>
                <TableCell>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => setExpandedAgent(expandedAgent === agent.agentId ? null : agent.agentId)}
                  >
                    <Settings className="h-4 w-4 mr-1" />
                    Configure
                  </Button>
                </TableCell>
              </TableRow>
              
              {expandedAgent === agent.agentId && (
                <TableRow className="bg-gray-50">
                  <TableCell colSpan={7}>
                    <Card className="border-0 shadow-none">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg">Billing Configuration - {agent.agentName}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {Object.entries(agent.billingSettings).map(([service, billingModel]) => (
                            <div key={service} className="flex items-center justify-between p-4 border rounded-lg">
                              <div className="flex items-center gap-3">
                                {getServiceIcon(service)}
                                <div>
                                  <div className="font-medium">{getServiceLabel(service)}</div>
                                  <div className="text-sm text-gray-500">
                                    Currently: {billingModel === "AGENCY_BILLED" ? "Agency pays" : "Agent pays"}
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-sm">Agent</span>
                                <Switch 
                                  checked={billingModel === "AGENCY_BILLED"}
                                  onCheckedChange={(checked) => 
                                    handleBillingChange(
                                      agent.agentId, 
                                      service, 
                                      checked ? "AGENCY_BILLED" : "AGENT_BILLED"
                                    )
                                  }
                                />
                                <span className="text-sm">Agency</span>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        {agent.creditAllocation && (
                          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                            <h4 className="font-medium mb-2">Call Credits Summary</h4>
                            <div className="grid grid-cols-4 gap-4 text-sm">
                              <div>
                                <span className="text-gray-600">Base: </span>
                                <span className="font-medium">{agent.creditAllocation.base}</span>
                              </div>
                              <div>
                                <span className="text-gray-600">Bonus: </span>
                                <span className="font-medium text-green-600">{agent.creditAllocation.bonus}</span>
                              </div>
                              <div>
                                <span className="text-gray-600">Used: </span>
                                <span className="font-medium">{agent.creditAllocation.used}</span>
                              </div>
                              <div>
                                <span className="text-gray-600">Remaining: </span>
                                <span className="font-medium text-blue-600">{agent.creditAllocation.remaining}</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </TableCell>
                </TableRow>
              )}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default EnhancedAgentBilling;
