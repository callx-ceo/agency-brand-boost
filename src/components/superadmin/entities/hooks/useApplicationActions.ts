
import { useState } from "react";
import { toast } from "sonner";

export const useApplicationActions = () => {
  const [selectedApplications, setSelectedApplications] = useState<number[]>([]);
  const [selectedApplication, setSelectedApplication] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [auditTrailApplicationId, setAuditTrailApplicationId] = useState<number | null>(null);
  const [isAuditTrailOpen, setIsAuditTrailOpen] = useState(false);

  const handleRefreshStatus = (applicationId: number) => {
    toast.success("Status refreshed from carrier");
    console.log("Refreshed status for application:", applicationId);
  };

  const handleUpdateStatus = (applicationId: number, newStatus: string) => {
    toast.success(`Application status updated to ${newStatus}`);
    console.log("Updated application status:", applicationId, newStatus);
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

  const handleViewAuditTrail = (applicationId: number) => {
    setAuditTrailApplicationId(applicationId);
    setIsAuditTrailOpen(true);
  };

  return {
    selectedApplications,
    selectedApplication,
    isDialogOpen,
    auditTrailApplicationId,
    isAuditTrailOpen,
    setSelectedApplications,
    setIsDialogOpen,
    setIsAuditTrailOpen,
    handleRefreshStatus,
    handleUpdateStatus,
    handleBulkRefresh,
    handleBulkExport,
    handleSelectApplication,
    handleSelectAll,
    handleViewDetails,
    handleViewAuditTrail,
  };
};
