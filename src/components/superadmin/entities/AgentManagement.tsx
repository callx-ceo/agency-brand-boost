import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, Search, UserCheck, Eye } from "lucide-react";
import { useImpersonation } from "@/contexts/ImpersonationContext";
import { toast } from "sonner";
import AgentTimeFilter, { TimeFilterPeriod } from "../../agent/AgentTimeFilter";
import { AgentDetailView } from "./AgentDetailView";

interface AgentManagementProps {
  onBackToDashboard: () => void;
}

const AVAILABLE_VERTICALS = [
  "Final Expense",
  "Medicare", 
  "Auto Insurance",
  "Home Insurance",
  "Health Insurance",
  "Life Insurance",
  "Debt Settlement",
  "Home Services",
  "Legal"
];

const MINIMUM_BIDS: Record<string, number> = {
  "Final Expense": 8.00,
  "Medicare": 12.00,
  "Auto Insurance": 6.00,
  "Home Insurance": 7.00,
  "Health Insurance": 10.00,
  "Life Insurance": 9.00,
  "Debt Settlement": 15.00,
  "Home Services": 5.00,
  "Legal": 20.00
};

interface VerticalBid {
  vertical: string;
  bidAmount: number;
  isValid?: boolean;
}

const mockAgents = [
  { 
    id: 1, 
    name: "Sarah Johnson", 
    agency: "Elite Insurance Group", 
    status: "active", 
    performance: 94, 
    lastLogin: "1 hour ago", 
    onlineTime: "6h 32m", 
    callTime: "4h 18m",
    verticals: ["Medicare", "Final Expense"],
    bids: [
      { vertical: "Medicare", bidAmount: 15.00 },
      { vertical: "Final Expense", bidAmount: 10.00 }
    ]
  },
  { 
    id: 2, 
    name: "Mike Rodriguez", 
    agency: "Premier Coverage Solutions", 
    status: "active", 
    performance: 87, 
    lastLogin: "30 min ago", 
    onlineTime: "5h 45m", 
    callTime: "3h 52m",
    verticals: ["Auto Insurance", "Home Insurance"],
    bids: [
      { vertical: "Auto Insurance", bidAmount: 8.00 },
      { vertical: "Home Insurance", bidAmount: 9.00 }
    ]
  },
  { 
    id: 3, 
    name: "Emily Chen", 
    agency: "Guardian Life Services", 
    status: "pending", 
    performance: 76, 
    lastLogin: "2 hours ago", 
    onlineTime: "2h 15m", 
    callTime: "1h 43m",
    verticals: [],
    bids: []
  },
  { 
    id: 4, 
    name: "David Thompson", 
    agency: "ProTech Insurance", 
    status: "suspended", 
    performance: 45, 
    lastLogin: "3 days ago", 
    onlineTime: "0h 0m", 
    callTime: "0h 0m",
    verticals: ["Health Insurance"],
    bids: [
      { vertical: "Health Insurance", bidAmount: 12.00 }
    ]
  },
  { 
    id: 5, 
    name: "Lisa Anderson", 
    agency: "Dynasty Coverage Group", 
    status: "active", 
    performance: 91, 
    lastLogin: "15 min ago", 
    onlineTime: "7h 21m", 
    callTime: "5h 9m",
    verticals: ["Life Insurance", "Medicare"],
    bids: [
      { vertical: "Life Insurance", bidAmount: 11.00 },
      { vertical: "Medicare", bidAmount: 14.00 }
    ]
  },
  { 
    id: 6, 
    name: "Robert Wilson", 
    agency: "SecureLife Partners", 
    status: "suspended", 
    performance: 38, 
    lastLogin: "1 week ago", 
    onlineTime: "0h 0m", 
    callTime: "0h 0m",
    verticals: ["Debt Settlement"],
    bids: [
      { vertical: "Debt Settlement", bidAmount: 18.00 }
    ]
  },
  { 
    id: 7, 
    name: "Jennifer Davis", 
    agency: "TrustGuard Insurance", 
    status: "pending", 
    performance: 82, 
    lastLogin: "4 hours ago", 
    onlineTime: "3h 12m", 
    callTime: "2h 28m",
    verticals: ["Legal", "Final Expense"],
    bids: [
      { vertical: "Legal", bidAmount: 25.00 },
      { vertical: "Final Expense", bidAmount: 9.50 }
    ]
  },
];

const AgentManagement = ({ onBackToDashboard }: AgentManagementProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [filteredAgents, setFilteredAgents] = useState(mockAgents);
  const [selectedAgent, setSelectedAgent] = useState<any>(null);
  const { startImpersonation } = useImpersonation();

  const handleFilterChange = (period: TimeFilterPeriod, dateRange?: any) => {
    const filtered = mockAgents.map(agent => ({
      ...agent,
      onlineTime: period === "monthly" ? "168h 20m" : period === "yesterday" ? "7h 45m" : agent.onlineTime,
      callTime: period === "monthly" ? "112h 45m" : period === "yesterday" ? "5h 12m" : agent.callTime,
    }));
    setFilteredAgents(filtered);
  };

  const handleImpersonateAgent = (agent: any) => {
    const impersonationData = {
      id: agent.id.toString(),
      name: agent.name,
      email: `${agent.name.toLowerCase().replace(/\s+/g, '.')}@${agent.agency.toLowerCase().replace(/\s+/g, '')}.com`
    };
    startImpersonation(impersonationData);
    toast.success(`Now impersonating ${agent.name}`);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active": return <Badge variant="default" className="bg-green-100 text-green-800">Active</Badge>;
      case "inactive": return <Badge variant="secondary">Inactive</Badge>;
      case "pending": return <Badge variant="outline" className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case "suspended": return <Badge variant="destructive">Suspended</Badge>;
      default: return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPerformanceBadge = (score: number) => {
    if (score >= 90) return <Badge variant="default" className="bg-green-100 text-green-800">{score}</Badge>;
    if (score >= 75) return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">{score}</Badge>;
    return <Badge variant="destructive">{score}</Badge>;
  };

  const filterAgentsByStatus = (status: string) => {
    let filtered = filteredAgents;
    
    if (status !== "all") {
      filtered = filteredAgents.filter(agent => agent.status === status);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(agent =>
        agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agent.agency.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  };

  const getTabCounts = () => {
    return {
      all: mockAgents.length,
      active: mockAgents.filter(a => a.status === "active").length,
      pending: mockAgents.filter(a => a.status === "pending").length,
      suspended: mockAgents.filter(a => a.status === "suspended").length,
    };
  };

  const handleViewAgent = (agent: any) => {
    setSelectedAgent(agent);
  };

  const tabCounts = getTabCounts();

  // Show detail view if an agent is selected
  if (selectedAgent) {
    return (
      <AgentDetailView 
        agent={selectedAgent} 
        onBack={() => setSelectedAgent(null)} 
      />
    );
  }

  const renderAgentsTable = (agents: any[]) => (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Agents ({agents.length})
          </CardTitle>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search agents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 w-64"
              />
            </div>
            <Button size="sm" className="flex items-center gap-2">
              <UserCheck className="w-4 h-4" />
              Assign Agent
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Agent Name</TableHead>
                <TableHead>Agency</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Verticals</TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
          <TableBody>
            {agents.map((agent) => (
              <TableRow key={agent.id}>
                <TableCell className="font-medium">{agent.name}</TableCell>
                <TableCell>{agent.agency}</TableCell>
                <TableCell>{getStatusBadge(agent.status)}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {agent.verticals.length > 0 ? (
                      agent.verticals.slice(0, 2).map((v: string) => (
                        <Badge key={v} variant="secondary" className="text-xs">
                          {v}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-xs text-muted-foreground">None</span>
                    )}
                    {agent.verticals.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{agent.verticals.length - 2}
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">{agent.lastLogin}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleViewAgent(agent)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View Details
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleImpersonateAgent(agent)}
                    >
                      <UserCheck className="h-4 w-4 mr-1" />
                      Impersonate
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        {agents.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No agents found.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Agent Management</h1>
          <p className="text-gray-600">Cross-agency agent oversight and performance management</p>
        </div>
        <Button variant="outline" onClick={onBackToDashboard}>
          Back to Dashboard
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All ({tabCounts.all})</TabsTrigger>
          <TabsTrigger value="active">Active ({tabCounts.active})</TabsTrigger>
          <TabsTrigger value="pending">Pending ({tabCounts.pending})</TabsTrigger>
          <TabsTrigger value="suspended">Suspended ({tabCounts.suspended})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          {renderAgentsTable(filterAgentsByStatus("all"))}
        </TabsContent>
        
        <TabsContent value="active">
          {renderAgentsTable(filterAgentsByStatus("active"))}
        </TabsContent>
        
        <TabsContent value="pending">
          {renderAgentsTable(filterAgentsByStatus("pending"))}
        </TabsContent>
        
        <TabsContent value="suspended">
          {renderAgentsTable(filterAgentsByStatus("suspended"))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AgentManagement;
