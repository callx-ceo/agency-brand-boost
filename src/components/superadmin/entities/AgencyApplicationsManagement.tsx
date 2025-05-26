import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { FileText, Search, Eye, Clock, Building2, Mail, Phone, Calendar, Filter, RefreshCw, AlertCircle, TrendingUp } from "lucide-react";
import { toast } from "sonner";
import ApplicationMetricsDashboard from "./ApplicationMetricsDashboard";
import ApplicationDetailsDialog from "./ApplicationDetailsDialog";
import BulkActionsBar from "./BulkActionsBar";

interface AgencyApplicationsManagementProps {
  onBackToDashboard: () => void;
}

const mockApplications = [
  {
    id: 1,
    agencyName: "Premier Insurance Solutions",
    contactName: "Sarah Johnson",
    agentName: "Michael Davis",
    email: "sarah@premierinsurance.com",
    phone: "(555) 123-4567",
    dateSubmitted: "2025-05-23",
    status: "pending",
    businessType: "Life Insurance",
    expectedAgents: 15,
    revenue: "$500K annually",
    notes: "Expanding from health insurance to life insurance market"
  },
  {
    id: 2,
    agencyName: "Elite Coverage Group",
    contactName: "Michael Chen",
    agentName: "Jennifer Lopez",
    email: "m.chen@elitecoverage.com",
    phone: "(555) 234-5678",
    dateSubmitted: "2025-05-22",
    status: "approved",
    businessType: "Final Expense",
    expectedAgents: 25,
    revenue: "$750K annually",
    notes: "Established agency with strong track record"
  },
  {
    id: 3,
    agencyName: "Guardian Life Partners",
    contactName: "Lisa Rodriguez",
    agentName: "Robert Smith",
    email: "lisa@guardianlife.com",
    phone: "(555) 345-6789",
    dateSubmitted: "2025-05-21",
    status: "rejected",
    businessType: "Medicare Supplement",
    expectedAgents: 8,
    revenue: "$200K annually",
    notes: "Insufficient compliance documentation provided"
  },
  {
    id: 4,
    agencyName: "TrustGuard Insurance",
    contactName: "David Williams",
    agentName: "Amanda Wilson",
    email: "david@trustguard.com",
    phone: "(555) 456-7890",
    dateSubmitted: "2025-05-20",
    status: "under-review",
    businessType: "Whole Life",
    expectedAgents: 12,
    revenue: "$400K annually",
    notes: "Currently verifying business credentials"
  },
  {
    id: 5,
    agencyName: "SecureLife Solutions",
    contactName: "Amanda Thompson",
    agentName: "Carlos Martinez",
    email: "amanda@securelife.com",
    phone: "(555) 567-8901",
    dateSubmitted: "2025-05-19",
    status: "pending",
    businessType: "Term Life",
    expectedAgents: 20,
    revenue: "$600K annually",
    notes: "Highly rated agency seeking platform expansion"
  }
];

const AgencyApplicationsManagement = ({ onBackToDashboard }: AgencyApplicationsManagementProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [selectedApplication, setSelectedApplication] = useState<any>(null);
  const [selectedAgency, setSelectedAgency] = useState<string>("all");
  const [selectedApplications, setSelectedApplications] = useState<number[]>([]);
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleRefreshStatus = (applicationId: number) => {
    toast.success("Status refreshed from carrier");
    console.log("Refreshed status for application:", applicationId);
  };

  const handleUpdateStatus = (applicationId: number, newStatus: string) => {
    toast.success(`Application status updated to ${newStatus}`);
    console.log("Updated application status:", applicationId, newStatus);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending": return <Badge variant="outline" className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case "approved": return <Badge variant="default" className="bg-green-100 text-green-800">Approved</Badge>;
      case "rejected": return <Badge variant="destructive">Rejected</Badge>;
      case "under-review": return <Badge variant="secondary" className="bg-blue-100 text-blue-800">Under Review</Badge>;
      default: return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getUniqueAgencies = () => {
    const agencies = [...new Set(mockApplications.map(app => app.agencyName))];
    return agencies.sort();
  };

  const filterApplicationsByStatus = (status: string) => {
    let filtered = mockApplications;
    
    if (status !== "all") {
      filtered = mockApplications.filter(app => app.status === status);
    }
    
    if (selectedAgency !== "all") {
      filtered = filtered.filter(app => app.agencyName === selectedAgency);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(app =>
        app.agencyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.contactName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.agentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  };

  const getTabCounts = () => {
    const allFiltered = selectedAgency === "all" ? mockApplications : mockApplications.filter(a => a.agencyName === selectedAgency);
    return {
      all: allFiltered.length,
      pending: allFiltered.filter(a => a.status === "pending").length,
      approved: allFiltered.filter(a => a.status === "approved").length,
      rejected: allFiltered.filter(a => a.status === "rejected").length,
      "under-review": allFiltered.filter(a => a.status === "under-review").length,
    };
  };

  const tabCounts = getTabCounts();

  const getUrgencyIndicator = (dateSubmitted: string) => {
    const daysSinceSubmission = Math.floor((new Date().getTime() - new Date(dateSubmitted).getTime()) / (1000 * 60 * 60 * 24));
    if (daysSinceSubmission > 7) {
      return <AlertCircle className="w-4 h-4 text-red-500" />;
    } else if (daysSinceSubmission > 5) {
      return <Clock className="w-4 h-4 text-orange-500" />;
    }
    return null;
  };

  const handleBulkRefresh = () => {
    toast.success(`Refreshed status for ${selectedApplications.length} applications`);
    console.log("Bulk refresh for applications:", selectedApplications);
    setSelectedApplications([]);
  };

  const handleBulkExport = () => {
    toast.success(`Exported ${selectedApplications.length} applications`);
    console.log("Bulk export for applications:", selectedApplications);
  };

  const handleSelectApplication = (applicationId: number, checked: boolean) => {
    if (checked) {
      setSelectedApplications(prev => [...prev, applicationId]);
    } else {
      setSelectedApplications(prev => prev.filter(id => id !== applicationId));
    }
  };

  const handleSelectAll = (applications: any[], checked: boolean) => {
    if (checked) {
      setSelectedApplications(applications.map(app => app.id));
    } else {
      setSelectedApplications([]);
    }
  };

  const handleViewDetails = (application: any) => {
    setSelectedApplication(application);
    setIsDialogOpen(true);
  };

  const renderApplicationsTable = (applications: any[]) => (
    <div className="space-y-4">
      <BulkActionsBar
        selectedCount={selectedApplications.length}
        onRefreshSelected={handleBulkRefresh}
        onExportSelected={handleBulkExport}
        onClearSelection={() => setSelectedApplications([])}
      />
      
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Agency Applications ({applications.length})
            </CardTitle>
            <div className="flex gap-2">
              <div className="relative">
                <Filter className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                  <SelectTrigger className="pl-8 w-40">
                    <SelectValue placeholder="Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priority</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                    <SelectItem value="overdue">Overdue</SelectItem>
                    <SelectItem value="normal">Normal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="relative">
                <Filter className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Select value={selectedAgency} onValueChange={setSelectedAgency}>
                  <SelectTrigger className="pl-8 w-48">
                    <SelectValue placeholder="Filter by agency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Agencies</SelectItem>
                    {getUniqueAgencies().map((agency) => (
                      <SelectItem key={agency} value={agency}>
                        {agency}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search applications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 w-64"
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={applications.length > 0 && applications.every(app => selectedApplications.includes(app.id))}
                      onCheckedChange={(checked) => handleSelectAll(applications, checked as boolean)}
                    />
                  </TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Agency Name</TableHead>
                  <TableHead>Agent Name</TableHead>
                  <TableHead>Business Type</TableHead>
                  <TableHead>Date Submitted</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {applications.map((application) => (
                  <TableRow key={application.id} className={selectedApplications.includes(application.id) ? "bg-blue-50" : ""}>
                    <TableCell>
                      <Checkbox
                        checked={selectedApplications.includes(application.id)}
                        onCheckedChange={(checked) => handleSelectApplication(application.id, checked as boolean)}
                      />
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{application.contactName}</div>
                        <div className="text-sm text-gray-500 flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          {application.email}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center gap-1">
                          <Phone className="w-3 h-3" />
                          {application.phone}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-blue-500" />
                        {application.agencyName}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{application.agentName}</div>
                    </TableCell>
                    <TableCell>{application.businessType}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          {application.dateSubmitted}
                        </div>
                        {getUrgencyIndicator(application.dateSubmitted)}
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(application.status)}</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          title="View Details"
                          onClick={() => handleViewDetails(application)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        {(application.status === "pending" || application.status === "under-review") && (
                          <Button 
                            size="sm" 
                            variant="outline" 
                            title="Refresh Status from Carrier"
                            onClick={() => handleRefreshStatus(application.id)}
                            className="text-blue-600 hover:text-blue-700"
                          >
                            <RefreshCw className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            {applications.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">No applications found.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Agency Applications</h1>
          <p className="text-gray-600">Track and monitor life insurance applications submitted by agents</p>
        </div>
        <Button variant="outline" onClick={onBackToDashboard}>
          Back to Dashboard
        </Button>
      </div>

      <ApplicationMetricsDashboard />

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">All ({tabCounts.all})</TabsTrigger>
          <TabsTrigger value="pending">Pending ({tabCounts.pending})</TabsTrigger>
          <TabsTrigger value="under-review">Under Review ({tabCounts["under-review"]})</TabsTrigger>
          <TabsTrigger value="approved">Approved ({tabCounts.approved})</TabsTrigger>
          <TabsTrigger value="rejected">Rejected ({tabCounts.rejected})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          {renderApplicationsTable(filterApplicationsByStatus("all"))}
        </TabsContent>
        
        <TabsContent value="pending">
          {renderApplicationsTable(filterApplicationsByStatus("pending"))}
        </TabsContent>
        
        <TabsContent value="under-review">
          {renderApplicationsTable(filterApplicationsByStatus("under-review"))}
        </TabsContent>
        
        <TabsContent value="approved">
          {renderApplicationsTable(filterApplicationsByStatus("approved"))}
        </TabsContent>
        
        <TabsContent value="rejected">
          {renderApplicationsTable(filterApplicationsByStatus("rejected"))}
        </TabsContent>
      </Tabs>

      <ApplicationDetailsDialog
        application={selectedApplication}
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />
    </div>
  );
};

export default AgencyApplicationsManagement;
