
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, Search, UserCheck, Edit, Eye, ArrowLeft } from "lucide-react";
import { useImpersonation } from "@/contexts/ImpersonationContext";
import { toast } from "sonner";

interface AgencyAgentsViewProps {
  agencyId: string;
  onBackToAgencies: () => void;
}

const mockAgencyAgents = {
  "1": [
    { id: 1, name: "Sarah Johnson", status: "active", performance: 94, lastLogin: "1 hour ago", role: "Senior Agent" },
    { id: 2, name: "Michael Chen", status: "active", performance: 88, lastLogin: "2 hours ago", role: "Agent" },
    { id: 3, name: "Lisa Rodriguez", status: "training", performance: 76, lastLogin: "30 min ago", role: "Junior Agent" },
    { id: 4, name: "David Kim", status: "active", performance: 91, lastLogin: "15 min ago", role: "Team Lead" },
  ],
  "2": [
    { id: 5, name: "Emily Watson", status: "active", performance: 89, lastLogin: "45 min ago", role: "Senior Agent" },
    { id: 6, name: "James Wilson", status: "active", performance: 85, lastLogin: "1 hour ago", role: "Agent" },
    { id: 7, name: "Maria Garcia", status: "inactive", performance: 67, lastLogin: "2 days ago", role: "Agent" },
  ],
  "3": [
    { id: 8, name: "Robert Taylor", status: "suspended", performance: 45, lastLogin: "1 week ago", role: "Agent" },
    { id: 9, name: "Jennifer Brown", status: "active", performance: 92, lastLogin: "20 min ago", role: "Senior Agent" },
    { id: 10, name: "Christopher Davis", status: "training", performance: 78, lastLogin: "3 hours ago", role: "Junior Agent" },
  ],
};

const agencyNames = {
  "1": "Elite Insurance Group",
  "2": "Premier Coverage Solutions", 
  "3": "Guardian Life Services",
  "4": "ProTech Insurance Solutions",
  "5": "Dynasty Coverage Group",
};

const AgencyAgentsView = ({ agencyId, onBackToAgencies }: AgencyAgentsViewProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { startImpersonation } = useImpersonation();

  const agencyName = agencyNames[agencyId as keyof typeof agencyNames] || `Agency ${agencyId}`;
  const agents = mockAgencyAgents[agencyId as keyof typeof mockAgencyAgents] || [];

  const handleImpersonateAgent = (agent: any) => {
    const impersonationData = {
      id: agent.id.toString(),
      name: agent.name,
      email: `${agent.name.toLowerCase().replace(/\s+/g, '.')}@${agencyName.toLowerCase().replace(/\s+/g, '')}.com`
    };
    startImpersonation(impersonationData);
    toast.success(`Now impersonating ${agent.name}`);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active": return <Badge variant="default" className="bg-green-100 text-green-800">Active</Badge>;
      case "inactive": return <Badge variant="secondary">Inactive</Badge>;
      case "training": return <Badge variant="outline" className="bg-blue-100 text-blue-800">Training</Badge>;
      case "suspended": return <Badge variant="destructive">Suspended</Badge>;
      default: return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPerformanceBadge = (score: number) => {
    if (score >= 90) return <Badge variant="default" className="bg-green-100 text-green-800">{score}</Badge>;
    if (score >= 75) return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">{score}</Badge>;
    return <Badge variant="destructive">{score}</Badge>;
  };

  const filteredAgents = agents.filter(agent =>
    agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Button variant="ghost" size="sm" onClick={onBackToAgencies} className="p-1">
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <h1 className="text-3xl font-bold">{agencyName} - Agents</h1>
          </div>
          <p className="text-gray-600">Manage agents for {agencyName}</p>
        </div>
        <Button variant="outline" onClick={onBackToAgencies}>
          Back to Agencies
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              {agencyName} Agents ({filteredAgents.length})
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
                Add Agent
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Agent Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Performance Score</TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAgents.map((agent) => (
                <TableRow key={agent.id}>
                  <TableCell className="font-medium">{agent.name}</TableCell>
                  <TableCell>{agent.role}</TableCell>
                  <TableCell>{getStatusBadge(agent.status)}</TableCell>
                  <TableCell>{getPerformanceBadge(agent.performance)}</TableCell>
                  <TableCell>{agent.lastLogin}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button size="sm" variant="outline" title="View Details">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline" title="Edit Agent">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        title="Impersonate Agent"
                        onClick={() => handleImpersonateAgent(agent)}
                      >
                        <UserCheck className="w-4 h-4" />
                      </Button>
                    </div>
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

export default AgencyAgentsView;
