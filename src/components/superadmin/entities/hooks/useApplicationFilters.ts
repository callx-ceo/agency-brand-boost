
import { useState, useMemo } from "react";

export interface UseApplicationFiltersProps {
  applications: any[];
  searchTerm: string;
  selectedAgency: string;
  activeTab: string;
}

export const useApplicationFilters = ({ applications, searchTerm, selectedAgency, activeTab }: UseApplicationFiltersProps) => {
  const filteredApplications = useMemo(() => {
    let filtered = applications;
    
    if (activeTab !== "all") {
      filtered = applications.filter(app => app.status === activeTab);
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
  }, [applications, searchTerm, selectedAgency, activeTab]);

  return { filteredApplications };
};
