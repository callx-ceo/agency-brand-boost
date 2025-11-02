import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Phone, 
  Users, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  TrendingUp,
  Activity,
  Building2
} from "lucide-react";

interface Campaign {
  id: string;
  name: string;
  vertical: string;
  status: "active" | "paused" | "no_agents";
  callsReceived: number;
  connectedToAgent: number;
  fallbacksTriggered: number;
  createdAt: string;
  publishersCount?: number;
}

interface CampaignDetailModalProps {
  campaign: Campaign;
  isOpen: boolean;
  onClose: () => void;
}

// Mock data for demo
const mockCallLogs = [
  {
    id: "1",
    timestamp: "2024-01-20 14:30:22",
    callerNumber: "+1 (555) 987-6543",
    assignedAgent: "John Smith",
    duration: "4m 32s",
    status: "connected",
    outcome: "qualified"
  },
  {
    id: "2",
    timestamp: "2024-01-20 14:25:15",
    callerNumber: "+1 (555) 876-5432",
    assignedAgent: "Sarah Johnson",
    duration: "2m 15s",
    status: "connected",
    outcome: "not_qualified"
  },
  {
    id: "3",
    timestamp: "2024-01-20 14:20:08",
    callerNumber: "+1 (555) 765-4321",
    assignedAgent: null,
    duration: "0m 00s",
    status: "fallback",
    outcome: "redirected"
  },
  {
    id: "4",
    timestamp: "2024-01-20 14:15:33",
    callerNumber: "+1 (555) 654-3210",
    assignedAgent: "Mike Chen",
    duration: "6m 45s",
    status: "connected",
    outcome: "qualified"
  },
  {
    id: "5",
    timestamp: "2024-01-20 14:10:27",
    callerNumber: "+1 (555) 543-2109",
    assignedAgent: "Lisa Davis",
    duration: "1m 20s",
    status: "dropped",
    outcome: "dropped"
  }
];

const mockAssignedAgents = [
  { id: "1", name: "John Smith", status: "online", callsHandled: 23, avgDuration: "4m 15s" },
  { id: "2", name: "Sarah Johnson", status: "online", callsHandled: 19, avgDuration: "3m 42s" },
  { id: "3", name: "Mike Chen", status: "away", callsHandled: 31, avgDuration: "5m 03s" },
  { id: "4", name: "Lisa Davis", status: "online", callsHandled: 27, avgDuration: "4m 28s" },
];

const CampaignDetailModal = ({ campaign, isOpen, onClose }: CampaignDetailModalProps) => {
  const [activeTab, setActiveTab] = useState("overview");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "paused":
        return "bg-yellow-100 text-yellow-800";
      case "no_agents":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Active";
      case "paused":
        return "Paused";
      case "no_agents":
        return "No Agents Available";
      default:
        return "Unknown";
    }
  };

  const getCallStatusColor = (status: string) => {
    switch (status) {
      case "connected":
        return "bg-green-100 text-green-800";
      case "fallback":
        return "bg-red-100 text-red-800";
      case "dropped":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getAgentStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-100 text-green-800";
      case "away":
        return "bg-yellow-100 text-yellow-800";
      case "offline":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getVerticalColor = (vertical: string) => {
    switch (vertical) {
      case "Final Expense":
        return "bg-purple-100 text-purple-800";
      case "Medicare":
        return "bg-blue-100 text-blue-800";
      case "Auto Insurance":
        return "bg-green-100 text-green-800";
      case "Debt Settlement":
        return "bg-orange-100 text-orange-800";
      case "Home Services":
        return "bg-cyan-100 text-cyan-800";
      case "Legal":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Calculate metrics
  const connectionRate = campaign.callsReceived > 0 
    ? Math.round((campaign.connectedToAgent / campaign.callsReceived) * 100) 
    : 0;
  
  const qualifiedCalls = mockCallLogs.filter(call => call.outcome === "qualified").length;
  const qualifiedRate = campaign.connectedToAgent > 0 
    ? Math.round((qualifiedCalls / campaign.connectedToAgent) * 100) 
    : 0;

  const dropRate = campaign.callsReceived > 0 
    ? Math.round(((campaign.callsReceived - campaign.connectedToAgent - campaign.fallbacksTriggered) / campaign.callsReceived) * 100) 
    : 0;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Phone className="w-5 h-5" />
            {campaign.name}
          </DialogTitle>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <Badge className={getVerticalColor(campaign.vertical)}>
              <Building2 className="w-3 h-3 mr-1" />
              {campaign.vertical}
            </Badge>
            <Badge className={getStatusColor(campaign.status)}>
              {getStatusText(campaign.status)}
            </Badge>
            <span className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              {campaign.publishersCount || 0} Publishers
            </span>
          </div>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="call-logs">Call Logs</TabsTrigger>
            <TabsTrigger value="agents">Assigned Agents</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Campaign Info Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="w-5 h-5" />
                  Campaign Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Vertical</p>
                    <Badge className={getVerticalColor(campaign.vertical)}>
                      {campaign.vertical}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Publishers</p>
                    <p className="text-sm font-medium">{campaign.publishersCount || 0}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Created</p>
                    <p className="text-sm">{campaign.createdAt}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* KPI Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Phone className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="text-sm text-gray-600">Total Calls</p>
                      <p className="text-2xl font-bold">{campaign.callsReceived}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="text-sm text-gray-600">Connected</p>
                      <p className="text-2xl font-bold">{campaign.connectedToAgent}</p>
                      <p className="text-xs text-gray-500">{connectionRate}% rate</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-purple-600" />
                    <div>
                      <p className="text-sm text-gray-600">Qualified</p>
                      <p className="text-2xl font-bold">{qualifiedCalls}</p>
                      <p className="text-xs text-gray-500">{qualifiedRate}% rate</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                    <div>
                      <p className="text-sm text-gray-600">Fallbacks</p>
                      <p className="text-2xl font-bold">{campaign.fallbacksTriggered}</p>
                      <p className="text-xs text-gray-500">{dropRate}% drop rate</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Recent Call Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockCallLogs.slice(0, 5).map((call) => (
                    <div key={call.id} className="flex items-center justify-between py-2 border-b last:border-b-0">
                      <div className="flex items-center gap-3">
                        <Badge className={getCallStatusColor(call.status)}>
                          {call.status}
                        </Badge>
                        <span className="font-mono text-sm">{call.callerNumber}</span>
                        {call.assignedAgent && (
                          <span className="text-sm text-gray-600">→ {call.assignedAgent}</span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Clock className="w-4 h-4" />
                        <span>{call.duration}</span>
                        <span>{call.timestamp}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="call-logs" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Call Routing Logs (Last 50 Calls)</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Timestamp</TableHead>
                      <TableHead>Caller Number</TableHead>
                      <TableHead>Assigned Agent</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Outcome</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockCallLogs.map((call) => (
                      <TableRow key={call.id}>
                        <TableCell className="font-mono text-sm">{call.timestamp}</TableCell>
                        <TableCell className="font-mono">{call.callerNumber}</TableCell>
                        <TableCell>{call.assignedAgent || "—"}</TableCell>
                        <TableCell>{call.duration}</TableCell>
                        <TableCell>
                          <Badge className={getCallStatusColor(call.status)}>
                            {call.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <span className={`capitalize ${
                            call.outcome === "qualified" ? "text-green-600" : 
                            call.outcome === "not_qualified" ? "text-yellow-600" : 
                            "text-red-600"
                          }`}>
                            {call.outcome.replace("_", " ")}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="agents" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Assigned Agents Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Agent Name</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Calls Handled</TableHead>
                      <TableHead>Avg Duration</TableHead>
                      <TableHead>Performance</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockAssignedAgents.map((agent) => (
                      <TableRow key={agent.id}>
                        <TableCell className="font-medium">{agent.name}</TableCell>
                        <TableCell>
                          <Badge className={getAgentStatusColor(agent.status)}>
                            {agent.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{agent.callsHandled}</TableCell>
                        <TableCell>{agent.avgDuration}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="w-12 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-blue-600 h-2 rounded-full" 
                                style={{ width: `${Math.min((agent.callsHandled / 35) * 100, 100)}%` }}
                              />
                            </div>
                            <span className="text-sm text-gray-600">
                              {Math.round((agent.callsHandled / 35) * 100)}%
                            </span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default CampaignDetailModal;
