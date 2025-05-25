
import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
    <Tabs value={activeView} onValueChange={onViewChange}>
      <TabsList className="flex-wrap gap-0">
        {tabs.map((tab) => (
          <TabsTrigger 
            key={tab.id}
            value={tab.id as SuperAdminViewType}
            className="whitespace-nowrap"
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};

export default GlobalNavigationTabs;
