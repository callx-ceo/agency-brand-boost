
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import BulkActionsBar from "../BulkActionsBar";
import ApplicationsTableHeader from "./ApplicationsTableHeader";
import ApplicationsTableRow from "./ApplicationsTableRow";
import { getUniqueAgencies } from "../utils/applicationUtils";

interface ApplicationsTableProps {
  applications: any[];
  selectedApplications: number[];
  priorityFilter: string;
  setPriorityFilter: (value: string) => void;
  selectedAgency: string;
  setSelectedAgency: (value: string) => void;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  onBulkRefresh: () => void;
  onBulkExport: () => void;
  onClearSelection: () => void;
  onSelectApplication: (id: number, checked: boolean) => void;
  onSelectAll: (applications: any[], checked: boolean) => void;
  onViewDetails: (application: any) => void;
  onViewAuditTrail: (id: number) => void;
  onRefreshStatus: (id: number) => void;
  mockApplications: any[];
}

const ApplicationsTable = ({
  applications,
  selectedApplications,
  priorityFilter,
  setPriorityFilter,
  selectedAgency,
  setSelectedAgency,
  searchTerm,
  setSearchTerm,
  onBulkRefresh,
  onBulkExport,
  onClearSelection,
  onSelectApplication,
  onSelectAll,
  onViewDetails,
  onViewAuditTrail,
  onRefreshStatus,
  mockApplications,
}: ApplicationsTableProps) => {
  const agencies = getUniqueAgencies(mockApplications);

  return (
    <div className="space-y-4">
      <BulkActionsBar
        selectedCount={selectedApplications.length}
        onRefreshSelected={onBulkRefresh}
        onExportSelected={onBulkExport}
        onClearSelection={onClearSelection}
      />
      
      <Card>
        <ApplicationsTableHeader
          applicationsCount={applications.length}
          priorityFilter={priorityFilter}
          setPriorityFilter={setPriorityFilter}
          selectedAgency={selectedAgency}
          setSelectedAgency={setSelectedAgency}
          agencies={agencies}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={applications.length > 0 && applications.every(app => selectedApplications.includes(app.id))}
                      onCheckedChange={(checked) => onSelectAll(applications, checked as boolean)}
                    />
                  </TableHead>
                  <TableHead className="min-w-[200px]">Contact</TableHead>
                  <TableHead className="min-w-[180px]">Agency Name</TableHead>
                  <TableHead className="min-w-[150px]">Agent Name</TableHead>
                  <TableHead className="min-w-[140px]">Business Type</TableHead>
                  <TableHead className="min-w-[130px]">Date Submitted</TableHead>
                  <TableHead className="min-w-[100px]">Status</TableHead>
                  <TableHead className="min-w-[120px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {applications.map((application) => (
                  <ApplicationsTableRow
                    key={application.id}
                    application={application}
                    isSelected={selectedApplications.includes(application.id)}
                    onSelectApplication={onSelectApplication}
                    onViewDetails={onViewDetails}
                    onViewAuditTrail={onViewAuditTrail}
                    onRefreshStatus={onRefreshStatus}
                  />
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
};

export default ApplicationsTable;
