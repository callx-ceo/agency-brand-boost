
import React from "react";
import { Button } from "@/components/ui/button";
import { SuperAdminViewType } from "@/types/superAdminTypes";

interface GlobalNavigationTabsProps {
  activeView: SuperAdminViewType;
  onViewChange: (view: SuperAdminViewType) => void;
}

const GlobalNavigationTabs = ({ activeView, onViewChange }: GlobalNavigationTabsProps) => {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'agencies', label: 'Agencies' },
    { id: 'agents', label: 'Agents' },
    { id: 'advertisers', label: 'Advertisers' },
    { id: 'publishers', label: 'Publishers' },
    { id: 'campaigns', label: 'Campaigns' },
    { id: 'offers', label: 'Offers' },
    { id: 'contacts', label: 'Contacts' },
    { id: 'analytics', label: 'Analytics' },
    { id: 'compliance', label: 'Compliance' },
    { id: 'system-health', label: 'System Health' },
    { id: 'global-reporting', label: 'Global Reporting' },
    { id: 'user-management', label: 'User Management' },
  ];

  return (
    <div className="flex gap-2 flex-wrap">
      {tabs.map((tab) => (
        <Button 
          key={tab.id}
          variant={activeView === tab.id ? 'default' : 'outline'} 
          size="sm"
          onClick={() => onViewChange(tab.id as SuperAdminViewType)}
          className="whitespace-nowrap"
        >
          {tab.label}
        </Button>
      ))}
    </div>
  );
};

export default GlobalNavigationTabs;
