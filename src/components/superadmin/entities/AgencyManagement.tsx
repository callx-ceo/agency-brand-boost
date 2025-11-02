
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Building2, Search, Plus, Edit, Eye, Pause, Users, UserCheck } from "lucide-react";
import { useImpersonation } from "@/contexts/ImpersonationContext";
import { toast } from "sonner";
import CreateEditAgencyModal from "./CreateEditAgencyModal";

interface AgencyManagementProps {
  onBackToDashboard: () => void;
  onViewAgents: (agencyId: string) => void;
}

const mockAgencies = [
  { id: 1, name: "Elite Insurance Group", status: "active", agents: 28, revenue: 234567, lastActivity: "2 hours ago" },
  { id: 2, name: "Premier Coverage Solutions", status: "active", agents: 22, revenue: 218934, lastActivity: "1 hour ago" },
  { id: 3, name: "Guardian Life Services", status: "suspended", agents: 24, revenue: 176543, lastActivity: "2 days ago" },
  { id: 4, name: "ProTech Insurance Solutions", status: "pending", agents: 17, revenue: 165432, lastActivity: "5 hours ago" },
  { id: 5, name: "Dynasty Coverage Group", status: "active", agents: 20, revenue: 154321, lastActivity: "30 min ago" },
  { id: 6, name: "SecureLife Partners", status: "suspended", agents: 15, revenue: 98765, lastActivity: "1 week ago" },
  { id: 7, name: "TrustGuard Insurance", status: "pending", agents: 12, revenue: 67890, lastActivity: "3 days ago" },
];

const AgencyManagement = ({ onBackToDashboard, onViewAgents }: AgencyManagementProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedAgency, setSelectedAgency] = useState<any>(null);
  const { startImpersonation } = useImpersonation();

  const handleImpersonateAgency = (agency: any) => {
    // For agency impersonation, we'll impersonate the first agent from that agency
    const mockAgent = {
      id: `agent-${agency.id}-1`,
      name: `Agency Admin (${agency.name})`,
      email: `admin@${agency.name.toLowerCase().replace(/\s+/g, '')}.com`
    };
    startImpersonation(mockAgent);
    toast.success(`Now impersonating ${agency.name} admin`);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active": return <Badge variant="default" className="bg-green-100 text-green-800">Active</Badge>;
      case "inactive": return <Badge variant="secondary">Inactive</Badge>;
      case "suspended": return <Badge variant="destructive">Suspended</Badge>;
      case "pending": return <Badge variant="outline" className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      default: return <Badge variant="outline">{status}</Badge>;
    }
  };

  const filterAgenciesByStatus = (status: string) => {
    let filtered = mockAgencies;
    
    if (status !== "all") {
      filtered = mockAgencies.filter(agency => agency.status === status);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(agency =>
        agency.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  };

  const getTabCounts = () => {
    return {
      all: mockAgencies.length,
      active: mockAgencies.filter(a => a.status === "active").length,
      pending: mockAgencies.filter(a => a.status === "pending").length,
      suspended: mockAgencies.filter(a => a.status === "suspended").length,
    };
  };

  const tabCounts = getTabCounts();

  const renderAgenciesTable = (agencies: any[]) => (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            <Building2 className="w-5 h-5" />
            Agencies ({agencies.length})
          </CardTitle>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search agencies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 w-64"
              />
            </div>
            <Button 
              size="sm" 
              className="flex items-center gap-2"
              onClick={() => {
                setSelectedAgency(null);
                setShowCreateModal(true);
              }}
            >
              <Plus className="w-4 h-4" />
              Create Agency
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Agency Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Agents</TableHead>
              <TableHead>Revenue MTD</TableHead>
              <TableHead>Last Activity</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {agencies.map((agency) => (
              <TableRow key={agency.id}>
                <TableCell className="font-medium">{agency.name}</TableCell>
                <TableCell>{getStatusBadge(agency.status)}</TableCell>
                <TableCell>
                  <Button 
                    variant="link" 
                    className="p-0 h-auto font-semibold text-blue-600 hover:text-blue-800"
                    onClick={() => onViewAgents(agency.id.toString())}
                  >
                    {agency.agents}
                  </Button>
                </TableCell>
                <TableCell>${agency.revenue.toLocaleString()}</TableCell>
                <TableCell>{agency.lastActivity}</TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <Button size="sm" variant="outline" title="View Details">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      title="Edit Agency"
                      onClick={() => {
                        setSelectedAgency(agency);
                        setShowCreateModal(true);
                      }}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      title="Impersonate Agency"
                      onClick={() => handleImpersonateAgency(agency)}
                    >
                      <UserCheck className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline" title="Suspend Agency">
                      <Pause className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        {agencies.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No agencies found.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Agency Management</h1>
          <p className="text-gray-600">Manage and oversee all agencies on the platform</p>
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
          {renderAgenciesTable(filterAgenciesByStatus("all"))}
        </TabsContent>
        
        <TabsContent value="active">
          {renderAgenciesTable(filterAgenciesByStatus("active"))}
        </TabsContent>
        
        <TabsContent value="pending">
          {renderAgenciesTable(filterAgenciesByStatus("pending"))}
        </TabsContent>
        
        <TabsContent value="suspended">
          {renderAgenciesTable(filterAgenciesByStatus("suspended"))}
        </TabsContent>
      </Tabs>

      <CreateEditAgencyModal
        open={showCreateModal}
        onOpenChange={setShowCreateModal}
        agency={selectedAgency}
        onSuccess={() => {
          // Refresh agency list in a real app
          toast.success(selectedAgency ? "Agency updated" : "Agency created");
        }}
      />
    </div>
  );
};

export default AgencyManagement;
