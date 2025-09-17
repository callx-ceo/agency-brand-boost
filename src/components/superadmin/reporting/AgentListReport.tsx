
import React, { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, Search, Filter, Download, Eye, Edit, UserCheck } from "lucide-react";
import { useImpersonation } from "@/contexts/ImpersonationContext";
import { toast } from "sonner";

interface AgentListReportProps {
  onBackToDashboard: () => void;
}

interface Agent {
  id: string;
  name: string;
  agencyId: string;
  agencyName: string;
  status: "online" | "offline" | "paused" | "waiting" | "inactive" | "pending";
  loggedIn: boolean;
  callsTaken: number;
  role: "Admin" | "Agent" | "Manager";
  conversionRate: number;
  lastActivity: string;
  securityRating: string;
  onlineTime: string;
  callTime: string;
}

const mockAgents: Agent[] = [
  {
    id: "1",
    name: "Jerome Bell",
    agencyId: "1",
    agencyName: "Elite Insurance Group",
    status: "online",
    loggedIn: true,
    callsTaken: 204,
    role: "Admin",
    conversionRate: 65,
    lastActivity: "2 min ago",
    securityRating: "5% growth",
    onlineTime: "6h 32m",
    callTime: "4h 18m"
  },
  {
    id: "2",
    name: "Arlene McCoy",
    agencyId: "1",
    agencyName: "Elite Insurance Group",
    status: "offline",
    loggedIn: false,
    callsTaken: 204,
    role: "Admin",
    conversionRate: 65,
    lastActivity: "1 hour ago",
    securityRating: "5% growth",
    onlineTime: "0h 0m",
    callTime: "0h 0m"
  },
  {
    id: "3",
    name: "Annette Black",
    agencyId: "2",
    agencyName: "Premier Coverage Solutions",
    status: "paused",
    loggedIn: true,
    callsTaken: 204,
    role: "Agent",
    conversionRate: 65,
    lastActivity: "5 min ago",
    securityRating: "5% growth",
    onlineTime: "5h 45m",
    callTime: "3h 52m"
  },
  {
    id: "4",
    name: "Leslie Alexander",
    agencyId: "2",
    agencyName: "Premier Coverage Solutions",
    status: "waiting",
    loggedIn: true,
    callsTaken: 204,
    role: "Agent",
    conversionRate: 65,
    lastActivity: "Just now",
    securityRating: "5% growth",
    onlineTime: "2h 15m",
    callTime: "1h 43m"
  },
  {
    id: "5",
    name: "Devon Lane",
    agencyId: "3",
    agencyName: "Guardian Life Services",
    status: "online",
    loggedIn: true,
    callsTaken: 204,
    role: "Manager",
    conversionRate: 65,
    lastActivity: "1 min ago",
    securityRating: "5% growth",
    onlineTime: "7h 21m",
    callTime: "5h 9m"
  },
  {
    id: "6",
    name: "Floyd Miles",
    agencyId: "3",
    agencyName: "Guardian Life Services",
    status: "online",
    loggedIn: true,
    callsTaken: 204,
    role: "Agent",
    conversionRate: 65,
    lastActivity: "3 min ago",
    securityRating: "5% growth",
    onlineTime: "4h 12m",
    callTime: "2h 48m"
  },
  {
    id: "7",
    name: "Eleanor Pena",
    agencyId: "4",
    agencyName: "ProTech Insurance Solutions",
    status: "online",
    loggedIn: true,
    callsTaken: 204,
    role: "Agent",
    conversionRate: 65,
    lastActivity: "2 min ago",
    securityRating: "5% growth",
    onlineTime: "3h 28m",
    callTime: "2h 12m"
  },
  {
    id: "8",
    name: "Esther Howard",
    agencyId: "4",
    agencyName: "ProTech Insurance Solutions",
    status: "online",
    loggedIn: true,
    callsTaken: 204,
    role: "Agent",
    conversionRate: 65,
    lastActivity: "4 min ago",
    securityRating: "5% growth",
    onlineTime: "6h 15m",
    callTime: "4h 32m"
  },
  {
    id: "9",
    name: "Robert Fox",
    agencyId: "5",
    agencyName: "Dynasty Coverage Group",
    status: "online",
    loggedIn: true,
    callsTaken: 204,
    role: "Agent",
    conversionRate: 65,
    lastActivity: "1 min ago",
    securityRating: "5% growth",
    onlineTime: "5h 12m",
    callTime: "3h 28m"
  },
  {
    id: "10",
    name: "Darrell Steward",
    agencyId: "5",
    agencyName: "Dynasty Coverage Group",
    status: "online",
    loggedIn: true,
    callsTaken: 204,
    role: "Agent",
    conversionRate: 65,
    lastActivity: "2 min ago",
    securityRating: "5% growth",
    onlineTime: "8h 05m",
    callTime: "6h 21m"
  }
];

const AgentListReport = ({ onBackToDashboard }: AgentListReportProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAgency, setSelectedAgency] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const { startImpersonation } = useImpersonation();

  // Get unique agencies for filter dropdown
  const agencies = useMemo(() => {
    const uniqueAgencies = Array.from(new Set(mockAgents.map(agent => agent.agencyName)))
      .map(name => {
        const agent = mockAgents.find(a => a.agencyName === name);
        return { id: agent?.agencyId || "", name };
      });
    return uniqueAgencies;
  }, []);

  // Filter agents based on search term, agency, and status
  const filteredAgents = useMemo(() => {
    return mockAgents.filter(agent => {
      const matchesSearch = agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           agent.agencyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           agent.role.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesAgency = selectedAgency === "all" || agent.agencyId === selectedAgency;
      const matchesStatus = selectedStatus === "all" || agent.status === selectedStatus;
      
      return matchesSearch && matchesAgency && matchesStatus;
    });
  }, [searchTerm, selectedAgency, selectedStatus]);

  const handleImpersonateAgent = (agent: Agent) => {
    if (agent.status !== "online" && agent.status !== "waiting") {
      toast.error("Can only impersonate online or waiting agents");
      return;
    }

    const impersonationData = {
      id: agent.id,
      name: agent.name,
      email: `${agent.name.toLowerCase().replace(/\s+/g, '.')}@${agent.agencyName.toLowerCase().replace(/\s+/g, '')}.com`
    };
    startImpersonation(impersonationData);
    toast.success(`Now impersonating ${agent.name}`);
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      online: { variant: "default", className: "bg-green-100 text-green-800", label: "Online" },
      offline: { variant: "secondary", className: "bg-gray-100 text-gray-800", label: "Offline" },
      paused: { variant: "outline", className: "bg-orange-100 text-orange-800", label: "Paused" },
      waiting: { variant: "outline", className: "bg-blue-100 text-blue-800", label: "Waiting" },
      inactive: { variant: "secondary", className: "bg-gray-100 text-gray-600", label: "Inactive" },
      pending: { variant: "outline", className: "bg-yellow-100 text-yellow-800", label: "Pending" }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.offline;
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const getRoleBadge = (role: string) => {
    const roleConfig = {
      Admin: "bg-red-100 text-red-700",
      Manager: "bg-blue-100 text-blue-700",
      Agent: "bg-green-100 text-green-700"
    };

    return (
      <Badge className={roleConfig[role as keyof typeof roleConfig] || "bg-gray-100 text-gray-700"}>
        {role}
      </Badge>
    );
  };

  // Calculate stats
  const stats = useMemo(() => {
    const total = filteredAgents.length;
    const online = filteredAgents.filter(a => a.status === "online").length;
    const offline = filteredAgents.filter(a => a.status === "offline").length;
    const paused = filteredAgents.filter(a => a.status === "paused").length;
    
    return { total, online, offline, paused };
  }, [filteredAgents]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Agent List Report</h1>
          <p className="text-gray-600">Comprehensive agent management and performance tracking across all agencies</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
          <Button variant="outline" onClick={onBackToDashboard}>
            Back to Dashboard
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="flex items-center p-6">
            <Users className="w-8 h-8 text-blue-600 mr-3" />
            <div>
              <p className="text-sm text-gray-600">Total Agents</p>
              <p className="text-2xl font-bold">{stats.total}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center p-6">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
              <div className="w-4 h-4 bg-green-600 rounded-full"></div>
            </div>
            <div>
              <p className="text-sm text-gray-600">Online</p>
              <p className="text-2xl font-bold text-green-600">{stats.online}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center p-6">
            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-3">
              <div className="w-4 h-4 bg-gray-600 rounded-full"></div>
            </div>
            <div>
              <p className="text-sm text-gray-600">Offline</p>
              <p className="text-2xl font-bold text-gray-600">{stats.offline}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center p-6">
            <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-3">
              <div className="w-4 h-4 bg-orange-600 rounded-full"></div>
            </div>
            <div>
              <p className="text-sm text-gray-600">Paused</p>
              <p className="text-2xl font-bold text-orange-600">{stats.paused}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Agents ({filteredAgents.length})
            </CardTitle>
            <div className="flex flex-wrap gap-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search agents..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 w-64"
                />
              </div>
              <Select value={selectedAgency} onValueChange={setSelectedAgency}>
                <SelectTrigger className="w-48">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filter by Agency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Agencies</SelectItem>
                  {agencies.map((agency) => (
                    <SelectItem key={agency.id} value={agency.id}>
                      {agency.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="online">Online</SelectItem>
                  <SelectItem value="offline">Offline</SelectItem>
                  <SelectItem value="paused">Paused</SelectItem>
                  <SelectItem value="waiting">Waiting</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Agent Name</TableHead>
                <TableHead>Agency</TableHead>
                <TableHead>Agent Status</TableHead>
                <TableHead>Logged In</TableHead>
                <TableHead>Calls Taken</TableHead>
                <TableHead>Online Time</TableHead>
                <TableHead>Talk Time</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Conversion Rate</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAgents.map((agent) => (
                <TableRow key={agent.id}>
                  <TableCell className="font-medium">{agent.name}</TableCell>
                  <TableCell>{agent.agencyName}</TableCell>
                  <TableCell>{getStatusBadge(agent.status)}</TableCell>
                  <TableCell>
                    <Badge variant={agent.loggedIn ? "default" : "secondary"} className={agent.loggedIn ? "bg-green-100 text-green-800" : ""}>
                      {agent.loggedIn ? "Yes" : "No"}
                    </Badge>
                  </TableCell>
                  <TableCell>{agent.callsTaken}</TableCell>
                  <TableCell className="text-sm font-mono">{agent.onlineTime}</TableCell>
                  <TableCell className="text-sm font-mono">{agent.callTime}</TableCell>
                  <TableCell>{getRoleBadge(agent.role)}</TableCell>
                  <TableCell>{agent.conversionRate}%</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button size="sm" variant="outline" title="View Details">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline" title="Edit Agent">
                        <Edit className="w-4 h-4" />
                      </Button>
                      {(agent.status === "online" || agent.status === "waiting") && (
                        <Button 
                          size="sm" 
                          variant="outline" 
                          title="Impersonate Agent"
                          onClick={() => handleImpersonateAgent(agent)}
                          className="text-blue-600 hover:text-blue-700"
                        >
                          <UserCheck className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {filteredAgents.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No agents found matching your filters.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AgentListReport;
