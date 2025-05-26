import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ApplicationMetricsDashboard from "./ApplicationMetricsDashboard";
import ApplicationDetailsDialog from "./ApplicationDetailsDialog";
import { RealtimeUpdatesProvider } from "./RealtimeUpdatesProvider";
import AuditTrailDialog from "./AuditTrailDialog";
import ApplicationsTable from "./components/ApplicationsTable";
import { useApplicationFilters } from "./hooks/useApplicationFilters";
import { useApplicationActions } from "./hooks/useApplicationActions";
import { getTabCounts } from "./utils/applicationUtils";

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
  const [selectedAgency, setSelectedAgency] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");

  const {
    selectedApplications,
    selectedApplication,
    isDialogOpen,
    auditTrailApplicationId,
    isAuditTrailOpen,
    setIsDialogOpen,
    setIsAuditTrailOpen,
    handleRefreshStatus,
    handleBulkRefresh,
    handleBulkExport,
    handleSelectApplication,
    handleSelectAll,
    handleViewDetails,
    handleViewAuditTrail,
  } = useApplicationActions();

  const { filteredApplications } = useApplicationFilters({
    applications: mockApplications,
    searchTerm,
    selectedAgency,
    activeTab,
  });

  const tabCounts = getTabCounts(mockApplications, selectedAgency);

  const renderApplicationsTable = (applications: any[]) => (
    <ApplicationsTable
      applications={applications}
      selectedApplications={selectedApplications}
      priorityFilter={priorityFilter}
      setPriorityFilter={setPriorityFilter}
      selectedAgency={selectedAgency}
      setSelectedAgency={setSelectedAgency}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      onBulkRefresh={handleBulkRefresh}
      onBulkExport={handleBulkExport}
      onClearSelection={() => handleSelectAll([], false)}
      onSelectApplication={handleSelectApplication}
      onSelectAll={handleSelectAll}
      onViewDetails={handleViewDetails}
      onViewAuditTrail={handleViewAuditTrail}
      onRefreshStatus={handleRefreshStatus}
      mockApplications={mockApplications}
    />
  );

  return (
    <RealtimeUpdatesProvider>
      <div className="space-y-6">
        <div className="flex justify-between items-center flex-wrap gap-4">
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
            {renderApplicationsTable(filteredApplications)}
          </TabsContent>
          
          <TabsContent value="pending">
            {renderApplicationsTable(filteredApplications)}
          </TabsContent>
          
          <TabsContent value="under-review">
            {renderApplicationsTable(filteredApplications)}
          </TabsContent>
          
          <TabsContent value="approved">
            {renderApplicationsTable(filteredApplications)}
          </TabsContent>
          
          <TabsContent value="rejected">
            {renderApplicationsTable(filteredApplications)}
          </TabsContent>
        </Tabs>

        <ApplicationDetailsDialog
          application={selectedApplication}
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
        />

        <AuditTrailDialog
          applicationId={auditTrailApplicationId}
          open={isAuditTrailOpen}
          onOpenChange={setIsAuditTrailOpen}
        />
      </div>
    </RealtimeUpdatesProvider>
  );
};

export default AgencyApplicationsManagement;
