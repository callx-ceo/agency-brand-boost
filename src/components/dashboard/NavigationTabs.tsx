
import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type ViewType = 'dashboard' | 'agent-reports' | 'contacts' | 'realtime-report' | 'call-history';

interface NavigationTabsProps {
  activeView: ViewType;
  onViewChange: (view: ViewType) => void;
}

const NavigationTabs = ({ activeView, onViewChange }: NavigationTabsProps) => {
  return (
    <Tabs value={activeView} onValueChange={onViewChange}>
      <TabsList>
        <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
        <TabsTrigger value="agent-reports">Agent Reports</TabsTrigger>
        <TabsTrigger value="contacts">Contacts</TabsTrigger>
        <TabsTrigger value="realtime-report">Realtime</TabsTrigger>
        <TabsTrigger value="call-history">Call History</TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default NavigationTabs;
